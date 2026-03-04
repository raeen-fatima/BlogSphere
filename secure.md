
# Secure Containerized Application Deployment on AWS

## Industry Project
**Title:** Securing a Containerized Application in the Public Cloud  

**Organization:** Tata Consultancy Services (TCS) Industry Project  
**Institute:** Amity University  

**Project Duration:**  
Start Date: 08 December 2025  
End Date: 08 March 2026  

---

# Project Overview

This project focuses on implementing a **secure containerized web application deployment in the public cloud**.  

The objective was to design and implement a **Defense in Depth security architecture** that protects the application across multiple layers including:

- Network Security
- Identity and Access Management (IAM)
- Container Security
- Runtime Security
- Monitoring and Logging
- Incident Response

A **Next.js Blog Application** was containerized using Docker and deployed on **AWS ECS Fargate** with integrated security mechanisms.

---

# Architecture Overview

The application follows a layered security architecture ensuring that multiple security controls protect the system at different levels.

**Key components:**

- AWS VPC
- Public Subnet
- Internet Gateway
- Amazon ECR
- AWS ECS Fargate
- IAM Roles and Policies
- CloudWatch Logs
- CloudTrail
- SNS Notifications
- S3 Log Storage

Architecture Diagram:

```

User
│
▼
Internet
│
▼
Internet Gateway
│
▼
AWS VPC
│
▼
Public Subnet
│
▼
ECS Fargate (Next.js Container)
│
▼
CloudWatch Logs / Monitoring

````

---

# Technologies Used

| Category | Tools |
|--------|--------|
| Cloud Platform | AWS (EU-North-1) |
| Containerization | Docker |
| Container Registry | Amazon ECR |
| Container Runtime | AWS ECS Fargate |
| Monitoring | CloudWatch |
| Logging | CloudTrail |
| Alerting | SNS |
| Vulnerability Scanner | Trivy |
| Development Environment | GitHub Codespaces |
| Application Framework | Next.js |
| Version Control | Git & GitHub |

---

# Security Implementation

## Network Security

- Custom AWS VPC created
- Controlled public subnet exposure
- Internet Gateway configured
- Security Group allowing only **TCP Port 3000**
- Default deny model for inbound traffic

---

## Identity and Access Management

- IAM roles configured using **Least Privilege Principle**
- ECS task execution role created
- Administrative actions restricted
- IAM policy validation through unauthorized access testing

---

## Container Security

The container image was hardened during build time.

Security practices implemented:

- Non-root container execution
- Minimal base image
- Removed unnecessary packages
- Controlled environment variable usage
- Image vulnerability scanning using **Trivy**

---

## Runtime Security

During container deployment:

- CPU limits configured
- Memory limits configured
- Public IP explicitly controlled
- IAM task execution role attached
- Container logging enabled

---

## Monitoring and Logging

Real-time monitoring and auditing were implemented using AWS native services.

Monitoring stack:

- CloudWatch Logs
- CloudWatch Alarms
- SNS Notifications
- CloudTrail
- S3 Log Storage

These services provide **continuous security visibility and alerting**.

---

# Vulnerability Scanning

Container images were scanned using **Trivy**.

Example command:

```bash
trivy image blog-secure
````

This scan identifies vulnerabilities in:

* OS packages
* Application dependencies
* Secrets
* Misconfigurations

---

# Incident Response Strategy

A simple incident response framework was designed.

Incident Response Workflow:

1. Detection
2. Alert Generation
3. Containment
4. Root Cause Analysis
5. Recovery
6. Post-Incident Review

Security testing included:

* Unauthorized IAM access attempts
* Network rule testing
* Container vulnerability scanning

---

# Project Workflow

The project followed a structured 6-step security implementation model.

1. Cloud Containerization
2. Vulnerability Scanning
3. Security Configuration
4. Runtime Security Hardening
5. Logging and Monitoring
6. Incident Response Planning

---

# How to Run Locally

Clone repository:

```bash
git clone https://github.com/YOUR_USERNAME/secure-container-blog-app.git
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

# Docker Build

Build Docker image:

```bash
docker build -t blog-secure .
```

Run container:

```bash
docker run -p 3000:3000 --env-file .env.local blog-secure
```

---

# Cloud Deployment

The application was deployed on **AWS ECS Fargate**.

Deployment pipeline:

1. Build Docker image
2. Push image to Amazon ECR
3. Create ECS Task Definition
4. Deploy ECS Service
5. Configure networking and security groups
6. Enable logging and monitoring

---

# Learning Outcomes

Through this project, the following skills were developed:

* Secure cloud architecture design
* Container security best practices
* AWS ECS deployment
* IAM policy design
* Vulnerability scanning
* Security monitoring and incident response

---

# Future Enhancements

Possible improvements include:

* Kubernetes deployment (EKS)
* Automated CI/CD pipeline
* Web Application Firewall integration
* Runtime threat detection
* Zero Trust network architecture

---

# Author

Fatima Raeen
BCA Cyber Security
Amity University

---

# License

This project was developed for academic and research purposes as part of the **TCS Industry Project Program**.

```

---
