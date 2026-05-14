# DOOH AD Manager

A Digital Out-of-Home (DOOH) Advertisement Management System built using ASP.NET Core Web API, Angular 20, and Microsoft SQL Server.

This system manages digital advertising screens, media assets, and campaign scheduling.

---

# What This Project Does

The system allows an user to:

- Create and manage digital advertising screens
- Configure screen operating hours
- Upload and manage media assets (images/videos)
- Create advertising campaigns
- Assign campaigns to screens
- Attach media for campaigns
- Manage playback order of media
- Manage campaign date ranges

---

# Technology Stack

## Backend
- ASP.NET Core Web API
- Swagger / OpenAPI

## Frontend
- Angular
- PrimeNG

## Database
- Microsoft SQL Server

## Storage
- Local filesystem storage for uploaded media

## Authentication
- Not implemented

## Time Handling
- UTC time is used throughout the system

---

# Core Modules

---

# Screen Management

Manages digital display devices.

## Features

- Add screen
- Update screen
- Delete screen
- List screens
- Configure screen operating hours
- Filter by status/orientation

## Screen Fields

- Id
- TenantId
- Name
- Address
- Location
- Resolution
- Orientation
- Status
- Tag

---

# Screen Operating Hours

Defines when a screen is active and available for advertisement playback.

## Features

- Add operating slots
- Prevent overlapping time slots
- Configure day-wise availability
- Delete operating slots

## Fields

- Id
- ScreenId
- StartTime
- EndTime
- DayOfWeek
- AvgAudienceCount

---

#  Media Library

Stores image and video advertisements.

## Features

- Upload media
- Delete media
- Preview uploaded files
- Resolution & duration detection

## Fields

- Id
- TenantId
- Name
- Url
- Extension
- Resolution
- Duration
- IsVideo

---

# Campaign Management

Creates advertising campaigns and assigns screens.

## Features

- Create campaign
- Define campaign dates
- Assign screens
- Filter campaign by status
- Attach media to campaign

## Fields

- Id
- TenantId
- Name
- DurationInDays
- Status
- Remarks

---

# Campaign Date

Defines campaign active periods.

## Fields

- Id
- CampaignId
- StartDate
- EndDate

## Validation

- Start date cannot exceed end date
- Date ranges cannot overlap

---

# Campaign Screen

Maps campaigns to one or more screens.

## Fields

- Id
- CampaignId
- ScreenId

---

# Campaign Media

Defines which media assets will play on a screen during a campaign.

## Features

- Assign multiple media to screens
- Define play sequence
- Schedule by play date
- Update playback order
- Remove assigned media

## Fields

- Id
- CampaignId
- ScreenId
- MediaId
- PlayDate
- PlaySequence

---

# Database Tables

## Core Schema

- core.User
- core.Tenant

## Inventory Schema

- inv.Screen
- inv.ScreenOperatingHour

## Default Schema

- dbo.MediaLibrary
- dbo.Campaign
- dbo.CampaignDate
- dbo.CampaignScreen
- dbo.CampaignMedia
  
---

# How To Run The Project

---

# 1. Clone Repository

```bash
git clone https://github.com/jesss007/DOOHAdManager.git
cd dooh-ad-manager
```

---

# 2. Backend Setup

## Configure Database

Update `appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=DESKTOP-S1VO68N\\SQLEXPRESS;Database=DOOH_AD;Trusted_Connection=True;TrustServerCertificate=True"
  },

```

---

## Run Database Script

Execute the provided SQL script in SQL Server Management Studio (SSMS).

This script will:

- Create database
- Create schemas
- Create all tables
- Configure relationships

---

## Run Backend

```bash
cd DoohAdManager.API
dotnet restore
dotnet run
```

Backend runs on:

```http
https://localhost:7065
```

Swagger:

```http
(https://localhost:7065/swagger/index.html)
```

---

# 3. Frontend Setup

```bash
npm install
ng serve
```

Frontend runs on:

```http
http://localhost:4200
```

---

# Available APIs

---

# Screen APIs

## Get Screens

```http
GET /api/Screen
```

## Create Screen

```http
POST /api/Screen
```

## Update Screen

```http
PUT /api/Screen
```

## Delete Screen

```http
DELETE /api/Screen?id={id}&deletedBy={userId}
```

## Screen Dropdown

```http
GET /api/Screen/Ddl
```

---

# Screen Operating Hour APIs

## Get Operating Hours

```http
GET /api/ScreenOperatingHour/Id?id={screenId}
```

## Add Operating Hour

```http
POST /api/ScreenOperatingHour
```

## Delete Operating Hour

```http
DELETE /api/ScreenOperatingHour?id={id}&deletedBy={userId}
```

---

# Media Library APIs

## Get Media

```http
GET /api/MediaLibrary
```

## Upload Media

```http
POST /api/MediaLibrary
```

## Delete Media

```http
DELETE /api/MediaLibrary?id={id}&deletedBy={userId}
```

## Media Dropdown

```http
GET /api/MediaLibrary/Ddl
```

---

# Campaign APIs

## Get Campaigns

```http
GET /api/Campaign
```

## Create Campaign

```http
POST /api/Campaign
```

## Delete Campaign

```http
DELETE /api/Campaign?id={id}&deletedBy={userId}
```

---

# Campaign Media APIs

## Get Campaign Media

```http
GET /api/CampaignMedia
```

## Add Campaign Media

```http
POST /api/CampaignMedia
```

## Update Campaign Media Sequence

```http
PUT /api/CampaignMedia
```

## Delete Campaign Media

```http
DELETE /api/CampaignMedia?id={id}&deletedBy={userId}
```

---

# Example Request & Response

---

# Create Screen

## Request

```http
POST /api/Screen
```

```json
{
  "tenantId": 1,
  "name": "Cineplex Digital billboard",
  "address": "EyePlex Mall",
  "location": "27.69251830498, 85.33641182448",
  "status": 1,
  "resolution": "1920x1080",
  "orientation": 1,
  "tag": [
      "Mall",
      "LED",
      "Outdoor"
    ],
  "createdBy": 1
}
```

---

## Response

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": 3,
    "tenantId": 1,
    "name": "Cineplex Digital billboard",
    "address": "EyePlex Mall",
    "location": "27.69251830498, 85.33641182448",
    "resolution": "1920x1080",
    "status": 1,
    "orientation": 1,
    "tag": [
      "Mall",
      "LED",
      "Outdoor"
    ],
    "createdAt": "2026-05-14T15:15:52.56",
    "updatedAt": null,
    "createdBy": 1,
    "updatedBy": null,
    "isDeleted": false,
    "deletedAt": null,
    "deletedBy": null,
    "operatingHours": null
  },
  "error": null
}
```

---

# Validation Rules

## Screen

- Name is required
- Address is required
- Resolution is required
- Location must be in latitude,longitude format

## Campaign

- At least one screen required
- Start date must be less than end date
- Campaign dates cannot overlap

## Campaign Media

- Screen selection required
- Play date required
- Duplicate play sequences are not allowed

## Screen Operating Hours

- Open time must be less than close time
- Time slots cannot overlap

---

# Conclusion

This project demonstrates basic DOOH advertisement management workflow including:

- Screen management
- Media management
- Campaign scheduling
- Media playback assignment
- Responsive frontend integration
