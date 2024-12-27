const {eventHubConsumerClient, earliestEventPosition, EventHubConsumerClient} = require("@azure/event-hubs");
const mysql = require("mysql");

const connectionString = process.env.EVENTHUB_CONNECTION_STRING || "Endpoint=your_eventhub_connection_string;EntityPath=your_eventhub_name";
const consumerClient = eventHubName = process.env.EVENTHUB_NAME || "MY_EVENT_HUB_NAME";


const mysqlHost = process.env.MYSQL_HOST || 'mysql'
const mysqlUser = process.env.MYSQL_USER || 'root';
const mysqlPassword = process.env.MYSQL_PASSWORD || 'p@$$w0rd';
const mysqlDatabase = process.env.MYSQL_DATABASE || 'orders_db';

const db = mysql.createConnection({
  host: mysqlHost,
  user: mysqlUser,
  password: mysqlPassword,
  database: mysqlDatabase
});

db.connect((err) => {
  if (err) {
    console.error("Error occurred: ", err);
    return;
  }
  console.log("Connected to MySQL!");

  bd.query(`
    CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    eventBody VARCHAR(1024),
    enqueuedTimeUtc DATETIME,
    offset VARCHAR(255),
    sequenceNumber INT,
    partitionKey VARCHR(255),
    properties VARCHAR(1024)
    );
    `, (err, result) => {
        if(err){
            console.error("Error creating table:", err);
        }else{
            console.log("Table created or already exists.");
        }
    });
});
  

async function main() {
    const consumerClient = new EventHubConsumerClient(
        "$Default",
        connectionString,
        eventHubName
    );

    const subscription = consumerClient.subscribe({
        processEvents: async (events, context) => {
            if (events.length === 0) {
                console.log("No events received, waiting form more...");
                return;
            }

            for(const event of events){
                console.log(`Received event: ${event.body}`);

                const eventData = {
                    eventBody: JSON.stringify(event.body),
                    enqueuedTimeUtc: event.enqueuedTimeUtc,
                    offset: event.offset,
                    sequenceNumber: event.sequenceNumber,
                    partitionKey: event.partitionKey,
                    properties: JSON.stringify(event.properties)
                }
                db.query('INERT INTO orders SET ?', eventData, (err, results) => {
                    if(err){
                        console.error("Error saving event to MySQL: ", err);
                    }else{
                        console.log("Event saved to database!");
                    }
                });
            }
        },
        processError:async(err, context) => {
            console.log(`Error: ${err}`);
        },
    },
        {startingPosition: earliestEventPosition}
    );

    // Wait for a bit before cleaning up the sample
    await new Promise((resolve) => {
        setTimeout(async() =>{
            await subscription.close();
            await consumerClient.close();
            resolve();
        }, 60 * 1000);
    });
    
    
}

main().catch((err) => {
    console.error("Error occurred: ", err);
});