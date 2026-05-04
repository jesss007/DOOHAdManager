CREATE DATABASE DOOH_AD;
GO

USE DOOH_AD;
GO

CREATE SCHEMA core;
GO

CREATE SCHEMA inv;
GO

CREATE SCHEMA report;
GO

CREATE TABLE core.[User]
(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	FirstName NVARCHAR(20) NOT NULL,
	MiddleName NVARCHAR(20) NULL,
	LastName NVARCHAR(20) NOT NULL,
	[Role] NVARCHAR(20) NOT NULL
);

CREATE TABLE core.Tenant
(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	[Name] NVARCHAR(50) NOT NULL,
	TenancyCode NVARCHAR(50) UNIQUE NOT NULL,
	[Address] NVARCHAR(50) NOT NULL,
	Contact NVARCHAR(20) NOT NULL,
	Email NVARCHAR(50) NOT NULL,
	IsActive BIT NOT NULL DEFAULT 1,

	CreatedAt DATETIME DEFAULT GETUTCDATE(),
	UpdatedAt DATETIME NULL,
	CreatedBy INT NULL,
	UpdatedBy INT NULL,
	IsDeleted BIT DEFAULT 0,
	DeletedAt DATETIME NULL,
	DeletedBy INT NULL,

	CONSTRAINT FK_Tenant_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES core.[User](Id),
	CONSTRAINT FK_Tenant_UpdatedBy FOREIGN KEY (UpdatedBy) REFERENCES core.[User](Id),
	CONSTRAINT FK_Tenant_DeletedBy FOREIGN KEY (DeletedBy) REFERENCES core.[User](Id)
);

CREATE TABLE inv.Screen
(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	TenantId INT NOT NULL,
	[Name] NVARCHAR(50) NOT NULL,
	[Address] NVARCHAR(50) NOT NULL,
	[Location] NVARCHAR(200) NOT NULL,
	[Status] INT NOT NULL DEFAULT 1,
	Resolution NVARCHAR(20) NOT NULL DEFAULT '1920x1080',
	Orientation INT NOT NULL DEFAULT 1,
	Tag NVARCHAR(200) NULL,

	CreatedAt DATETIME DEFAULT GETUTCDATE(),
	UpdatedAt DATETIME NULL,
	CreatedBy INT NULL,
	UpdatedBy INT NULL,
	IsDeleted BIT DEFAULT 0,
	DeletedAt DATETIME NULL,
	DeletedBy INT NULL,
	
	CONSTRAINT Fk_Screen_TenantId FOREIGN KEY (TenantId) REFERENCES core.[Tenant](Id),
	CONSTRAINT FK_Screen_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES core.[User](Id),
	CONSTRAINT FK_Screen_UpdatedBy FOREIGN KEY (UpdatedBy) REFERENCES core.[User](Id),
	CONSTRAINT FK_Screen_DeletedBy FOREIGN KEY (DeletedBy) REFERENCES core.[User](Id)
);
	

CREATE TABLE inv.ScreenOperatingHour
(
	Id INT IDENTITY (1,1) PRIMARY KEY,
	ScreenId INT NOT NULL,
	StartTime TIME NOT NULL,
	EndTime TIME NOT NULL,
	[DayOfWeek] INT NOT NULL DEFAULT 1,
	AvgAudienceCount INT NOT NULL DEFAULT 0,

	CreatedAt DATETIME DEFAULT GETUTCDATE(),
	UpdatedAt DATETIME NULL,
	CreatedBy INT NULL,
	UpdatedBy INT NULL,
	IsDeleted BIT DEFAULT 0,
	DeletedAt DATETIME NULL,
	DeletedBy INT NULL,

	CONSTRAINT FK_ScreenOperatinHour_ScreenId FOREIGN KEY(ScreenId) REFERENCES inv.Screen(Id),
	CONSTRAINT FK_ScreenOperatingHour_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES core.[User](Id),
	CONSTRAINT FK_ScreenOperatingHour_UpdatedBy FOREIGN KEY (UpdatedBy) REFERENCES core.[User](Id),
	CONSTRAINT FK_ScreenOperatingHour_DeletedBy FOREIGN KEY (DeletedBy) REFERENCES core.[User](Id)
);

CREATE TABLE dbo.MediaLibrary
(
	Id INT IDENTITY (1,1) PRIMARY KEY,
	TenantId INT NOT NULL,
	[Name] NVARCHAR(50) NOT NULL,
	[Url] NVARCHAR(200) NOT NULL,
	Extension NVARCHAR(10) NOT NULL,
	Duration INT NULL,
	Resolution NVARCHAR(20) NULL,
	IsVideo BIT NOT NULL,

	CreatedAt DATETIME DEFAULT GETUTCDATE(),
	CreatedBy INT NULL,
	IsDeleted BIT DEFAULT 0,
	DeletedAt DATETIME NULL,
	DeletedBy INT NULL,

	CONSTRAINT FK_MediaLibrary_TenantId FOREIGN KEY(TenantId) REFERENCES core.Tenant(Id),
	CONSTRAINT FK_MediaLibrary_CreatedBy FOREIGN KEY(CreatedBy) REFERENCES core.[User](Id),
	CONSTRAINT FK_MediaLibrary_DeletedBy FOREIGN KEY(DeletedBy) REFERENCES core.[User](Id)
);

CREATE TABLE dbo.Campaign
(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	TenantId INT NOT NULL,
	[Name] NVARCHAR(50) NOT NULL,
	[Status] INT NOT NULL DEFAULT 1,

	CreatedAt DATETIME DEFAULT GETUTCDATE(),
	CreatedBy INT NULL,
	IsDeleted BIT DEFAULT 0,
	DeletedAt DATETIME NULL,
	DeletedBy INT NULL,

	CONSTRAINT FK_Campaign_TenantId FOREIGN KEY(TenantId) REFERENCES core.Tenant(Id),
	CONSTRAINT FK_Campaign_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES core.[User](Id),
	CONSTRAINT FK_Campaign_DeletedBy FOREIGN KEY (DeletedBy) REFERENCES core.[User](Id)
);

CREATE TABLE dbo.CampaignDate
(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	CampaignId INT NOT NULL,
	StartDateTime DATETIME NOT NULL, --
	EndDateTime DATETIME NOT NULL,--

	CONSTRAINT FK_CampaignDate_CampaignId FOREIGN KEY(CampaignId) REFERENCES dbo.Campaign(Id)
);

CREATE TABLE dbo.CampaignScreen
(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	CampaignDateId INT NOT NULL,
	ScreenId INT NOT NULL,

	CONSTRAINT FK_CampaignScreen_CampaignId FOREIGN KEY(CampaignDateId) REFERENCES dbo.CampaignDate(Id),
	CONSTRAINT FK_CampaignScreen_ScreenId FOREIGN KEY(ScreenId) REFERENCES inv.Screen(Id)
);

CREATE TABLE dbo.CampaignMedia 
(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	CampaignDateId INT NOT NULL,
	MediaId INT NOT NULL,
	PlayOrder INT NOT NULL,
	
	CreatedAt DATETIME DEFAULT GETUTCDATE(),
	CreatedBy INT NULL,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT NULL,
	IsDeleted BIT DEFAULT 0,
	DeletedAt DATETIME NULL,
	DeletedBy INT NULL,

	CONSTRAINT FK_CampaignMedia_CampaignDateId FOREIGN KEY(CampaignDateId) REFERENCES dbo.CampaignDate(Id),
	CONSTRAINT FK_CampaignMedia_MediaId FOREIGN KEY(MediaId) REFERENCES dbo.MediaLibrary(Id),
	CONSTRAINT FK_CampaignMedia_CreatedBy FOREIGN KEY(CreatedBy) REFERENCES core.[User](Id),
	CONSTRAINT FK_CampaignMedia_UpdatedBy FOREIGN KEY(UpdatedBy) REFERENCES core.[User](Id),
	CONSTRAINT FK_CampaignMedia_DeletedBy FOREIGN KEY (DeletedBy) REFERENCES core.[User](Id)
);

CREATE TABLE report.ProofOfPlay
(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	ScreenId INT NOT NULL,
	CampaignId INT NOT NULL,
	MediaId INT NOT NULL,
	PlayedAt DATETIME NOT NULL,
	DurationPlayed INT NOT NULL,

	CONSTRAINT FK_ProofOfPlay_ScreenId FOREIGN KEY(ScreenId) REFERENCES inv.Screen(Id),
	CONSTRAINT FK_ProofOfPlay_CampaignId FOREIGN KEY(CampaignId) REFERENCES dbo.Campaign(Id),
	CONSTRAINT FK_ProofOfPlay_MediaId FOREIGN KEY(MediaId) REFERENCES dbo.MediaLibrary(Id)
);


SELECT * FROM core.Tenant;
SELECT * FROM core.[User];
SELECT * FROM inv.Screen;