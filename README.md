# Online Shopping Order Processing System (OSOPS) Infrastructure

This project provides the necessary infrastructure and automation scripts to deploy an **Online Shopping Order Processing System (OSOPS)**. The deployment includes both on-premises and cloud components, leveraging tools such as **Terraform**, **Docker Compose**, and **Ansible** to ensure scalability, reliability, and automation.

---

## Project Overview

The OMS is designed to manage the lifecycle of customer orders for an e-commerce platform. It automates workflows, ensuring efficiency and transparency. This system involves:

- **Frontend:** Web servers (Nginx) behind a Traefik reverse proxy, hosted on-premises.
- **Backend:** Order management powered by Azure Event Hubs, with real-time synchronization to an on-premises Node.js server.
- **Database:** A MySQL database for short-term operational data storage on-premises.

---

## Infrastructure Components

### **Cloud (Azure):**
- **Event Hub Namespace** for streaming events.
- **Storage Account** for long-term data archival.

### **On-Premises:**
- **Dockerized Services**:
  - Traefik (Reverse Proxy and Load Balancer).
  - Nginx (Frontend Servers).
  - Node.js (Backend Application).
  - MySQL (Database).
- **Orchestration** via Docker Compose.

---

## Tools & Technologies

- **Terraform**: To provision and manage Azure resources.
- **Docker & Docker Compose**: For containerized deployment of services.
- **Traefik**: For load balancing and reverse proxy.
- **Ansible**: For configuration management and automation.

---

## Directory Structure

```
.
├── terraform-azure-osops/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── provider.tf
|   ├── docker-compose.yml
│   ├── ansible/
│   ├── playbook.yml
│   ├── traefik/
│   ├── nginx/
│   ├── nodejs/
│   ├── mysql/
│   ├── README.md
```

---

## Getting Started

### **1. Prerequisites**

- Azure CLI configured with an authenticated account.
- Terraform CLI installed.
- Docker and Docker Compose installed on the on-premises server.
- Ansible installed for automation.

### **2. Terraform Setup**

1. Navigate to the `terraform-azure-oms/` directory.
2. Initialize Terraform:
   ```bash
   terraform init
   ```
3. Create a plan and apply it:
   ```bash
   terraform plan
   terraform apply
   ```

### **3. Docker Compose Setup**

1. Navigate to the root project directory.
2. Deploy services using Docker Compose:
   ```bash
   docker compose up -d
   ```

### **4. Ansible Automation**

1. Navigate to the `ansible/` directory.
2. Run the Ansible playbook:
   ```bash
   ansible-playbook playbook.yml
   ```

---

## Outputs

- **Resource Group Name**: Azure Resource Group for OSOPS.
- **Event Hub Namespace**: OSOPS Event Hub for order streaming.
- **Storage Account Name**: OSOPS archival storage.

---

## Troubleshooting

1. **Terraform Errors:**
   - Ensure Azure CLI is authenticated.
   - Verify that the Terraform variables are correctly configured.
2. **Docker Issues:**
   - Check if Docker is running properly.
   - Inspect container logs for debugging:
     ```bash
     docker logs <container_name>
     ```
3. **Ansible Failures:**
   - Validate inventory file and playbook syntax.
   - Use verbose mode for detailed output:
     ```bash
     ansible-playbook playbook.yml -vvv
     ```

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgements

Special thanks to the team for supporting this project and providing insights into modern infrastructure practices.

---

## Author

Prepared by: **Valdemar Buco & Jilson Benjamim**
