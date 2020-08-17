USE [ECS]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 5/21/2020 3:46:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GlueIngredient]    Script Date: 5/21/2020 3:46:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GlueIngredient](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ModelName] [int] NOT NULL,
	[ModelNo] [int] NOT NULL,
	[GlueID] [int] NOT NULL,
	[LineID] [int] NOT NULL,
	[IngredientID] [int] NOT NULL,
	[Percentage] [int] NOT NULL,
	[CreatedDate] [nvarchar](max) NULL,
	[Input] [int] NOT NULL,
 CONSTRAINT [PK_GlueIngredient] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Glues]    Script Date: 5/21/2020 3:46:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Glues](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[Name] [nvarchar](max) NULL,
	[CreatedDate] [nvarchar](max) NULL,
	[ModalNameID] [int] NULL,
	[MaterialNameID] [int] NULL,
	[PartNameID] [int] NULL,
 CONSTRAINT [PK_Glues_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ingredients]    Script Date: 5/21/2020 3:46:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ingredients](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[Name] [nvarchar](max) NULL,
	[CreatedDate] [nvarchar](max) NULL,
	[SupplierID] [int] NULL,
 CONSTRAINT [PK_Ingredients] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Line]    Script Date: 5/21/2020 3:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Line](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Line] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MapModel]    Script Date: 5/21/2020 3:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MapModel](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ModelNameID] [int] NOT NULL,
	[ModelNoID] [int] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_MapModel] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaterialName]    Script Date: 5/21/2020 3:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaterialName](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ModelNames]    Script Date: 5/21/2020 3:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ModelNames](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Code] [nvarchar](max) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModelNo] [nvarchar](max) NULL,
 CONSTRAINT [PK_ModelNames] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ModelNos]    Script Date: 5/21/2020 3:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ModelNos](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Code] [nvarchar](max) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModelNameID] [int] NOT NULL,
 CONSTRAINT [PK_ModelNos] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PartName]    Script Date: 5/21/2020 3:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PartName](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
 CONSTRAINT [PK_PartName] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Plans]    Script Date: 5/21/2020 3:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Plans](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](max) NULL,
	[LineID] [int] NOT NULL,
	[GlueID] [int] NOT NULL,
	[Quantity] [nvarchar](max) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_Plans] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Supplier]    Script Date: 5/21/2020 3:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Supplier](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
 CONSTRAINT [PK_Supplier] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserDetails]    Script Date: 5/21/2020 3:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserDetails](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[LineID] [int] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_UserDetails] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 5/21/2020 3:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](max) NULL,
	[PasswordHash] [varbinary](max) NULL,
	[PasswordSalt] [varbinary](max) NULL,
	[Email] [nvarchar](max) NULL,
	[CreatedDate] [nvarchar](max) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200417035441_InitialDb', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200417040348_AddPlan', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200417040507_version1.0.0', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200418084914_version1.0.1', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200518015444__version1.0.2', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200518015633__version1.0.3', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200518015756__version1.0.4', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200518022156__version1.0.2', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200518022403__version1.0.3', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200518024719__version1.0.2', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200518042704__version1.0.3', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200518043211__version1.0.4', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200518044541__version1.0.5', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200519020414__version1.0.6', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200521011027__version1.0.7', N'3.1.1')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200521012744__version1.0.8', N'3.1.1')
GO
SET IDENTITY_INSERT [dbo].[GlueIngredient] ON 
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (2, 2, 4, 13, 0, 2, 25, N'April 17, 2020 15:37:06 PM', 25)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (14, 2, 4, 13, 0, 3, 40, N'April 18, 2020 10:03:31 AM', 50)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (15, 2, 4, 13, 0, 1, 25, N'April 18, 2020 10:24:05 AM', 50)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (17, 0, 0, 13, 0, 9, 10, N'April 18, 2020 11:28:49 AM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (52, 0, 15, 15, 0, 9, 95, N'April 20, 2020 09:48:50 AM', 12)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (58, 0, 0, 15, 0, 8, 1, N'April 22, 2020 08:37:48 AM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (59, 0, 0, 18, 0, 9, 100, N'April 23, 2020 14:30:12 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (60, 0, 0, 18, 0, 26, 5, N'April 23, 2020 15:24:37 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (61, 0, 0, 18, 0, 39, 100, N'April 23, 2020 15:24:46 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (64, 0, 0, 19, 0, 39, 95, N'April 23, 2020 15:26:58 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (65, 0, 0, 19, 0, 39, 95, N'April 23, 2020 15:27:07 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (67, 0, 0, 21, 0, 39, 95, N'April 23, 2020 15:36:08 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (68, 0, 0, 21, 0, 26, 5, N'April 23, 2020 15:36:17 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (69, 0, 0, 21, 0, 26, 5, N'April 23, 2020 15:36:30 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (70, 0, 0, 23, 0, 40, 96, N'April 23, 2020 15:40:54 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (71, 0, 0, 23, 0, 29, 4, N'April 23, 2020 15:41:22 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (72, 0, 0, 23, 0, 29, 4, N'April 23, 2020 15:41:33 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (73, 0, 0, 24, 0, 32, 100, N'April 23, 2020 15:53:34 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (74, 0, 0, 29, 0, 32, 100, N'April 23, 2020 16:01:14 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (75, 0, 0, 30, 0, 39, 95, N'April 23, 2020 16:01:32 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (76, 0, 0, 30, 0, 26, 5, N'April 23, 2020 16:01:42 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (77, 0, 0, 31, 0, 40, 96, N'April 23, 2020 16:01:55 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (78, 0, 0, 31, 0, 29, 4, N'April 23, 2020 16:02:06 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (79, 0, 0, 32, 0, 44, 100, N'April 23, 2020 16:02:28 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (80, 0, 0, 35, 0, 106, 100, N'April 23, 2020 16:14:48 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (81, 0, 0, 34, 0, 101, 95, N'April 23, 2020 16:15:08 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (82, 0, 0, 34, 0, 101, 95, N'April 23, 2020 16:15:51 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (83, 0, 0, 37, 0, 101, 95, N'April 23, 2020 16:18:18 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (84, 0, 0, 37, 0, 29, 5, N'April 23, 2020 16:18:29 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (85, 0, 0, 33, 0, 91, 98, N'April 23, 2020 16:19:51 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (86, 0, 0, 33, 0, 92, 2, N'April 23, 2020 16:19:57 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (87, 0, 0, 42, 0, 106, 100, N'April 23, 2020 16:43:30 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (88, 0, 0, 41, 0, 98, 96, N'April 23, 2020 16:43:43 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (89, 0, 0, 41, 0, 29, 4, N'April 23, 2020 16:43:56 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (90, 0, 0, 40, 0, 100, 96, N'April 23, 2020 16:44:13 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (91, 0, 0, 40, 0, 84, 4, N'April 23, 2020 16:44:26 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (92, 0, 0, 39, 0, 95, 100, N'April 23, 2020 16:45:03 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (93, 0, 0, 38, 0, 97, 100, N'April 23, 2020 16:45:19 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (94, 0, 0, 47, 0, 106, 100, N'April 23, 2020 16:49:36 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (95, 0, 0, 46, 0, 98, 96, N'April 23, 2020 16:54:30 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (96, 0, 0, 46, 0, 29, 4, N'April 23, 2020 16:54:41 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (97, 0, 0, 45, 0, 100, 96, N'April 23, 2020 16:55:08 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (98, 0, 0, 45, 0, 84, 4, N'April 23, 2020 16:55:26 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (99, 0, 0, 44, 0, 95, 100, N'April 23, 2020 16:55:44 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (100, 0, 0, 43, 0, 97, 100, N'April 23, 2020 16:55:57 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (101, 0, 0, 48, 0, 97, 100, N'April 23, 2020 17:05:12 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (102, 0, 0, 49, 0, 100, 96, N'April 23, 2020 17:05:29 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (103, 0, 0, 49, 0, 84, 4, N'April 23, 2020 17:05:39 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (104, 0, 0, 50, 0, 98, 96, N'April 23, 2020 17:06:04 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (105, 0, 0, 50, 0, 84, 4, N'April 23, 2020 17:06:14 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (106, 0, 0, 51, 0, 106, 100, N'April 23, 2020 17:06:52 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (107, 0, 0, 52, 0, 95, 100, N'April 23, 2020 17:07:04 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (108, 0, 0, 59, 0, 33, 80, N'April 24, 2020 16:12:26 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (109, 0, 0, 54, 0, 122, 5, N'April 25, 2020 09:52:19 AM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (110, 0, 0, 54, 0, 121, 15, N'April 25, 2020 09:52:27 AM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (111, 0, 0, 54, 0, 120, 80, N'April 25, 2020 09:53:10 AM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (112, 0, 0, 59, 0, 121, 20, N'April 25, 2020 09:54:23 AM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (113, 0, 0, 60, 0, 42, 95, N'April 25, 2020 16:12:18 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (114, 0, 0, 60, 0, 26, 5, N'April 25, 2020 16:12:30 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (115, 0, 0, 61, 0, 122, 89, N'May 05, 2020 13:42:37 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (116, 0, 0, 61, 0, 122, 90, N'May 05, 2020 13:42:48 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (117, 0, 0, 62, 0, 122, 90, N'May 05, 2020 14:55:36 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (118, 0, 0, 62, 0, 121, 10, N'May 05, 2020 14:55:45 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (119, 0, 0, 63, 0, 121, 70, N'May 05, 2020 14:56:39 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (120, 0, 0, 63, 0, 87, 20, N'May 05, 2020 14:56:45 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (121, 0, 0, 63, 0, 62, 5, N'May 05, 2020 14:56:52 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (122, 0, 0, 63, 0, 117, 5, N'May 05, 2020 14:57:19 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (123, 0, 0, 64, 0, 122, 95, N'May 05, 2020 16:37:48 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (124, 0, 0, 64, 0, 120, 5, N'May 05, 2020 16:37:53 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (127, 0, 0, 65, 0, 42, 95, N'May 13, 2020 15:19:19 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (128, 0, 0, 65, 0, 26, 5, N'May 13, 2020 15:19:34 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (129, 0, 0, 66, 0, 123, 45, N'May 18, 2020 12:08:12 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (132, 0, 0, 66, 0, 129, 10, N'May 19, 2020 08:41:39 AM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (133, 0, 0, 66, 0, 130, 10, N'May 19, 2020 09:19:54 AM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (134, 0, 0, 73, 0, 131, 10, N'May 19, 2020 11:28:17 AM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (135, 0, 0, 77, 0, 131, 10, N'May 21, 2020 10:51:52 AM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (136, 0, 0, 88, 0, 131, 33, N'May 21, 2020 13:40:13 PM', 0)
GO
INSERT [dbo].[GlueIngredient] ([ID], [ModelName], [ModelNo], [GlueID], [LineID], [IngredientID], [Percentage], [CreatedDate], [Input]) VALUES (137, 0, 0, 89, 0, 132, 10, N'May 21, 2020 14:06:21 PM', 0)
GO
SET IDENTITY_INSERT [dbo].[GlueIngredient] OFF
GO
SET IDENTITY_INSERT [dbo].[Glues] ON 
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (29, N'49386448', N'[KYM24] [SUPERCOURT RX] 008-2', N'April 23, 2020 15:57:46 PM', 2, 1, 1)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (30, N'79419460', N'[KYM24] [SUPERCOURT RX] 232HF-2 +5%ARF-2000', N'April 23, 2020 15:58:43 PM', 2, 1, 1)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (31, N'24131970', N'[KYM24] [SUPERCOURT RX] 224-2 + 4%RFE', N'April 23, 2020 15:59:33 PM', 2, 1, 1)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (32, N'55144728', N'[KYM24] [SUPERCOURT RX] SW-07', N'April 23, 2020 15:59:52 PM', 2, 2, 2)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (33, N'33088695', N'[ LAF08] [WILSY SPZL] 001A + 2% 001B', N'April 23, 2020 16:08:16 PM', 5, 2, 2)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (35, N'28908330', N'[ LAF08] [WILSY SPZL] GE-01', N'April 23, 2020 16:14:27 PM', 5, 2, 2)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (37, N'68806163', N'[LAF08] [WILSY SPZL] 311FT6 + 5% RFE', N'April 23, 2020 16:18:04 PM', 5, 1, 1)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (38, N'00089892', N'[KYT91] [ZX 2K BOOST J] 6311HM', N'April 23, 2020 16:21:51 PM', 5, 3, 3)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (39, N'96109263', N'[KYT91] [ZX 2K BOOST J] 311HM', N'April 23, 2020 16:23:26 PM', 6, 3, 3)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (40, N'92265480', N'[KYT91] [ZX 2K BOOST J] PL-55 + 4% SH-08', N'April 23, 2020 16:26:37 PM', 6, 3, 3)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (41, N'46703102', N'[KYT91] [ZX 2K BOOST J] 740F6 + 4% RFE', N'April 23, 2020 16:30:41 PM', 6, 3, 3)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (42, N'72482582', N'[KYT91] [ZX 2K BOOST J] GE-01', N'April 23, 2020 16:31:02 PM', 5, 3, 3)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (43, N'93716793', N'[LDW06] [ZX 2K BOOST J] 6311HM', N'April 23, 2020 16:47:20 PM', 2, 2, 2)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (44, N'84628757', N'[LDW06] [ZX 2K BOOST J] 311HM', N'April 23, 2020 16:47:38 PM', 2, 1, 1)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (45, N'29756890', N'[LDW06] [ZX 2K BOOST J] PL-55 + 4% SH-08', N'April 23, 2020 16:48:07 PM', 4, 1, 2)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (46, N'37569442', N'[LDW06] [ZX 2K BOOST J] 740F6 + 4% RFE', N'April 23, 2020 16:48:30 PM', 5, 3, 1)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (47, N'23107512', N'[LDW06] [ZX 2K BOOST J] GE-01', N'April 23, 2020 16:49:02 PM', 6, 1, 3)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (48, N'66029565', N'[LEN13] [ZX 2K BOOST W] 6311HM', N'April 23, 2020 16:58:22 PM', 6, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (49, N'46543580', N'[LEN13] [ZX 2K BOOST W] PL-55 + 4% SH-08', N'April 23, 2020 17:01:57 PM', 3, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (50, N'94476590', N'[LEN13] [ZX 2K BOOST W] 740F6 + 4% RFE', N'April 23, 2020 17:02:15 PM', 2, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (51, N'71869588', N'[LEN13] [ZX 2K BOOST W] GE-01', N'April 23, 2020 17:02:50 PM', 1, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (52, N'22999931', N'[LEN13] [ZX 2K BOOST W] 311HM', N'April 23, 2020 17:03:47 PM', 2, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (53, N'09592921', N'[LEY85] [ZX 2K 4D] 233BFP', N'April 23, 2020 17:10:08 PM', 3, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (54, N'', N'[LEY85] [ZX 2K 4D] 233CP(A)', N'April 25, 2020 13:25:42 PM', 4, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (55, N'', N'[LEY85] [ZX 2K 4D] [(50% 174-2+50% 224)+10%MEK]+6% RFE', N'April 25, 2020 13:22:43 PM', 5, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (56, N'72387121', N'[LEY85] [ZX 2K 4D] 224-2+5% RFE', N'April 23, 2020 17:12:56 PM', 3, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (57, N'', N'[LEY85] [ZX 2K 4D] 232HF-2 + 4% ARF-1000', N'April 25, 2020 13:24:23 PM', 3, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (58, N'', N'[LEY85] [ZX 2K 4D] 287+5% RFE', N'April 25, 2020 13:24:11 PM', 4, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (59, N'', N'[LEY85] [ZX 2K 4D] W-08 + 5% ARF-40', N'April 25, 2020 13:23:30 PM', 5, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (60, N'', N'[LEY85] [ZX 2K 4D] 6700-2 + 5% ARF-1000', N'May 07, 2020 11:02:02 AM', 2, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (62, N'', N'[LEY85] [ZX 2K 4D] 6700-2 + 5% ARF-999', N'May 07, 2020 11:02:10 AM', 1, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (63, N'65327275', N'[LEY85] [ZX 2K 4D] 6700-2 + 5% ARF-1001', N'May 05, 2020 14:56:23 PM', 5, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (64, N'95337881', N'[LEY85] [ZX 2K 4D] 6700-2 + 5% ARF-1002', N'May 05, 2020 16:37:40 PM', 6, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (65, N'', N'[LEY85] [ZX 2K 4D] 6700-2 + 5% ARF-1003', N'May 07, 2020 11:02:18 AM', 3, 0, 0)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (88, N'96624591', N'demo  + abc1234 + mui giay + nhua', N'May 21, 2020 13:39:16 PM', 13, 2, 1)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (89, N'16570573', N'AXCB435 + abcd123 + mui giay + nhua', N'May 21, 2020 14:05:54 PM', 14, 2, 1)
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate], [ModalNameID], [MaterialNameID], [PartNameID]) VALUES (90, N'52937230', N'Aver1 + fsdf + toe cap + plastic', N'May 21, 2020 15:42:00 PM', 2, 2, 1)
GO
SET IDENTITY_INSERT [dbo].[Glues] OFF
GO
SET IDENTITY_INSERT [dbo].[Ingredients] ON 
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (18, N'43125832', N'HENKEL-233BFP', N'April 23, 2020 14:32:24 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (19, N'50969649', N'HENKEL-233BFU', N'April 23, 2020 14:32:43 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (20, N'50432584', N'HENKEL-233BK', N'April 23, 2020 14:33:03 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (21, N'70653188', N'HENKEL-233CP', N'April 23, 2020 14:33:34 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (22, N'26659319', N'HENKEL-233SM', N'April 23, 2020 14:33:47 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (23, N'60043932', N'HENKEL-PC-3', N'April 23, 2020 14:34:06 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (24, N'00736220', N'HENKEL-PC-7', N'April 23, 2020 14:34:23 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (25, N'52447147', N'HENKEL-ARF-1000', N'April 23, 2020 14:34:51 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (26, N'31143545', N'HENKEL-ARF-2000', N'April 23, 2020 14:35:05 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (27, N'06169668', N'HENKEL-ARF-40', N'April 23, 2020 14:35:22 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (28, N'55875880', N'HENKEL-ARF-45', N'April 23, 2020 14:35:38 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (29, N'96403481', N'HENKEL-DESMODUR RFE', N'April 23, 2020 14:36:07 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (30, N'67951666', N'HENKEL-P-5-2', N'April 23, 2020 14:36:21 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (31, N'49739726', N'HENKEL-PR-580', N'April 23, 2020 14:36:52 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (32, N'53647065', N'HENKEL-008-2', N'April 23, 2020 14:37:03 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (33, N'', N'HENKEL-007V', N'April 25, 2020 09:53:52 AM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (34, N'61335092', N'HENKEL-2003TFE', N'April 23, 2020 14:40:10 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (35, N'73586009', N'HENKEL-PR-505A', N'April 23, 2020 14:40:34 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (36, N'17548335', N'HENKEL-231-2', N'April 23, 2020 14:41:22 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (37, N'36972031', N'HENKEL-174-2', N'April 23, 2020 14:41:50 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (38, N'25490227', N'HENKEL-287', N'April 23, 2020 14:42:45 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (39, N'86657887', N'HENKEL-232HF-2', N'April 23, 2020 14:42:58 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (40, N'38192444', N'HENKEL-224-2', N'April 23, 2020 14:43:15 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (41, N'86110441', N'HENKEL-6100UL-2', N'April 23, 2020 14:43:33 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (42, N'49389515', N'HENKEL-6700-2', N'May 19, 2020 16:16:11 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (43, N'37116862', N'HENKEL-W-08', N'April 23, 2020 14:44:04 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (44, N'69992108', N'HENKEL-SW-07', N'April 23, 2020 14:44:19 PM', 4)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (45, N'03411672', N'NANPAO-NO.29', N'April 23, 2020 14:47:28 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (46, N'84064224', N'NANPAO-502N(A)', N'April 23, 2020 14:48:22 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (47, N'07295665', N'NANPAO-RN', N'April 23, 2020 14:48:35 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (48, N'34826447', N'NANPAO-CL-10AN', N'April 23, 2020 14:49:17 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (49, N'49717747', N'NANPAO-UV-56(A)', N'April 23, 2020 14:49:28 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (50, N'27943963', N'NANPAO-NUV-90N(A)', N'April 23, 2020 14:49:38 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (51, N'64174191', N'NANPAO-1026A', N'April 23, 2020 14:50:22 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (52, N'74337679', N'NANPAO-2025D', N'April 23, 2020 14:50:36 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (53, N'89320558', N'NANPAO-JW-043(A)', N'April 23, 2020 14:51:37 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (54, N'01933543', N'NANPAO-1024', N'April 23, 2020 14:51:47 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (55, N'86561941', N'NANPAO-321C(A)', N'April 23, 2020 14:52:00 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (56, N'94632023', N'NANPAO-111PD(A)', N'April 23, 2020 14:52:20 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (57, N'93822694', N'NANPAO-P151W', N'April 23, 2020 14:53:05 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (58, N'79629441', N'NANPAO-129FN', N'April 23, 2020 14:53:14 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (59, N'74944260', N'NANPAO-139FN', N'April 23, 2020 14:53:23 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (60, N'08274469', N'NANPAO-LE-180N', N'April 23, 2020 14:53:39 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (61, N'64263552', N'NANPAO-NP-71KN', N'April 23, 2020 14:53:52 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (62, N'56047720', N'NANPAO-NP-530', N'April 23, 2020 14:54:03 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (63, N'61496164', N'NANPAO-NP-56', N'April 23, 2020 14:54:11 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (64, N'71249365', N'NANPAO-NP-100', N'April 23, 2020 14:54:22 PM', 3)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (65, N'20852362', N'HANYOUNG-HC-600', N'April 23, 2020 14:55:09 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (66, N'15738095', N'HANYOUNG-HC-600A', N'April 23, 2020 14:55:26 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (67, N'60688188', N'HANYOUNG-HW-005', N'April 23, 2020 14:55:36 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (68, N'23339569', N'HANYOUNG-TU-03TF', N'April 23, 2020 14:55:45 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (69, N'39284798', N'HANYOUNG-WTU-305', N'April 23, 2020 14:57:31 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (70, N'51020430', N'HANYOUNG-TU-910S', N'April 23, 2020 14:57:52 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (71, N'80272666', N'HANYOUNG-TU-307', N'April 23, 2020 14:58:00 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (72, N'32307925', N'HANYOUNG-WPM-907', N'April 23, 2020 14:58:10 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (73, N'04635647', N'HANYOUNG-TU-208P', N'April 23, 2020 14:59:01 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (74, N'38131484', N'HANYOUNG-TU-308 A', N'April 23, 2020 14:59:20 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (75, N'09994960', N'HANYOUNG-TU-106TF', N'April 23, 2020 14:59:33 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (76, N'19579802', N'HANYOUNG-TU-106 TFL', N'April 23, 2020 14:59:43 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (77, N'85835329', N'HANYOUNG-TU-1205TF', N'April 23, 2020 15:00:09 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (78, N'61744269', N'HANYOUNG-WTU-116 K', N'April 23, 2020 15:00:19 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (79, N'16234707', N'HANYOUNG-HA-510TF', N'April 23, 2020 15:00:38 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (80, N'91819079', N'HANYOUNG-WA-1C', N'April 23, 2020 15:00:47 PM', 2)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (82, N'43726169', N'GRECO-577NT', N'April 23, 2020 15:01:24 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (83, N'14765068', N'GRECO-311A5', N'April 23, 2020 15:03:05 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (84, N'79177775', N'GRECO-SH-08', N'April 23, 2020 15:03:14 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (85, N'98711889', N'GRECO-WH-03', N'April 23, 2020 15:03:23 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (86, N'85717792', N'GRECO-258H8', N'April 23, 2020 15:04:02 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (87, N'18050729', N'GRECO-PM-01', N'April 23, 2020 15:08:20 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (91, N'29833412', N'GRECO-001A', N'April 23, 2020 15:09:25 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (92, N'96434923', N'GRECO-001B', N'April 23, 2020 15:09:40 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (93, N'72056718', N'GRECO-6006EA', N'April 23, 2020 15:10:56 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (94, N'14378907', N'GRECO-6006EB', N'April 23, 2020 15:11:02 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (95, N'14639811', N'GRECO-311HM', N'April 23, 2020 15:11:16 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (96, N'48377476', N'GRECO-311BS', N'April 23, 2020 15:11:26 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (97, N'88786590', N'GRECO-6311HM', N'April 23, 2020 15:11:42 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (98, N'97359973', N'GRECO-740F6', N'April 23, 2020 15:11:51 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (99, N'32935833', N'GRECO-740F7', N'April 23, 2020 15:14:05 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (100, N'28156219', N'GRECO-PL-55', N'April 23, 2020 15:14:14 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (101, N'93592184', N'GRECO-311FT6', N'April 23, 2020 15:14:22 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (102, N'60812364', N'GRECO-6001A', N'April 23, 2020 15:16:39 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (103, N'78600925', N'GRECO-6002', N'April 23, 2020 15:16:47 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (104, N'97742400', N'GRECO-EP-39', N'April 23, 2020 15:16:56 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (105, N'85428498', N'GRECO-NWA-01', N'April 23, 2020 15:17:05 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (106, N'65105225', N'GRECO-GE-01', N'April 23, 2020 15:17:16 PM', 1)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (107, N'28789095', N'HM-GH-716', N'April 23, 2020 15:17:31 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (108, N'40724172', N'HM-GH-705A', N'April 23, 2020 15:17:40 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (109, N'80908789', N'HM-GH-7055', N'April 23, 2020 15:17:49 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (110, N'19160898', N'HM-GH-707', N'April 23, 2020 15:17:57 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (111, N'81564781', N'HM-GH-301', N'April 23, 2020 15:18:06 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (112, N'15008410', N'HM-A90', N'April 23, 2020 15:18:17 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (113, N'10352073', N'HM-P-2', N'April 23, 2020 15:18:54 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (114, N'07394709', N'HM-7281', N'April 23, 2020 15:19:02 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (115, N'92217729', N'HM-5055', N'April 23, 2020 15:19:16 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (116, N'73635236', N'HM-7750', N'April 23, 2020 15:19:32 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (117, N'93968404', N'HM-7901', N'April 23, 2020 15:19:42 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (118, N'62082401', N'HM-PA/G', N'April 23, 2020 15:20:29 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (119, N'38698516', N'HM-HM-170', N'April 23, 2020 15:20:39 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (120, N'48444141', N'HM-HM-167', N'April 23, 2020 15:20:49 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (121, N'35644137', N'HM-HM-101', N'April 23, 2020 15:21:00 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (122, N'54465793', N'HM-HM-506C', N'April 23, 2020 15:21:10 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (123, N'', N'demo ingredients1', N'May 19, 2020 08:34:03 AM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (130, N'72849667', N'DEMO12', N'May 19, 2020 09:20:11 AM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (131, N'52330907', N'demo 2', N'May 21, 2020 13:40:43 PM', 5)
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate], [SupplierID]) VALUES (132, N'74022364', N'demo new shoes', N'May 21, 2020 14:06:17 PM', 1)
GO
SET IDENTITY_INSERT [dbo].[Ingredients] OFF
GO
SET IDENTITY_INSERT [dbo].[Line] ON 
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (8, N'E - 1', CAST(N'2020-04-23T16:32:52.6608787' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (9, N'E - 2', CAST(N'2020-04-23T16:33:04.1611706' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (10, N'E - 3', CAST(N'2020-04-23T16:33:11.6132336' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (11, N'E - 4', CAST(N'2020-04-23T16:33:20.4432195' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (12, N'E - 5', CAST(N'2020-04-23T16:33:27.1061220' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (13, N'E - 6', CAST(N'2020-04-23T16:33:33.9730213' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (14, N'E - 7', CAST(N'2020-04-23T16:33:41.2747796' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (15, N'I - 1', CAST(N'2020-04-23T16:34:28.3049284' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (16, N'I - 2', CAST(N'2020-04-23T16:34:36.3765469' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (17, N'I - 3', CAST(N'2020-04-23T16:34:44.4947924' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (18, N'I - 4', CAST(N'2020-04-23T16:34:51.4716312' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (19, N'I - 5', CAST(N'2020-04-23T16:35:00.1253097' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (20, N'I - 6', CAST(N'2020-04-23T16:35:07.6454159' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (21, N'I - 7', CAST(N'2020-04-23T16:35:15.5445701' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (22, N'I - 8', CAST(N'2020-04-23T16:35:23.3343855' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (23, N'I - 9', CAST(N'2020-04-23T16:35:31.1332673' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (24, N'I - 10', CAST(N'2020-04-23T16:35:38.7051627' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (25, N'I - 11', CAST(N'2020-04-23T16:35:47.1202176' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (26, N'J - 1', CAST(N'2020-04-23T16:35:57.9090744' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (27, N'J - 2', CAST(N'2020-04-23T16:36:04.8388982' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (28, N'J - 3', CAST(N'2020-04-23T16:36:12.4152522' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (29, N'P - 1', CAST(N'2020-04-23T16:36:24.6629640' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (30, N'P - 2', CAST(N'2020-04-23T16:36:32.1188325' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (31, N'P - 3', CAST(N'2020-04-23T16:36:39.3579644' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (32, N'P - 4', CAST(N'2020-04-23T16:36:46.8237809' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (33, N'P - 5', CAST(N'2020-04-23T16:36:53.8526921' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (34, N'P - 6', CAST(N'2020-04-23T16:37:00.9466020' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (35, N'P - 7', CAST(N'2020-04-23T16:37:08.0425763' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (39, N'O - 1A', CAST(N'2020-04-23T16:38:15.2242215' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (40, N'O - 1B', CAST(N'2020-04-23T16:38:22.8002230' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (41, N'O - 2A', CAST(N'2020-04-23T16:38:30.8411416' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (42, N'O - 2B', CAST(N'2020-04-23T16:38:39.6650624' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (43, N'O - 3A', CAST(N'2020-04-23T16:38:48.1021462' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (44, N'O - 3B', CAST(N'2020-04-23T16:38:55.6490577' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (45, N'M - 1A', CAST(N'2020-04-23T16:39:14.9269367' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (46, N'M - 1B', CAST(N'2020-04-23T16:39:22.3446382' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (47, N'M - 2A', CAST(N'2020-04-23T16:39:31.1807903' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (48, N'M - 2B', CAST(N'2020-04-23T16:39:38.8127488' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (49, N'M - 3A', CAST(N'2020-04-23T16:39:57.1907090' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (50, N'M - 3B', CAST(N'2020-04-23T16:40:04.9515743' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (51, N'L - 1A', CAST(N'2020-04-23T16:40:30.5633509' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (52, N'L - 1B', CAST(N'2020-04-23T16:40:38.1993559' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (53, N'L - 2A', CAST(N'2020-04-23T16:40:47.3641987' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (54, N'L - 2B', CAST(N'2020-04-23T16:40:54.5950860' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (55, N'L - 3A', CAST(N'2020-04-23T16:41:03.8722613' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (56, N'L - 3B', CAST(N'2020-04-23T16:41:11.5112485' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (57, N'L - 4A', CAST(N'2020-04-23T16:41:20.8642567' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (58, N'L - 4B', CAST(N'2020-04-23T16:41:28.5770099' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (59, N'L - 5A', CAST(N'2020-04-23T16:41:36.4569480' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (60, N'L - 5B', CAST(N'2020-04-23T16:41:44.0998133' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (61, N'L - 6A', CAST(N'2020-04-23T16:41:51.5091607' AS DateTime2))
GO
INSERT [dbo].[Line] ([ID], [Name], [CreatedDate]) VALUES (62, N'L - 6B', CAST(N'2020-04-23T16:41:58.8918722' AS DateTime2))
GO
SET IDENTITY_INSERT [dbo].[Line] OFF
GO
SET IDENTITY_INSERT [dbo].[MapModel] ON 
GO
INSERT [dbo].[MapModel] ([ID], [ModelNameID], [ModelNoID], [CreatedDate]) VALUES (1, 2, 3, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
GO
INSERT [dbo].[MapModel] ([ID], [ModelNameID], [ModelNoID], [CreatedDate]) VALUES (2, 2, 4, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
GO
INSERT [dbo].[MapModel] ([ID], [ModelNameID], [ModelNoID], [CreatedDate]) VALUES (3, 2, 5, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
GO
SET IDENTITY_INSERT [dbo].[MapModel] OFF
GO
SET IDENTITY_INSERT [dbo].[MaterialName] ON 
GO
INSERT [dbo].[MaterialName] ([ID], [Name]) VALUES (1, N'rubber')
GO
INSERT [dbo].[MaterialName] ([ID], [Name]) VALUES (2, N'plastic')
GO
INSERT [dbo].[MaterialName] ([ID], [Name]) VALUES (3, N'Styrofoam')
GO
SET IDENTITY_INSERT [dbo].[MaterialName] OFF
GO
SET IDENTITY_INSERT [dbo].[ModelNames] ON 
GO
INSERT [dbo].[ModelNames] ([ID], [Name], [Code], [CreatedDate], [ModelNo]) VALUES (2, N'A', NULL, CAST(N'2020-04-18T00:00:00.0000000' AS DateTime2), N'fsdf')
GO
INSERT [dbo].[ModelNames] ([ID], [Name], [Code], [CreatedDate], [ModelNo]) VALUES (5, N'B', NULL, CAST(N'2020-04-18T00:00:00.0000000' AS DateTime2), N'sdfsdf')
GO
INSERT [dbo].[ModelNames] ([ID], [Name], [Code], [CreatedDate], [ModelNo]) VALUES (6, N'C', NULL, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'sdfsdf')
GO
INSERT [dbo].[ModelNames] ([ID], [Name], [Code], [CreatedDate], [ModelNo]) VALUES (7, N'adidas Ver1', NULL, CAST(N'2020-05-19T10:26:24.1095673' AS DateTime2), N'sdf')
GO
INSERT [dbo].[ModelNames] ([ID], [Name], [Code], [CreatedDate], [ModelNo]) VALUES (8, N'Adidas v2', NULL, CAST(N'2020-05-19T10:54:08.4655473' AS DateTime2), N'sdf')
GO
INSERT [dbo].[ModelNames] ([ID], [Name], [Code], [CreatedDate], [ModelNo]) VALUES (9, N'adidas ver 3', NULL, CAST(N'2020-05-19T16:34:29.9709796' AS DateTime2), N'sdf')
GO
SET IDENTITY_INSERT [dbo].[ModelNames] OFF
GO
SET IDENTITY_INSERT [dbo].[ModelNos] ON 
GO
INSERT [dbo].[ModelNos] ([ID], [Name], [Code], [CreatedDate], [ModelNameID]) VALUES (13, N'demo3', NULL, CAST(N'2020-04-18T16:32:28.2116597' AS DateTime2), 2)
GO
INSERT [dbo].[ModelNos] ([ID], [Name], [Code], [CreatedDate], [ModelNameID]) VALUES (16, N'demo3.1', NULL, CAST(N'2020-04-18T16:32:28.2116597' AS DateTime2), 2)
GO
SET IDENTITY_INSERT [dbo].[ModelNos] OFF
GO
SET IDENTITY_INSERT [dbo].[PartName] ON 
GO
INSERT [dbo].[PartName] ([ID], [Name]) VALUES (1, N'toe cap')
GO
INSERT [dbo].[PartName] ([ID], [Name]) VALUES (2, N'bottom')
GO
INSERT [dbo].[PartName] ([ID], [Name]) VALUES (3, N'quater')
GO
SET IDENTITY_INSERT [dbo].[PartName] OFF
GO
SET IDENTITY_INSERT [dbo].[Plans] ON 
GO
INSERT [dbo].[Plans] ([ID], [Title], [LineID], [GlueID], [Quantity], [CreatedDate], [Description]) VALUES (2, N'asdasd', 2, 13, N'100', CAST(N'2020-04-18T00:00:00.0000000' AS DateTime2), N'asdasdasd')
GO
SET IDENTITY_INSERT [dbo].[Plans] OFF
GO
SET IDENTITY_INSERT [dbo].[Supplier] ON 
GO
INSERT [dbo].[Supplier] ([ID], [Name]) VALUES (1, N'GRECO')
GO
INSERT [dbo].[Supplier] ([ID], [Name]) VALUES (2, N'HANYOUNG')
GO
INSERT [dbo].[Supplier] ([ID], [Name]) VALUES (3, N'NANPAO')
GO
INSERT [dbo].[Supplier] ([ID], [Name]) VALUES (4, N'HENKEL')
GO
INSERT [dbo].[Supplier] ([ID], [Name]) VALUES (5, N'GREENLIFE')
GO
SET IDENTITY_INSERT [dbo].[Supplier] OFF
GO
ALTER TABLE [dbo].[Glues] ADD  CONSTRAINT [DF__Glues__MaterialN__74AE54BC]  DEFAULT ((0)) FOR [MaterialNameID]
GO
ALTER TABLE [dbo].[Glues] ADD  CONSTRAINT [DF__Glues__PartNameI__75A278F5]  DEFAULT ((0)) FOR [PartNameID]
GO
ALTER TABLE [dbo].[ModelNames] ADD  CONSTRAINT [DF__ModelName__Model__73BA3083]  DEFAULT ((0)) FOR [ModelNo]
GO
ALTER TABLE [dbo].[ModelNos]  WITH CHECK ADD  CONSTRAINT [FK_ModelNos_ModelNames_ModelNameID] FOREIGN KEY([ModelNameID])
REFERENCES [dbo].[ModelNames] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ModelNos] CHECK CONSTRAINT [FK_ModelNos_ModelNames_ModelNameID]
GO
