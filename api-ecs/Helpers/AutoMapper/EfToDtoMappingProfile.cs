using EC_API.DTO;
using EC_API.Models;
using AutoMapper;
using System.Linq;

namespace EC_API.Helpers.AutoMapper
{
    public class EfToDtoMappingProfile : Profile
    {
        char[] alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
        public EfToDtoMappingProfile()
        {
            CreateMap<User, UserForDetailDto>();
            CreateMap<Glue, GlueDto>().ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.CreatedDate.ToParseStringDateTime()));
            CreateMap<Glue, GlueCreateDto>().ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.CreatedDate.ToParseStringDateTime()));
            CreateMap<Glue, GlueCreateDto1>()
                .ForMember(d => d.GlueID, o => o.MapFrom(s => s.ID))
                .ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.CreatedDate.ToParseStringDateTime()));
            CreateMap<Ingredient, IngredientDto>()
                .ForMember(d => d.Supplier, o => o.MapFrom(x => x.Supplier.Name))
                .ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.CreatedDate.ToParseStringDateTime()));

            CreateMap<Ingredient, IngredientDto1>()
                .ForMember(d => d.Supplier, o => o.MapFrom(x => x.Supplier.Name))
                .ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.CreatedDate.ToParseStringDateTime()));/*.ForMember(d => d.Position, o => o.MapFrom(s => s.Position != null ? alpha[s.Position -1] : ""))*/;
            CreateMap<Ingredient, IngredientForImportExcelDto>().ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.CreatedDate.ToParseStringDateTime()));

            CreateMap<Line, LineDto>();
            CreateMap<Plan, PlanDto>()
                 .ForMember(d => d.ModelName, o => o.MapFrom(x => x.BPFCEstablish.ModelName.Name))
                .ForMember(d => d.ModelNoName, o => o.MapFrom(x => x.BPFCEstablish.ModelNo.Name))
                .ForMember(d => d.ArticleName, o => o.MapFrom(x => x.BPFCEstablish.ArticleNo.Name))
                .ForMember(d => d.BuildingName, o => o.MapFrom(x => x.Building.Name))
                .ForMember(d => d.ProcessName, o => o.MapFrom(x => x.BPFCEstablish.ArtProcess.Process.Name))
                .ForMember(d => d.ModelNameID, o => o.MapFrom(x => x.BPFCEstablish.ModelNameID))
                .ForMember(d => d.ModelNoID, o => o.MapFrom(x => x.BPFCEstablish.ModelNoID))
                .ForMember(d => d.ArticleNoID, o => o.MapFrom(x => x.BPFCEstablish.ArticleNoID))
                .ForMember(d => d.ArtProcessID, o => o.MapFrom(x => x.BPFCEstablish.ArtProcessID));
            CreateMap<ModelNo, ModelNoDto>();
            CreateMap<ArtProcess, ArtProcessDto>();
            CreateMap<Process, ProcessDto>();
            CreateMap<Kind, KindDto>();
            CreateMap<Part, PartDto>();
            CreateMap<Material, MaterialDto>();
            CreateMap<ModelName, ModelNameDto>();
            CreateMap<MapModel, MapModelDto>();
            CreateMap<UserDetailDto, UserDetail>();
            CreateMap<Supplier, SuppilerDto>();
            CreateMap<PartName, PartNameDto>();
            CreateMap<PartName2, PartName2Dto>();
            CreateMap<MaterialName, MaterialNameDto>();
            CreateMap<ArticleNo, ArticleNoDto>();
            CreateMap<Building, BuildingDto>();
            CreateMap<BuildingUser, BuildingUserDto>();
            CreateMap<Comment, CommentDto>();
            CreateMap<BPFCEstablish, BPFCEstablishDto>()
                .ForMember(d => d.ModelName, o => o.MapFrom(x => x.ModelName.Name))
                .ForMember(d => d.ModelNo, o => o.MapFrom(x => x.ModelNo.Name))
                .ForMember(d => d.ArticleNo, o => o.MapFrom(x => x.ArticleNo.Name))
                .ForMember(d => d.ArtProcess, o => o.MapFrom(x => x.ArtProcess.Process.Name));
            CreateMap<BPFCEstablish, BPFCStatusDto>()
              .ForMember(d => d.ModelName, o => o.MapFrom(x => x.ModelName.Name))
              .ForMember(d => d.ModelNo, o => o.MapFrom(x => x.ModelNo.Name))
              .ForMember(d => d.ArticleNo, o => o.MapFrom(x => x.ArticleNo.Name))
              .ForMember(d => d.ArtProcess, o => o.MapFrom(x => x.ArtProcess.Process.Name));
            CreateMap<BPFCEstablish, BPFCRecordDto>()
           .ForMember(d => d.ModelName, o => o.MapFrom(x => x.ModelName.Name))
           .ForMember(d => d.ModelNo, o => o.MapFrom(x => x.ModelNo.Name))
           .ForMember(d => d.ArticleNo, o => o.MapFrom(x => x.ArticleNo.Name))
           .ForMember(d => d.ArtProcess, o => o.MapFrom(x => x.ArtProcess.Process.Name));

            CreateMap<MixingInfoDto, MixingInfo>();
            CreateMap<MixingInfoForCreateDto, MixingInfo>();

            CreateMap<BPFCEstablish, BPFCEstablish>()
             .ForMember(d => d.ModelName, o => o.MapFrom(x => x.ModelName.Name))
             .ForMember(d => d.ModelNo, o => o.MapFrom(x => x.ModelNo.Name))
             .ForMember(d => d.ArticleNo, o => o.MapFrom(x => x.ArticleNo.Name))
             .ForMember(d => d.ArtProcess, o => o.MapFrom(x => x.ArtProcess.Process.Name));
        }

    }
}