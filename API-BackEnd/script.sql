CREATE DATABASE [VitalHub_G3M]
GO

USE [VitalHub_G3M]
GO
/****** Object:  Table [dbo].[Clinicas]    Script Date: 07/05/2024 07:55:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clinicas](
	[ID] [uniqueidentifier] NOT NULL,
	[NomeFantasia] [varchar](150) NULL,
	[CNPJ] [varchar](30) NULL,
	[RazaoSocial] [varchar](150) NULL,
	[Email] [varchar](225) NULL,
	[EnderecoID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Clinicas] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Consultas]    Script Date: 07/05/2024 07:55:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Consultas](
	[ID] [uniqueidentifier] NOT NULL,
	[SituacaoID] [uniqueidentifier] NULL,
	[PacienteID] [uniqueidentifier] NULL,
	[MedicoClinicaID] [uniqueidentifier] NULL,
	[ReceitaID] [uniqueidentifier] NULL,
	[PrioridadeID] [uniqueidentifier] NULL,
	[DataConsulta] [datetime] NULL,
	[Descricao] [text] NULL,
	[Diagnostico] [text] NULL,
 CONSTRAINT [PK_Consultas] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Enderecos]    Script Date: 07/05/2024 07:55:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Enderecos](
	[ID] [uniqueidentifier] NOT NULL,
	[CEP] [varchar](50) NULL,
	[Logradouro] [varchar](50) NULL,
	[Numero] [int] NULL,
	[Longitude] [decimal](9, 6) NULL,
	[Latitude] [decimal](8, 6) NULL,
	[Cidade] [varchar](50) NULL,
 CONSTRAINT [PK_Enderecos] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Especialidades]    Script Date: 07/05/2024 07:55:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Especialidades](
	[ID] [uniqueidentifier] NOT NULL,
	[Especialidade] [varchar](100) NULL,
 CONSTRAINT [PK_Especialidades] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Exames]    Script Date: 07/05/2024 07:55:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Exames](
	[ID] [uniqueidentifier] NOT NULL,
	[Descricao] [text] NULL,
	[ConsultaID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Exames] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Medicos]    Script Date: 07/05/2024 07:55:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicos](
	[ID] [uniqueidentifier] NOT NULL,
	[EspecialidadeID] [uniqueidentifier] NULL,
	[CRM] [varchar](10) NULL,
	[EnderecoID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Medicos] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MedicosClinicas]    Script Date: 07/05/2024 07:55:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MedicosClinicas](
	[ID] [uniqueidentifier] NOT NULL,
	[ClinicaID] [uniqueidentifier] NULL,
	[MedicoID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_MedicoClinica] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NiveisPrioridade]    Script Date: 07/05/2024 07:55:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NiveisPrioridade](
	[ID] [uniqueidentifier] NOT NULL,
	[Prioridade] [int] NOT NULL,
 CONSTRAINT [PK_NiveisPrioridade_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pacientes]    Script Date: 07/05/2024 07:55:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pacientes](
	[ID] [uniqueidentifier] NOT NULL,
	[DataNascimento] [date] NULL,
	[RG] [varchar](50) NULL,
	[CPF] [varchar](50) NULL,
	[EnderecoID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Pacientes] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Receitas]    Script Date: 07/05/2024 07:55:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Receitas](
	[ID] [uniqueidentifier] NOT NULL,
	[Medicamento] [varchar](100) NULL,
 CONSTRAINT [PK_Receitas] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Situacoes]    Script Date: 07/05/2024 07:55:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Situacoes](
	[ID] [uniqueidentifier] NOT NULL,
	[Situacao] [varchar](50) NULL,
 CONSTRAINT [PK_Situacoes] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TiposUsuario]    Script Date: 07/05/2024 07:55:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TiposUsuario](
	[ID] [uniqueidentifier] NOT NULL,
	[TipoUsuario] [varchar](50) NULL,
 CONSTRAINT [PK_TiposUsuario] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 07/05/2024 07:55:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[ID] [uniqueidentifier] NOT NULL,
	[TipoUsuarioID] [uniqueidentifier] NULL,
	[Nome] [varchar](50) NULL,
	[Email] [varchar](255) NULL,
	[Senha] [varchar](100) NULL,
	[Foto] [text] NULL,
	[CodRecupSenha] [int] NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[Clinicas] ([ID], [NomeFantasia], [CNPJ], [RazaoSocial], [Email], [EnderecoID]) VALUES (N'0fca061b-328e-4f0d-a5d9-0f89343be832', N'SenaiHealth', N'46279360000175', N'SenaiHealth Ltda Saúde', N'senai@health.com', N'414ea751-a208-47ee-ac2b-e6f794dccd7c')
GO
INSERT [dbo].[Consultas] ([ID], [SituacaoID], [PacienteID], [MedicoClinicaID], [ReceitaID], [PrioridadeID], [DataConsulta], [Descricao], [Diagnostico]) VALUES (N'086801f4-2c4e-4ff5-b48d-09e20e7e08c9', N'c9699175-6ba3-440f-addc-d4e80122ab83', N'b8e40930-0acb-431f-bf4b-a261ea945319', N'93c13046-dc2e-46cb-a59b-623376f32ce1', N'32e9be5c-2754-4e25-9447-2d08144a0178', N'95da7213-24e5-42e8-be31-ea5cdc6b19a0', CAST(N'2024-04-09T00:00:00.000' AS DateTime), N'Teste', N'Teste')
GO
INSERT [dbo].[Consultas] ([ID], [SituacaoID], [PacienteID], [MedicoClinicaID], [ReceitaID], [PrioridadeID], [DataConsulta], [Descricao], [Diagnostico]) VALUES (N'5f6cf4dd-75a0-4486-af3e-3a7b1e7add97', N'c9699175-6ba3-440f-addc-d4e80122ab83', N'b8e40930-0acb-431f-bf4b-a261ea945319', N'93c13046-dc2e-46cb-a59b-623376f32ce1', N'463ba2c7-f3f1-40ff-acc2-6174f9d8ca12', N'95da7213-24e5-42e8-be31-ea5cdc6b19a0', CAST(N'2024-04-22T00:00:00.000' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[Consultas] ([ID], [SituacaoID], [PacienteID], [MedicoClinicaID], [ReceitaID], [PrioridadeID], [DataConsulta], [Descricao], [Diagnostico]) VALUES (N'479482cf-e451-4709-ba35-3d47db989869', N'dff3e799-eeb1-4dee-b3bc-92da062fc8f1', N'b8e40930-0acb-431f-bf4b-a261ea945319', N'93c13046-dc2e-46cb-a59b-623376f32ce1', N'463ba2c7-f3f1-40ff-acc2-6174f9d8ca12', N'95da7213-24e5-42e8-be31-ea5cdc6b19a0', CAST(N'2024-04-22T00:00:00.000' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[Consultas] ([ID], [SituacaoID], [PacienteID], [MedicoClinicaID], [ReceitaID], [PrioridadeID], [DataConsulta], [Descricao], [Diagnostico]) VALUES (N'c394e26f-d24a-4ea9-b17f-b298ca61667a', N'c9699175-6ba3-440f-addc-d4e80122ab83', N'b8e40930-0acb-431f-bf4b-a261ea945319', N'93c13046-dc2e-46cb-a59b-623376f32ce1', N'24c9bbbd-d054-492c-8ce6-34caad720ca1', N'95da7213-24e5-42e8-be31-ea5cdc6b19a0', CAST(N'2024-04-30T23:00:00.000' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[Consultas] ([ID], [SituacaoID], [PacienteID], [MedicoClinicaID], [ReceitaID], [PrioridadeID], [DataConsulta], [Descricao], [Diagnostico]) VALUES (N'36860963-120a-4d56-8080-c53bd8607714', N'dff3e799-eeb1-4dee-b3bc-92da062fc8f1', N'b8e40930-0acb-431f-bf4b-a261ea945319', N'93c13046-dc2e-46cb-a59b-623376f32ce1', N'463ba2c7-f3f1-40ff-acc2-6174f9d8ca12', N'95da7213-24e5-42e8-be31-ea5cdc6b19a0', CAST(N'2024-04-29T00:00:00.000' AS DateTime), N'Rubão do mal', N'Rubão do bem ')
GO
INSERT [dbo].[Consultas] ([ID], [SituacaoID], [PacienteID], [MedicoClinicaID], [ReceitaID], [PrioridadeID], [DataConsulta], [Descricao], [Diagnostico]) VALUES (N'29618983-c5d3-4cc5-8569-cd484cdff008', N'c9699175-6ba3-440f-addc-d4e80122ab83', N'b8e40930-0acb-431f-bf4b-a261ea945319', N'93c13046-dc2e-46cb-a59b-623376f32ce1', N'74f017d3-2689-40ee-bde4-a2888166dcad', N'395c5e28-07be-467b-ae19-3de0b37c6945', CAST(N'2024-04-30T17:00:00.000' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[Consultas] ([ID], [SituacaoID], [PacienteID], [MedicoClinicaID], [ReceitaID], [PrioridadeID], [DataConsulta], [Descricao], [Diagnostico]) VALUES (N'47991dbd-275b-498c-86c6-d2fc1435f112', N'dff3e799-eeb1-4dee-b3bc-92da062fc8f1', N'b8e40930-0acb-431f-bf4b-a261ea945319', N'93c13046-dc2e-46cb-a59b-623376f32ce1', N'344bf775-e9cf-406a-a478-1d90b68239c9', N'395c5e28-07be-467b-ae19-3de0b37c6945', CAST(N'2024-05-06T10:00:00.000' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[Consultas] ([ID], [SituacaoID], [PacienteID], [MedicoClinicaID], [ReceitaID], [PrioridadeID], [DataConsulta], [Descricao], [Diagnostico]) VALUES (N'0d398190-5d73-41ae-b8ab-e1c221188f53', N'8b2bced0-8117-4c57-a5d3-6c732a067e38', N'b8e40930-0acb-431f-bf4b-a261ea945319', N'93c13046-dc2e-46cb-a59b-623376f32ce1', N'463ba2c7-f3f1-40ff-acc2-6174f9d8ca12', N'95da7213-24e5-42e8-be31-ea5cdc6b19a0', CAST(N'2024-05-02T00:00:00.000' AS DateTime), N'Rubão ', N'Artuzao')
GO
INSERT [dbo].[Consultas] ([ID], [SituacaoID], [PacienteID], [MedicoClinicaID], [ReceitaID], [PrioridadeID], [DataConsulta], [Descricao], [Diagnostico]) VALUES (N'12786b79-8825-4db9-b595-e98b71dac9f1', N'8b2bced0-8117-4c57-a5d3-6c732a067e38', N'b8e40930-0acb-431f-bf4b-a261ea945319', N'93c13046-dc2e-46cb-a59b-623376f32ce1', N'463ba2c7-f3f1-40ff-acc2-6174f9d8ca12', N'95da7213-24e5-42e8-be31-ea5cdc6b19a0', CAST(N'2024-04-25T00:00:00.000' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'a0e2d0b3-42f8-4ce7-a87c-05aae1d4efbf', NULL, NULL, NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'e6eac27b-aed4-4a24-86a9-090ea1efb6d1', NULL, NULL, NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'431a6f23-40af-4acb-ab20-24c1ab983f20', NULL, NULL, NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'259040de-9339-45f4-942b-4cdd1ce72db8', N'0958151', N'rua rubens', NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'6abaaff3-2a88-44cc-8abb-510c4c4ca7d2', NULL, NULL, NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'fd1d2842-9367-4ee8-bb04-52d0fcbf4c0d', N'0958151', N'rua rubens', NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'1264e87a-271b-48be-bbab-53d01a330782', N'09182029', N'Rua Sampaio', 234, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'0c7fba6b-e6ee-4115-8ebc-54ba49242ede', N'0976845', N'Limoeiro', 167, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'6eaec57f-0552-40fd-9604-5d2ce2e0384e', NULL, NULL, NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'6a45e4e2-7d23-4f67-bcc3-67ef1f6f8926', N'09182020', N'string', 456, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'7af13c45-6427-4b83-b7f3-6e564b953491', NULL, NULL, NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'0d2f4426-02d4-4020-869d-86849a2ec6e7', NULL, NULL, NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'17677ac9-4aa8-49f2-9053-8e3abf009aed', N'0906431', N'Rua niterói', 180, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'414c0660-6329-4149-bb62-93a62498e962', N'0958151', N'rua rubens', 757, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'fce2c301-c79b-4fe6-9725-a5c375f77f54', NULL, NULL, NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'4e5f485a-ffe6-4a83-b339-aed27b3b59a0', NULL, NULL, NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'51b1d6cb-8307-435a-a384-b7d09aca1a0d', NULL, NULL, NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'd9f8d99e-3386-48e4-bbe1-c769c309c5f2', NULL, NULL, NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'2b5337c1-59a2-4423-8efd-d7707db15006', N'09182020', N'string', 456, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'7e3eb2ca-185f-4283-87c4-d9af04d313f8', N'0906431', N'Rua niterói', 180, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'82562391-7f20-434a-b8e9-dcb4786254bf', N'172838383', N'Sjdisie', 180, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'f24dc044-774a-48fd-af50-e1d34c9ce6e7', N'0958151', N'rua rubens', NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'414ea751-a208-47ee-ac2b-e6f794dccd7c', N'09510200', N'Rua Senai', 180, CAST(-23.550500 AS Decimal(9, 6)), CAST(-46.633300 AS Decimal(8, 6)), N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'00b67468-9949-49d4-b6a4-e7d65562435e', NULL, NULL, NULL, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Enderecos] ([ID], [CEP], [Logradouro], [Numero], [Longitude], [Latitude], [Cidade]) VALUES (N'f1d59875-a574-4da2-b6e1-ea00f0e6aec9', N'string', N'string', 0, NULL, NULL, N'Maua')
GO
INSERT [dbo].[Especialidades] ([ID], [Especialidade]) VALUES (N'3fa85f64-5717-4562-b3fc-2c963f66afa6', N'Neurologista')
GO
INSERT [dbo].[Especialidades] ([ID], [Especialidade]) VALUES (N'2d55aebc-153d-47f8-9863-b268c8e947db', N'Cardiologista')
GO
INSERT [dbo].[Especialidades] ([ID], [Especialidade]) VALUES (N'5dfc3955-7fd8-47d6-96d9-f9753331fb8e', N'Pediatra')
GO
INSERT [dbo].[Exames] ([ID], [Descricao], [ConsultaID]) VALUES (N'389c7300-2079-4777-964f-59c195c9e415', N'REPÚBLICA FEDERATIVA DO BRASIL 
GOVERNO DO ESTADO DE GOIÁS 
NOME NOME NOME NOME NOME NOME 
PAI PAI PAI PAI PAI PAI 
MÀE MÁE MÀE 
DATA ORGAO 
RH 
NATURAL''OADE 
SÃO PAULO • SP 
ssp.sp 
CBSERVAÇ.ÀO 
CARTEIRA DE IDENTIDADE 
', N'086801f4-2c4e-4ff5-b48d-09e20e7e08c9')
GO
INSERT [dbo].[Exames] ([ID], [Descricao], [ConsultaID]) VALUES (N'10adb0ea-8e70-433d-b34e-f147ea362697', N'new 
or.js 
Go 
Run 
erminal 
Help 
p VitalHub 
StyleJs X ModalAppointment.js Home.js 
InsertRecord.js 
src > components > ModalAppointment > Style.js > ContentModal 
C) app.json 
6 
10 
11 
12 
13 
14 
15 
16 
17 
18 
19 
20 
21 
22 
23 
25 
26 
27 
28 
29 
30 
31 
32 
33 
34 
35 
36 
37 
import styled from "styled-components"; 
import Btn } from ./Button/Button"; 
import { Linkcancel } from 
" ./Link/sty1e"; 
export const viewModa1 styled.View• 
flex: 1; 
background-color: rgba(ø, ø, ø, ø.5); 
align-items: center; 
justify-content: center; 
export const ContentModa1 = 
background-color: white; 
border-radius: løpx; 
width: 90%; 
height: 55%} 
align-items: center; 
const Imagemoda1Ap 
export 
margin-top: 20px; 
const Imagepaciente 
export 
width : 
90%; 
height : 
17ø; 
border-radius; 8px; 
styled. View- 
- styled ..!nage- 
styled ..!nage- 
export const ViewData styled,View• 
flex-direction; row; 
gap: 20px; 
margin-top; 15P%$ 
', N'12786b79-8825-4db9-b595-e98b71dac9f1')
GO
INSERT [dbo].[Exames] ([ID], [Descricao], [ConsultaID]) VALUES (N'd3ccac9d-49d5-4b30-b0e1-f952007c1f85', N'Excelente 
final de semana 
para você e toda 
sua família! 
', N'0d398190-5d73-41ae-b8ab-e1c221188f53')
GO
INSERT [dbo].[Medicos] ([ID], [EspecialidadeID], [CRM], [EnderecoID]) VALUES (N'b6a94404-3431-476a-9b7c-2f6fe0108344', N'3fa85f64-5717-4562-b3fc-2c963f66afa6', N'8887777', N'82562391-7f20-434a-b8e9-dcb4786254bf')
GO
INSERT [dbo].[Medicos] ([ID], [EspecialidadeID], [CRM], [EnderecoID]) VALUES (N'bd60131a-6abc-43a8-9e73-755eba8a513e', N'3fa85f64-5717-4562-b3fc-2c963f66afa6', N'CRM345623', N'0c7fba6b-e6ee-4115-8ebc-54ba49242ede')
GO
INSERT [dbo].[Medicos] ([ID], [EspecialidadeID], [CRM], [EnderecoID]) VALUES (N'58b40da3-fb48-4f5e-ad88-7f84433c5118', N'2d55aebc-153d-47f8-9863-b268c8e947db', N'crm34567', N'1264e87a-271b-48be-bbab-53d01a330782')
GO
INSERT [dbo].[MedicosClinicas] ([ID], [ClinicaID], [MedicoID]) VALUES (N'93c13046-dc2e-46cb-a59b-623376f32ce1', N'0fca061b-328e-4f0d-a5d9-0f89343be832', N'b6a94404-3431-476a-9b7c-2f6fe0108344')
GO
INSERT [dbo].[NiveisPrioridade] ([ID], [Prioridade]) VALUES (N'52785d0d-267f-468a-a671-0fd61a8e4a9e', 2)
GO
INSERT [dbo].[NiveisPrioridade] ([ID], [Prioridade]) VALUES (N'395c5e28-07be-467b-ae19-3de0b37c6945', 0)
GO
INSERT [dbo].[NiveisPrioridade] ([ID], [Prioridade]) VALUES (N'95da7213-24e5-42e8-be31-ea5cdc6b19a0', 1)
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'd7b9c5a5-0f75-44ea-a14d-0469eaf4f7fe', NULL, NULL, NULL, N'6eaec57f-0552-40fd-9604-5d2ce2e0384e')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'17786533-7455-475b-8882-05d1d3363edc', NULL, NULL, NULL, N'7af13c45-6427-4b83-b7f3-6e564b953491')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'32628616-5340-4b1a-9386-16a43af0654b', CAST(N'2005-01-22' AS Date), NULL, NULL, N'a0e2d0b3-42f8-4ce7-a87c-05aae1d4efbf')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'e928aebc-1dd1-476a-a151-21526bd0488d', NULL, NULL, NULL, N'e6eac27b-aed4-4a24-86a9-090ea1efb6d1')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'd2c31682-65b9-4041-be3f-29c16bb6af26', NULL, NULL, NULL, N'00b67468-9949-49d4-b6a4-e7d65562435e')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'767e0af3-d03d-4fe5-a2c7-2c3b30f6a3ae', NULL, NULL, NULL, N'431a6f23-40af-4acb-ab20-24c1ab983f20')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'64faaf3f-59b3-4dbf-bfc0-316f491a594d', NULL, NULL, NULL, N'0d2f4426-02d4-4020-869d-86849a2ec6e7')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'0f49bd10-7350-4a01-8360-3bcfe5326c75', CAST(N'2024-04-11' AS Date), N'543255324', N'5432535435', N'2b5337c1-59a2-4423-8efd-d7707db15006')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'b1d6d9b0-5225-445f-ba17-4400106f2f67', CAST(N'2006-12-15' AS Date), N'589534593', N'56789075678', N'7e3eb2ca-185f-4283-87c4-d9af04d313f8')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'5b07fd2d-396a-439e-893d-4abac9500c4b', NULL, NULL, NULL, N'd9f8d99e-3386-48e4-bbe1-c769c309c5f2')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'7b694374-5452-4fb8-8914-5f3378e6d2ea', CAST(N'2024-04-11' AS Date), N'543255324', N'5432535435', N'6a45e4e2-7d23-4f67-bcc3-67ef1f6f8926')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'eec80fb8-fdfa-4dcc-ad16-6e9e3ceeba67', NULL, NULL, NULL, N'fce2c301-c79b-4fe6-9725-a5c375f77f54')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'124d48c2-a628-4a51-93fc-721313b3fc68', CAST(N'2024-04-08' AS Date), N'54545454545', N'545454545454', N'fd1d2842-9367-4ee8-bb04-52d0fcbf4c0d')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'b8e40930-0acb-431f-bf4b-a261ea945319', CAST(N'2050-04-26' AS Date), N'589534865', N'string', N'f1d59875-a574-4da2-b6e1-ea00f0e6aec9')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'469522db-526a-4c46-86c2-d15e2733c3b4', CAST(N'2006-12-15' AS Date), N'589534593', N'56789075678', N'17677ac9-4aa8-49f2-9053-8e3abf009aed')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'ce617e2e-69d6-47f1-8eef-e14ce9fd67cf', NULL, NULL, NULL, N'4e5f485a-ffe6-4a83-b339-aed27b3b59a0')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'94ff68d1-907c-429f-bd67-e4398a5979c7', NULL, NULL, NULL, N'51b1d6cb-8307-435a-a384-b7d09aca1a0d')
GO
INSERT [dbo].[Pacientes] ([ID], [DataNascimento], [RG], [CPF], [EnderecoID]) VALUES (N'47b7244a-d0ea-4779-a9c3-f3ba46d861e8', NULL, NULL, NULL, N'6abaaff3-2a88-44cc-8abb-510c4c4ca7d2')
GO
INSERT [dbo].[Receitas] ([ID], [Medicamento]) VALUES (N'4c40e2e6-d11c-45fb-9c38-01aa03315fbb', N'Teste')
GO
INSERT [dbo].[Receitas] ([ID], [Medicamento]) VALUES (N'344bf775-e9cf-406a-a478-1d90b68239c9', NULL)
GO
INSERT [dbo].[Receitas] ([ID], [Medicamento]) VALUES (N'32e9be5c-2754-4e25-9447-2d08144a0178', N'Teste')
GO
INSERT [dbo].[Receitas] ([ID], [Medicamento]) VALUES (N'24c9bbbd-d054-492c-8ce6-34caad720ca1', NULL)
GO
INSERT [dbo].[Receitas] ([ID], [Medicamento]) VALUES (N'463ba2c7-f3f1-40ff-acc2-6174f9d8ca12', N'09 ')
GO
INSERT [dbo].[Receitas] ([ID], [Medicamento]) VALUES (N'a03e791f-a900-4799-b1e1-76ed82977bf1', N'Teste')
GO
INSERT [dbo].[Receitas] ([ID], [Medicamento]) VALUES (N'74f017d3-2689-40ee-bde4-a2888166dcad', NULL)
GO
INSERT [dbo].[Receitas] ([ID], [Medicamento]) VALUES (N'4791c97d-dd43-440d-bd7d-b54eb846869b', NULL)
GO
INSERT [dbo].[Receitas] ([ID], [Medicamento]) VALUES (N'8e8c75be-8a8d-4a9b-8662-cdb0d3f50fc8', N'Teste')
GO
INSERT [dbo].[Receitas] ([ID], [Medicamento]) VALUES (N'1747a035-afd6-4ec3-ab95-e0753117e601', NULL)
GO
INSERT [dbo].[Situacoes] ([ID], [Situacao]) VALUES (N'8b2bced0-8117-4c57-a5d3-6c732a067e38', N'Realizados')
GO
INSERT [dbo].[Situacoes] ([ID], [Situacao]) VALUES (N'dff3e799-eeb1-4dee-b3bc-92da062fc8f1', N'Pendentes')
GO
INSERT [dbo].[Situacoes] ([ID], [Situacao]) VALUES (N'c9699175-6ba3-440f-addc-d4e80122ab83', N'Cancelados')
GO
INSERT [dbo].[TiposUsuario] ([ID], [TipoUsuario]) VALUES (N'8faac312-69ab-45fe-be71-263f22d7988b', N'Medico')
GO
INSERT [dbo].[TiposUsuario] ([ID], [TipoUsuario]) VALUES (N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'Paciente')
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'd7b9c5a5-0f75-44ea-a14d-0469eaf4f7fe', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'lucao', N'Mourarubens28@gmail.com', N'$2a$11$SzW.tn1V8Q6wH9AgNHwCZuZyfGYY/vMZv3.igCn4TThlMjzOBLb6S', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/download.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'17786533-7455-475b-8882-05d1d3363edc', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'lucao', N'Mourarubens28@gmail.com', N'$2a$11$RN3dfTIFdVs63fBb/y4Ws.TaQI2SrEjhaQuEkebmtASXvx0loVc.O', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/download.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'32628616-5340-4b1a-9386-16a43af0654b', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'Ruhens', N'rubens28012005@gmail.com', N'$2a$11$sTmH1/ef6EY2E6yy8kI0kelcR44kLXaYv1tjz9H4a9yd9tIOyAa4e', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/download.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'e928aebc-1dd1-476a-a151-21526bd0488d', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'lucao', N'Mourarubens28@gmail.com', N'$2a$11$bNR37KVDbSrXPTn1QcNHGe1Ch4Wa9SaVKJ98L4v0Ulv05uEdGLdZO', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/download.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'd2c31682-65b9-4041-be3f-29c16bb6af26', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'Ruhens', N'rubens28012005@gmail.com', N'$2a$11$0XbjgjlNBFItJmMkX90nte/TRNnQqmEn/IzZmglkZl2J3fUBYAr7a', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/download.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'767e0af3-d03d-4fe5-a2c7-2c3b30f6a3ae', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'lucao', N'Mourarubens28@gmail.com', N'$2a$11$DgckEKxqa0ga552a9Zc1PuFARolapAe2Mj2AvmGusAd9NfwYrBJTm', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/download.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'b6a94404-3431-476a-9b7c-2f6fe0108344', N'8faac312-69ab-45fe-be71-263f22d7988b', N'Rubens Moura', N'rubens@senai.com', N'$2a$11$dbJiXopzwcdwDXHnvu6fyO2x9PKKwBszO.Dw6gomdBYY2FXliY3t2', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/770bee756f4e4f869575b65ec9cb5e71.exp', 1557)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'64faaf3f-59b3-4dbf-bfc0-316f491a594d', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'Rubens Moura ', N'rubens@paciente.com', N'$2a$11$oNTzNEudiyBzH1HuMkCsZeMZagkzoJR0nqI0aZmXNEnX4e4.2Qdm.', NULL, NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'0f49bd10-7350-4a01-8360-3bcfe5326c75', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'stringgg', N'rubens28012005@gmail.com', N'$2a$11$79s1ITXR0pXPitrbnqC0EOR/sSZZ4VtyDda7Xi94X6cTrkuTzqAqq', N'string', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'b1d6d9b0-5225-445f-ba17-4400106f2f67', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'joaoZete', N'jhones@senai.com', N'$2a$11$6iB6K2b.tXeIZ46WDuW8C.m.Ui2Sra8Lm3YINMtWgPfGZ.XvdggBy', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/download.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'5b07fd2d-396a-439e-893d-4abac9500c4b', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'Ruhens', N'rubens28012005@gmail.com', N'$2a$11$6E/5VnpO2X.5Na6Ew4a9LuxgPU02uE5JSOpo8/zzwqAbmaNHUPbhK', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/download.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'7b694374-5452-4fb8-8914-5f3378e6d2ea', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'stringgg', N'afiorentino1415@gmail.com', N'$2a$11$Tj6e64w0CInpZ4L3w2prwe6mSx4rUs2dJlZ5Nzj4sk9jJLohcEQCS', N'string', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'eec80fb8-fdfa-4dcc-ad16-6e9e3ceeba67', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'Ruhens', N'rubens28012005@gmail.com', N'$2a$11$TGeBSuIsn98so4LBRvr4SeyAmzpM5F.qhx6KQFrPAtdJmhTW3GgWO', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/download.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'124d48c2-a628-4a51-93fc-721313b3fc68', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'Rubens', N'rubin@email.com', N'$2a$11$c3nmvwrb4pCBvUHb7bwO7Ofi9tfe4gHgGEvyDjvvG1Z6Cx5cjo3KK', NULL, NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'bd60131a-6abc-43a8-9e73-755eba8a513e', N'8faac312-69ab-45fe-be71-263f22d7988b', N'João Oliveira', N'joao@senai.com', N'$2a$11$4jfc2YwHOn3cXg/88dOy4.idtTS1ljx4AVg1N1f2U5h7oCrrq39CK', N'string', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'58b40da3-fb48-4f5e-ad88-7f84433c5118', N'8faac312-69ab-45fe-be71-263f22d7988b', N'Carlao Roque', N'carlos@roque', N'$2a$11$lue/.TUAHOsTvvwBLUrf7eA5iI2xRLJ1sKz927JPB7JZJcbpHHheK', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/bb36143fcd084b138d89ac1b0e0e49ee.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'b8e40930-0acb-431f-bf4b-a261ea945319', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'Artur Fiorentino', N'artur@senai.com', N'$2a$11$srLBIZ3swSIFm9B.6of5tODrHOpX2/jKJV2rb6flnB1q..PIFG3zO', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/51d076d640354508a1c50db45a07f199.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'469522db-526a-4c46-86c2-d15e2733c3b4', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'Lucãozzete', N'lucao@senai.com', N'$2a$11$ANLoBTPnyP.qEj/hBGb8QONhINrQN9nZFz0Vq0ZcKUieKX7lWY60m', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/8219a7bcff444c1b8220eadcc2b81259.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'ce617e2e-69d6-47f1-8eef-e14ce9fd67cf', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'Ruhens', N'rubens28012005@gmail.com', N'$2a$11$eZOX60f7Ri0eUdOwowa0mOvQAb4zPnv0.uRX1S8XymLHPA6APMKP6', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/download.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'94ff68d1-907c-429f-bd67-e4398a5979c7', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'lucao', N'Mourarubens28@gmail.com', N'$2a$11$u65O1jDE3NUxo2NVQmjKVulkpKurehd9iJFGJzofOd3wIykmBY2sy', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/download.jpg', NULL)
GO
INSERT [dbo].[Usuarios] ([ID], [TipoUsuarioID], [Nome], [Email], [Senha], [Foto], [CodRecupSenha]) VALUES (N'47b7244a-d0ea-4779-a9c3-f3ba46d861e8', N'5f6bd789-1bea-4199-8ada-3cce3035272e', N'Ruhens', N'rubens28012005@gmail.com', N'$2a$11$jK/8BmJrgqTc33PxZyyCjuXNu72dCLigI8OZdOgV/wVgIQTGDLMKG', N'https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/download.jpg', NULL)
GO
ALTER TABLE [dbo].[Clinicas]  WITH CHECK ADD  CONSTRAINT [FK_Clinicas_Enderecos] FOREIGN KEY([EnderecoID])
REFERENCES [dbo].[Enderecos] ([ID])
GO
ALTER TABLE [dbo].[Clinicas] CHECK CONSTRAINT [FK_Clinicas_Enderecos]
GO
ALTER TABLE [dbo].[Consultas]  WITH CHECK ADD  CONSTRAINT [FK_Consultas_MedicosClinicas] FOREIGN KEY([MedicoClinicaID])
REFERENCES [dbo].[MedicosClinicas] ([ID])
GO
ALTER TABLE [dbo].[Consultas] CHECK CONSTRAINT [FK_Consultas_MedicosClinicas]
GO
ALTER TABLE [dbo].[Consultas]  WITH CHECK ADD  CONSTRAINT [FK_Consultas_NiveisPrioridade] FOREIGN KEY([PrioridadeID])
REFERENCES [dbo].[NiveisPrioridade] ([ID])
GO
ALTER TABLE [dbo].[Consultas] CHECK CONSTRAINT [FK_Consultas_NiveisPrioridade]
GO
ALTER TABLE [dbo].[Consultas]  WITH CHECK ADD  CONSTRAINT [FK_Consultas_Pacientes] FOREIGN KEY([PacienteID])
REFERENCES [dbo].[Pacientes] ([ID])
GO
ALTER TABLE [dbo].[Consultas] CHECK CONSTRAINT [FK_Consultas_Pacientes]
GO
ALTER TABLE [dbo].[Consultas]  WITH CHECK ADD  CONSTRAINT [FK_Consultas_Receitas] FOREIGN KEY([ReceitaID])
REFERENCES [dbo].[Receitas] ([ID])
GO
ALTER TABLE [dbo].[Consultas] CHECK CONSTRAINT [FK_Consultas_Receitas]
GO
ALTER TABLE [dbo].[Consultas]  WITH CHECK ADD  CONSTRAINT [FK_Consultas_Situacoes] FOREIGN KEY([SituacaoID])
REFERENCES [dbo].[Situacoes] ([ID])
GO
ALTER TABLE [dbo].[Consultas] CHECK CONSTRAINT [FK_Consultas_Situacoes]
GO
ALTER TABLE [dbo].[Exames]  WITH CHECK ADD  CONSTRAINT [FK_Exames_Consultas] FOREIGN KEY([ConsultaID])
REFERENCES [dbo].[Consultas] ([ID])
GO
ALTER TABLE [dbo].[Exames] CHECK CONSTRAINT [FK_Exames_Consultas]
GO
ALTER TABLE [dbo].[Medicos]  WITH CHECK ADD  CONSTRAINT [FK_Medicos_Enderecos] FOREIGN KEY([EnderecoID])
REFERENCES [dbo].[Enderecos] ([ID])
GO
ALTER TABLE [dbo].[Medicos] CHECK CONSTRAINT [FK_Medicos_Enderecos]
GO
ALTER TABLE [dbo].[Medicos]  WITH CHECK ADD  CONSTRAINT [FK_Medicos_Especialidades] FOREIGN KEY([EspecialidadeID])
REFERENCES [dbo].[Especialidades] ([ID])
GO
ALTER TABLE [dbo].[Medicos] CHECK CONSTRAINT [FK_Medicos_Especialidades]
GO
ALTER TABLE [dbo].[Medicos]  WITH CHECK ADD  CONSTRAINT [FK_Medicos_Usuarios] FOREIGN KEY([ID])
REFERENCES [dbo].[Usuarios] ([ID])
GO
ALTER TABLE [dbo].[Medicos] CHECK CONSTRAINT [FK_Medicos_Usuarios]
GO
ALTER TABLE [dbo].[MedicosClinicas]  WITH CHECK ADD  CONSTRAINT [FK_MedicosClinicas_Clinicas] FOREIGN KEY([ClinicaID])
REFERENCES [dbo].[Clinicas] ([ID])
GO
ALTER TABLE [dbo].[MedicosClinicas] CHECK CONSTRAINT [FK_MedicosClinicas_Clinicas]
GO
ALTER TABLE [dbo].[MedicosClinicas]  WITH CHECK ADD  CONSTRAINT [FK_MedicosClinicas_Medicos] FOREIGN KEY([MedicoID])
REFERENCES [dbo].[Medicos] ([ID])
GO
ALTER TABLE [dbo].[MedicosClinicas] CHECK CONSTRAINT [FK_MedicosClinicas_Medicos]
GO
ALTER TABLE [dbo].[Pacientes]  WITH CHECK ADD  CONSTRAINT [FK_Pacientes_Enderecos] FOREIGN KEY([EnderecoID])
REFERENCES [dbo].[Enderecos] ([ID])
GO
ALTER TABLE [dbo].[Pacientes] CHECK CONSTRAINT [FK_Pacientes_Enderecos]
GO
ALTER TABLE [dbo].[Pacientes]  WITH CHECK ADD  CONSTRAINT [FK_Pacientes_Usuarios] FOREIGN KEY([ID])
REFERENCES [dbo].[Usuarios] ([ID])
GO
ALTER TABLE [dbo].[Pacientes] CHECK CONSTRAINT [FK_Pacientes_Usuarios]
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_TiposUsuario] FOREIGN KEY([TipoUsuarioID])
REFERENCES [dbo].[TiposUsuario] ([ID])
GO
ALTER TABLE [dbo].[Usuarios] CHECK CONSTRAINT [FK_Usuarios_TiposUsuario]
GO
