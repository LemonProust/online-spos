terraform{
    required_providers{
        azurerm = {
            source = "hashicorp/azurerm"
            version = "~> 3.0"
        }
    }
}

provider "azurerm"{
    features{}
}

# This defines an Azure Resource Group, which is a container for our Azure resources
resource "azurerm_resource_group" "osops" {
    # name: The name o the resource group
    name = "eventhub-resourcegroup"
    # location: The Azure region where the resource group will be created
    location = "west Europe"  
}


# This defines an Azure Event Hub Namespace, which provides a namespace for our event hubs
resource "azurerm_eventhub_namespace" "osops"{
    # name: The name of the event hub namespace
    name                = "eventhub-namespace-osops"
    # location: we are using the same location as our resource group
    location            = azurerm_resource_group.osops.location
    # resource_group_name: we are refering the resource group name that we created above
    resource_group_name = azurerm_resource_group.osops.name
    # sku: the pricing tier for the Event Hub Namespace, in our case Standard
    sku = "Standard"
}

# This defines the actual Azure Event Hub (AEH)
resource "azurerm_eventhub" "osops"{
    # name: The name of the event hub
    name                = "eventhub-osops"
    # namespace_name: we are referring the namespace name that we created above
    namespace_name      = azurerm_eventhub_namespace.osops.name
    # resource_group_name: we are refering the resource group name that we created above
    resource_group_name = azurerm_resource_group.osops.name
    # partition_count: the number of partitions for Event Hub (we set it to 2)
    partition_count     = 2
    # message_retention: how long messages will be retained by Event Hub in days. The default is 7 (we set it to 1)
    message_retention   = 1
}

