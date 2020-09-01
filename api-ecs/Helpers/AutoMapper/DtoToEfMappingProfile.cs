using EC_API.DTO;
using EC_API.Models;
using AutoMapper;
using System;

namespace EC_API.Helpers.AutoMapper
{
    public class DtoToEfMappingProfile : Profile
    {
        private string TotalReal(MixingInfo real)
        {
            double realTotal = 0;
            realTotal = real.ChemicalA.ToDouble() + real.ChemicalB.ToDouble() + real.ChemicalC.ToDouble() + real.ChemicalD.ToDouble() + real.ChemicalE.ToDouble();
            return realTotal.ToString();
        }
        public DtoToEfMappingProfile()
        {
            CreateMap<UserForDetailDto, User>();
            CreateMap<GlueDto, Glue>();
            CreateMap<GlueCreateDto, Glue>();
            CreateMap<GlueCreateDto1, Glue>();
            CreateMap<IngredientDto, Ingredient>().ForMember(d => d.Supplier, o => o.Ignore());
            CreateMap<IngredientForImportExcelDto, Ingredient>();
            CreateMap<IngredientDto1, Ingredient>();

            CreateMap<LineDto, Line>();
            CreateMap<ModelNameDto, ModelName>();
            CreateMap<PlanDto, Plan>();

            CreateMap<MapModelDto, MapModel>();
            CreateMap<ModelNoDto, ModelNo>();
            CreateMap<UserDetail, UserDetailDto>();
            CreateMap<SuppilerDto, Supplier>();
            CreateMap<PartNameDto, PartName>();
            CreateMap<PartName2Dto, PartName2>();
            CreateMap<MaterialNameDto, MaterialName>();
            CreateMap<ArticleNoDto, ArticleNo>();
            CreateMap<BuildingDto, Building>();
            CreateMap<BuildingUserDto, BuildingUser>();
            CreateMap<CommentDto, Comment>();
            CreateMap<BPFCEstablishDto, BPFCEstablish>();
            CreateMap<ArtProcessDto, ArtProcess>();
            CreateMap<ProcessDto, Process>();
            CreateMap<KindDto, Kind>();
            CreateMap<PartDto, Part>();
            CreateMap<MaterialDto, Material>();
            CreateMap<MixingInfo, MixingInfoDto>()
             .ForMember(d => d.RealTotal, o => o.MapFrom(real => real.ChemicalA.ToDouble() + real.ChemicalB.ToDouble() + real.ChemicalC.ToDouble() + real.ChemicalD.ToDouble() + real.ChemicalE.ToDouble()));
            CreateMap<MixingInfo, MixingInfoForCreateDto>();
            CreateMap<BuildingGlue, BuildingGlueForCreateDto>();
            CreateMap<IngredientInfo, IngredientInfoDto>();
            CreateMap<Plan, PlanForCloneDto>();
            //CreateMap<AuditTypeDto, MES_Audit_Type_M>();
        }
    }
}