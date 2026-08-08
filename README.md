> CSE 4419 Network Security Course Project  
> Working title: **Automated API Reconnaissance and Vulnerability Pipeline**

## 1. What Is an API?

**API** stands for **Application Programming Interface**.

An API allows different software systems to talk to each other.

### Simple example

When you use a mobile banking app:

```text
Mobile App  →  API  →  Bank Server
```

- You enter your username and password in the app.
- The app sends a request to the API, for example:
  ```http
  POST /api/login
  ```
- The API checks your credentials with the bank server.
- If everything is correct, the server sends back a response:
  ```json
  {
    "status": "success",
    "user_id": 12345
  }
  ```

Common API endpoints might look like:

- `/api/login`
- `/api/users`
- `/api/products`
- `/api/orders`
- `/api/admin`

Each endpoint supports HTTP methods like:

- `GET` – read data
- `POST` – create/send data
- `PUT` – update data
- `DELETE` – delete data

---

## 2. What Is Reconnaissance?

**Reconnaissance** means **finding and collecting information** about something before taking action.

In cybersecurity, attackers always start with reconnaissance:

> “What APIs exist? What can they do? Where are the weak points?”

Our project does the same thing, but **defensively** — to help defenders see what an attacker would see.

### What the system tries to discover

- **API endpoints**
  - Example: `/api/login`, `/api/users`, `/api/admin`
- **HTTP methods**
  - Example: `GET /api/users`, `POST /api/login`
- **Parameters**
  - Example: `/api/users/{id}` where `{id}` is a parameter.
- **Authentication mechanisms**
  - Does the API require a token? API key? Session cookie?
- **API versions**
  - Example: `/api/v1/users`, `/api/v2/users`
- **Publicly exposed endpoints**
  - Routes that anyone can reach without authentication.
- **API documentation**
  - Files like `swagger.json`, `openapi.json` that describe the API in detail.

By collecting this information, the system builds a **map** of the API’s attack surface.

---

## 3. What Is a Vulnerability?

A **vulnerability** is a **security weakness** that an attacker could exploit.

After discovering the APIs, our system checks whether they have common security problems.

### Examples of API vulnerabilities

- **Broken authentication**
  - Login can be bypassed or guessed easily.
- **Missing authorization**
  - A normal user can access admin-only pages.
- **SQL injection**
  - User input is sent directly to the database without proper checks.
- **Excessive data exposure**
  - API returns more data than needed (e.g., passwords, internal IDs).
- **Rate-limit problems**
  - No limit on how many times you can call an endpoint (brute-force risk).
- **Insecure API endpoints**
  - Sensitive data sent over HTTP instead of HTTPS.
- **Improper input validation**
  - API accepts strange or dangerous input.
- **Broken Object Level Authorization (BOLA / IDOR)**
  - Example:
    ```http
    GET /api/users/123
    ```
  - If a normal user changes `123` to `124` and can see another user’s private data, that’s a BOLA/IDOR vulnerability.

Our project will **detect** some of these issues automatically (in a safe, non-destructive way) and report them.

---

## 4. What Is a Pipeline?

A **pipeline** means a sequence of steps that run automatically, one after another.

In this project, the pipeline looks like this:

```text
Target / API URL
        ↓
1. API Discovery
        ↓
2. Endpoint Enumeration
        ↓
3. API Specification Analysis
        ↓
4. Authentication Analysis
        ↓
5. Automated Security Testing
        ↓
6. Vulnerability Detection
        ↓
7. Risk / Severity Assessment
        ↓
8. Report
```

### Step-by-step (simple explanation)

1. **Target / API URL**  
   User gives a base URL, for example:
   - `https://api.example.com`
   - `http://localhost:3000`

2. **API Discovery**  
   The system tries common API paths:
   - `/api`, `/api/v1`, `/api/v2`
   - `/graphql`
   - `/swagger.json`, `/openapi.json`
   - `/docs`, `/api-docs`

3. **Endpoint Enumeration**  
   For each discovered path, the system records:
   - Path (e.g., `/api/users`)
   - HTTP method (GET, POST, etc.)
   - Response status code (200, 401, 403, 404, etc.)

4. **API Specification Analysis**  
   If a spec file is found (like `openapi.json`):
   - The system parses it.
   - Extracts all defined routes and methods.
   - Builds a complete endpoint list.

5. **Authentication Analysis**  
   For each endpoint, the system checks:
   - Does it require authentication?
   - Is there a login page or token requirement?
   - Does it return `401 Unauthorized` or `403 Forbidden` when no credentials are provided?

6. **Automated Security Testing**  
   The system runs a set of **safe checks**, such as:
   - Is the API reachable over plain HTTP?
   - Do sensitive paths (`/admin`, `/users`, `/config`) return `200 OK` without any auth?
   - Do error messages leak stack traces or debug info?
   - Is CORS configured too permissively?

7. **Vulnerability Detection**  
   Based on the test results, the system marks issues as potential vulnerabilities:
   - “Insecure transport (HTTP instead of HTTPS)”
   - “Possible unauthenticated access to sensitive endpoint”
   - “Verbose error messages may leak internal details”
   - “Overly permissive CORS configuration”

8. **Risk / Severity Assessment**  
   Each finding is assigned a severity level:
   - **High** – serious risk (e.g., unauthenticated admin access)
   - **Medium** – important but not critical (e.g., HTTP without TLS)
   - **Low** – worth fixing but less urgent (e.g., permissive CORS)

9. **Report**  
   Finally, the system generates a report:
   - List of all discovered endpoints.
   - List of all findings with severity.
   - Short description of each issue.
   - (Optional) Suggestions for fixing the problem.

The report can be shown on a web dashboard and downloaded as JSON/Markdown.

---

## 5. How This Relates to Network Security

Even though APIs are “application layer”, they are a core part of modern networked systems.

- **Cryptography (Lecture 4)**
  - Checking HTTP vs HTTPS relates directly to encryption and secure communication.

- **Firewalls & Access Control (Lecture 5)**
  - Checking whether sensitive endpoints are open without auth is like checking firewall rules at the API level.

- **IDS/IPS (Lecture 6)**
  - Each security check is similar to an IDS rule:  
    “If condition X is true, flag as potential vulnerability.”

This project applies network security thinking to **network-exposed APIs**, which are today’s most common network services.

---

## 6. What This Project Is NOT

- It is **not** an exploit tool.
- It does **not** try to break into systems or steal data.
- It does **not** perform destructive attacks.

It is a **reconnaissance + detection pipeline** meant for:

- Educational purposes (course project).
- Authorized testing of systems you own or have permission to test.

---

## 7. Planned Components (High-Level)

- **Backend (Python, FastAPI)**
  - Handles the pipeline logic.
  - Runs discovery and checks.
  - Exposes API endpoints for the frontend.

- **Frontend (React + shadcn/ui)**
  - Lets the user enter a target URL.
  - Shows scan status, endpoints, and findings.
  - Allows downloading the report.

- **Target APIs for Testing**
  - Local test APIs (e.g., a small Flask app you write).
  - Public demo APIs (e.g., Swagger Petstore).
  - Deliberately vulnerable apps (e.g., OWASP `crAPI`, Juice Shop) — only in your own lab environment.

---

## 8. Next Steps (To Be Updated Later)
