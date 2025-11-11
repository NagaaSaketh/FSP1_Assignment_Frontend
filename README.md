# Workasana

Workasana is a full-stack application for task management and team collaboration. It allows users to create and manage projects, assign tasks to team members, set deadlines, and organize workflows efficiently using tags.

---

## Demo Link

[Demo Link](https://fsp-1-assignment-frontend-rho.vercel.app/)

---

## Login

> **Guest** <br>
> Username : `guest123@gmail.com` <br>
> Password : `guest123`

---

## Quick Start

```
git clone https://github.com/NagaaSaketh/FSP1_Assignment_Frontend.git
cd FSP1_Assignment_Frontend
npm install
npm run dev

```

---

## Technologies

- React JS
- React Router
- Node.js
- Express
- MongoDB
- Chart.js

---

## Demo Video

Watch a walkthrough (5-7 minutes) of all major features of this app : [Video Link](https://drive.google.com/file/d/1JyrrWr_cLyQ9MLHydJ_CZXiy849OS451/view?usp=drive_link)

---

## Features

**Landing Page**

- Greeting
- Login & SignUp Buttons

**Dashboard**

- Display list of projects & tasks
- Navigation for other pages

**Project Page**

- Display list of projects
- "Create Project" button for adding a new project

**Tasks Page**

- Display list of tasks with their status
- "Create Task" button for adding a new task

**Task Details Page**

- When you click on any task on "Tasks Page" you can navigate to task details page
- Display of task details
- "Edit" button to update task details

**Team Page**

- Display list of Teams
- "Create Team" button to add/create a new team

**Reports Page**

- Displays task insights using bar chart visualizations.

**Settings Page**

- "Create Tags" button for creating tags
- "Delete" button to delete tasks,projects & teams

## API Reference

### **GET /api/auth/me**

Display the authenticated user details based on JWT

Sample Response :

```
{_id,name,email}
```

### **GET /api/users**

Display all users

Sample Response :

```
[{_id,name,email,password}]
```

### **GET /api/tasks**

Display all tasks

Sample Response :

```
[{_id,name,project,team,owners...}]
```

### **GET /api/tasks/:id**

Display task details for one task

Sample Response :

```
{_id,name,project,team,owners...}
```

### **GET /api/teams**

Display all teams

Sample Response :

```
[{_id,name,description}]
```

### **GET /api/projects**

Display all projects

Sample Response :

```
[{_id,name,description}]
```

### **GET /api/tags**

Display all tags

Sample Response :

```
[{_id,name}]
```

### **GET /api/report/last-week**

Display tasks that were closed in the past week

Sample Response :

```
[{_id,name,project,team,owners...}]
```

## **GET /api/report/pending**

Display total pending work days of tasks

Sample Response :

```
{totalDays,taskCount}
```

## **GET /api/report/closed-tasks**

Display closed tasks grouped by team

Sample Response :

```
{
     "groupedBy": "team",
    "results": [
        { _id, name , completedTaskCount,
        tasks: [
            {...}
        ]
        }
    ]
}
```

## **GET /api/report/closed-tasks?groupBy=owner**

Display closed tasks grouped by owner

Sample Response :
```
{
    "groupedBy": "owner",
    "results": [
        { _id, name , completedTaskCount,
        tasks: [
            {...}
        ]
        }
    ]
}
```


### **POST /api/auth/signup**

Create new user

Sample Response :

```
{_id,name,email,password}
```

### **POST /api/auth/login**

User Login into application

Sample Response :

```
{token}
```

### **POST /api/tasks**

Create new task

Sample Response :

```
{_id,name,project,team,owners...}
```

### **POST /api/teams**

Create new team

Sample Response :

```
{_id,name,description}
```

### **POST /api/projects**

Create new project

Sample Response :

```
{_id,name,description}
```

### **POST /api/tags**

Create new tag

Sample Response :

```
{_id,name}
```


### **PUT /api/tasks/:id**

Update task details for one task

Sample Response :

```
{_id,name,project,team,owners...}
```

### **DELETE /api/tasks/:id**

Delete task

Sample Response :

```
{_id,name,project,team,owners...}
```

### **DELETE /api/teams/:id**

Delete team

Sample Response :

```
{_id,name,description}
```

### **DELETE /api/projects/:id**

Delete project

Sample Response :

```
{_id,name,description}
```

## Contact

For bugs or feature requests, please reach out to vadlamanisaketh25@gmail.com