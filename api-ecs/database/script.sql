USE [EC]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 4/13/2020 4:53:44 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GlueIngredient]    Script Date: 4/13/2020 4:53:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GlueIngredient](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[GlueID] [int] NOT NULL,
	[IngredientID] [int] NOT NULL,
	[Percentage] [int] NOT NULL,
	[CreatedDate] [nvarchar](max) NULL,
 CONSTRAINT [PK_GlueIngredient] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Glues]    Script Date: 4/13/2020 4:53:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Glues](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[Name] [nvarchar](max) NULL,
	[CreatedDate] [nvarchar](max) NULL,
 CONSTRAINT [PK_Glues] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ingredients]    Script Date: 4/13/2020 4:53:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ingredients](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[Name] [nvarchar](max) NULL,
	[CreatedDate] [nvarchar](max) NULL,
 CONSTRAINT [PK_Ingredients] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 4/13/2020 4:53:44 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20200330041531_001', N'3.1.1')
GO
SET IDENTITY_INSERT [dbo].[GlueIngredient] ON 
GO
INSERT [dbo].[GlueIngredient] ([ID], [GlueID], [IngredientID], [Percentage], [CreatedDate]) VALUES (2, 1, 1, 10, N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[GlueIngredient] ([ID], [GlueID], [IngredientID], [Percentage], [CreatedDate]) VALUES (3, 1, 2, 50, N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[GlueIngredient] ([ID], [GlueID], [IngredientID], [Percentage], [CreatedDate]) VALUES (4, 1, 3, 40, N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[GlueIngredient] ([ID], [GlueID], [IngredientID], [Percentage], [CreatedDate]) VALUES (5, 2, 4, 30, N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[GlueIngredient] ([ID], [GlueID], [IngredientID], [Percentage], [CreatedDate]) VALUES (6, 2, 5, 30, N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[GlueIngredient] ([ID], [GlueID], [IngredientID], [Percentage], [CreatedDate]) VALUES (7, 2, 6, 40, N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[GlueIngredient] ([ID], [GlueID], [IngredientID], [Percentage], [CreatedDate]) VALUES (8, 3, 1, 4, N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[GlueIngredient] ([ID], [GlueID], [IngredientID], [Percentage], [CreatedDate]) VALUES (9, 3, 3, 4, N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[GlueIngredient] ([ID], [GlueID], [IngredientID], [Percentage], [CreatedDate]) VALUES (10, 3, 6, 2, N'March 30, 2020 11:29:23 AM')
GO
SET IDENTITY_INSERT [dbo].[GlueIngredient] OFF
GO
SET IDENTITY_INSERT [dbo].[Glues] ON 
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate]) VALUES (1, N'09978373', N'Glue A', N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate]) VALUES (2, N'09978372', N'Glue B', N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate]) VALUES (3, N'09978371', N'Glue C', N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate]) VALUES (4, N'09978370', N'Glue D', N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate]) VALUES (5, N'09978369', N'Glue E', N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate]) VALUES (10, N'33061168', N'Glue F', N'March 31, 2020 11:41:07 AM')
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate]) VALUES (15, N'33061158', N'Glue G', N'March 31, 2020 11:56:29 AM')
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate]) VALUES (16, N'59129032', N'Glue H', N'March 31, 2020 12:01:27 PM')
GO
INSERT [dbo].[Glues] ([ID], [Code], [Name], [CreatedDate]) VALUES (22, N'87660818', N'peter', N'April 11, 2020 16:13:49 PM')
GO
SET IDENTITY_INSERT [dbo].[Glues] OFF
GO
SET IDENTITY_INSERT [dbo].[Ingredients] ON 
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate]) VALUES (1, N'07136887', N'Ingredient A', N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate]) VALUES (2, N'07136886', N'Ingredient B', N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate]) VALUES (3, N'07136885', N'Ingredient C', N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate]) VALUES (4, N'07136884', N'Ingredient D', N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate]) VALUES (5, N'07136883', N'Ingredient E', N'March 30, 2020 11:29:23 AM')
GO
INSERT [dbo].[Ingredients] ([ID], [Code], [Name], [CreatedDate]) VALUES (6, N'07136888', N'Ingredient F', N'March 31, 2020 14:38:48 PM')
GO
SET IDENTITY_INSERT [dbo].[Ingredients] OFF
GO
