using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EC_API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using EC_API._Repositories.Interface;
using EC_API._Services.Interface;
using EC_API.DTO;
using EC_API.Models;
using Microsoft.EntityFrameworkCore;
using EC_API.SignalrHub;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Http;

namespace EC_API._Services.Services
{
    public class GlueService : IGlueService
    {
        private readonly IGlueIngredientRepository _repoGlueIngredient;
        private readonly IGlueRepository _repoGlue;
        private readonly IPartNameRepository _repoPartName;
        private readonly IPartName2Repository _repoPartName2;
        private readonly IPartRepository _repoPart;
        private readonly IKindRepository _repoKind;
        private readonly IMaterialRepository _repoMaterial;
        private readonly IMaterialNameRepository _repoMaterialName;
        private readonly IHubContext<ECHub> _hubContext;
        private readonly IModelNameRepository _repoModelName;
        private readonly IBPFCEstablishRepository _repoBPFC;
        private readonly IHttpContextAccessor _accessor;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public GlueService(
            IHttpContextAccessor accessor,
            IGlueRepository repoBrand,
            IModelNameRepository repoModelName,
            IGlueIngredientRepository repoGlueIngredient,
            IPartNameRepository repoPartName,
            IPartName2Repository repoPartName2,
            IPartRepository repoPart,
            IKindRepository repoKind,
            IMaterialRepository repoMaterial,
            IBPFCEstablishRepository repoBPFC,
            IMaterialNameRepository repoMaterialName,
            IHubContext<ECHub> hubContext,
            IMapper mapper,
            MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _accessor = accessor;
            _repoGlue = repoBrand;
            _repoPartName = repoPartName;
            _repoPartName2 = repoPartName2;
            _repoPart = repoPart;
            _repoKind = repoKind;
            _repoMaterial = repoMaterial;
            _repoMaterialName = repoMaterialName;
            _hubContext = hubContext;
            _repoBPFC = repoBPFC;
            _repoModelName = repoModelName;
            _repoGlueIngredient = repoGlueIngredient;
        }


        private async Task<string> GenatateGlueCode(string code)
        {
            int lenght = 8;
            if (await _repoGlue.FindAll().AnyAsync(x => x.Code.Equals(code)) == true)
            {
                var newCode = CodeUtility.RandomString(lenght);
                return await GenatateGlueCode(newCode);
            }
            return code;

        }
        //Thêm Brand mới vào bảng Glue
        public async Task<bool> Add(GlueCreateDto model)
        {
            var glue = _mapper.Map<Glue>(model);
            glue.Code = await GenatateGlueCode(glue.Code);
            glue.CreatedDate = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss tt");
            var nameList = new List<int>();
            foreach (var item in _repoGlue.FindAll().Where(x => x.BPFCEstablishID == model.BPFCEstablishID))
            {
                if (item.Name.Length == 1 || item.Name.Length == 2)
                {
                    nameList.Add(item.Name.ToInt());
                }
            }
            var name = nameList.OrderByDescending(x => x).FirstOrDefault();
            glue.Name = (name + 1).ToString();
            glue.isShow = true;
            _repoGlue.Add(glue);

            return await _repoGlue.SaveAll();
        }

        public async Task<bool> Add1(GlueCreateDto1 model)
        {

            //if (model.BPFCEstablishID == 0)
            //{
            //    model.ModelNo = "";
            //}
            //else
            //{

            //    model.ModelNo = _repoPartName.GetAll().FirstOrDefault(a => a.ID == model.ModelNoID).Name;
            //}

            //if (model.PartNameID == 0)
            //{
            //    model.PathName = "";
            //}
            //else
            //{
            //    model.PathName = _repoPartName2.GetAll().FirstOrDefault(a => a.ID == model.PartNameID).Name;
            //}

            //if (model.MaterialNameID == 0)
            //{
            //    model.MaterialName = "";
            //}
            //else
            //{
            //    model.MaterialName = _repoMaterialName.GetAll().FirstOrDefault(a => a.ID == model.MaterialNameID).Name;
            //}

            //model.Name = model.Name;
            //var glue = _mapper.Map<Glue>(model);
            //var glueList = await _repoGlue.FindAll().Where(x => x.BPFCEstablishID == model.BPFCEstablishID).ToListAsync();
            //var nameList = new List<int>();
            //foreach (var item in glueList)
            //{
            //    if (item.Name.Length == 1 || item.Name.Length == 2)
            //    {
            //        nameList.Add(item.Name.ToInt());
            //    }
            //}
            //var name = nameList.OrderByDescending(x => x).FirstOrDefault();
            //glue.Name = (name + 1).ToString();
            //_repoGlue.Add(glue);

            //return await _repoGlue.SaveAll();
            throw new System.NotImplementedException();

        }


        //Lấy danh sách Brand và phân trang
        public async Task<PagedList<GlueCreateDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoGlue.FindAll().Where(x => x.isShow == true).ProjectTo<GlueCreateDto>(_configMapper).OrderByDescending(x => x.ID);
            return await PagedList<GlueCreateDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        //public async Task<object> GetIngredientOfGlue(int glueid)
        //{
        //    return await _repoGlue.GetIngredientOfGlue(glueid);

        //    throw new System.NotImplementedException();
        //}

        //Tìm kiếm glue
        public async Task<PagedList<GlueCreateDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoGlue.FindAll().ProjectTo<GlueCreateDto>(_configMapper)
            .Where(x => x.Code.Contains(text.ToString()))
            .OrderByDescending(x => x.ID);
            return await PagedList<GlueCreateDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<bool> CheckExists(int id)
        {
            return await _repoGlue.CheckExists(id);
        }

        //Xóa Brand
        public async Task<bool> Delete(object id)
        {
            var glue = _repoGlue.FindById(id);
            string token = _accessor.HttpContext.Request.Headers["Authorization"];
            var userID = JWTExtensions.GetDecodeTokenByProperty(token, "nameid").ToInt();
            // _repoGlue.Remove(glue);
            glue.isShow = false;
            glue.ModifiedBy = userID;
            glue.ModifiedDate = DateTime.Now;
            return await _repoGlue.SaveAll();
        }

        //Cập nhật Brand
        public async Task<bool> Update(GlueCreateDto model)
        {
            var glue = _mapper.Map<Glue>(model);
            glue.isShow = true ;
            _repoGlue.Update(glue);
            var result = await _repoGlue.SaveAll();
            await _hubContext.Clients.All.SendAsync("summaryRecieve", "ok");
            return result;
        }

        //Cập nhật Brand
        public async Task<bool> UpdateChemical(GlueCreateDto model)
        {
            var glue = _mapper.Map<Glue>(model);
            _repoGlue.Update(glue);
            var item = _repoGlueIngredient.FindAll().FirstOrDefault(x => x.GlueID.Equals(model.ID) && x.Percentage == 100);
            if (item != null)
            {
                item.IngredientID = model.IngredientID;
                return await _repoGlue.SaveAll();
            }
            else
                return false;
        }
        
        //Lấy toàn bộ danh sách Brand 
        public async Task<List<GlueCreateDto>> GetAllAsync()
        {
            return await _repoGlue.FindAll().ProjectTo<GlueCreateDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
        }

        public async Task<List<GlueCreateDto1>> GetAllAsyncByModalName(int modelNameID)
        {
            //var lists = await _repoGlue.FindAll().ProjectTo<GlueCreateDto1>(_configMapper).Where(x => x.ModelNameID == modelNameID).OrderByDescending(x => x.ID).Select(x => new GlueCreateDto1
            //{
            //    ID = x.ID,
            //    Name = x.Name,
            //    GlueID = x.GlueID,
            //    Code = x.Code,
            //    ModelNo = x.ModelNo,
            //    CreatedDate = x.CreatedDate,
            //    ModelNameID = x.ModelNameID,
            //    PathName = x.PathName,
            //    PartNameID = x.PartNameID,
            //    MaterialNameID = x.MaterialNameID,
            //    MaterialName = x.MaterialName,
            //    Consumption = x.Consumption,
            //    ExpiredTime = x.ExpiredTime,
            //    CreatedBy = x.CreatedBy,
            //    Chemical = new GlueDto1 { ID = x.GlueID, Name = x.Name }
            //}).ToListAsync();
            //return lists;
            throw new System.NotImplementedException();

            //return await _repoGlue.FindAll().ProjectTo<GlueCreateDto1>(_configMapper).Where(x=>x.ModalNameID == modelNameID).OrderByDescending(x => x.ID).ToListAsync();
        }
        public async Task<List<GlueCreateDto1>> GetAllGluesForBPFC(int modelNameID, int articleNo, int processID)
        {
            //var lists = await _repoGlue.FindAll().Where(x => x.ModalNameID == modelNameID && x.ArticleNoID == articleNo && x.ProcessID == processID)
            //    .ProjectTo<GlueCreateDto1>(_configMapper)
            //    .OrderByDescending(x => x.ID).Select(x => new GlueCreateDto1
            //    {
            //        ID = x.ID,
            //        Name = x.Name,
            //        GlueID = x.GlueID,
            //        Code = x.Code,
            //        ModelNo = x.ModelNo,
            //        CreatedDate = x.CreatedDate,
            //        ModelNameID = x.ModelNameID,
            //        PathName = x.PathName,
            //        PartNameID = x.PartNameID,
            //        MaterialNameID = x.MaterialNameID,
            //        MaterialName = x.MaterialName,
            //        Consumption = x.Consumption,
            //        ExpiredTime = x.ExpiredTime,
            //        CreatedBy = x.CreatedBy,
            //        Chemical = new GlueDto1 { ID = x.GlueID, Name = x.Name }
            //    }).ToListAsync();
            //return lists;
            throw new System.NotImplementedException();

            //return await _repoGlue.FindAll().ProjectTo<GlueCreateDto1>(_configMapper).Where(x=>x.ModalNameID == modelNameID).OrderByDescending(x => x.ID).ToListAsync();
        }


        //Lấy Brand theo Brand_Id
        public GlueCreateDto GetById(object id)
        {
            return _mapper.Map<Glue, GlueCreateDto>(_repoGlue.FindById(id));
        }

        public async Task<bool> CheckBarCodeExists(string code)
        {
            return await _repoGlue.CheckBarCodeExists(code);

        }

        public async Task<List<GlueCreateDto1>> GetAllGluesByBPFCID(int BPFCID)
        {
            var lists = await _repoGlue.FindAll().Where(x => x.BPFCEstablishID == BPFCID && x.isShow == true)
                .ProjectTo<GlueCreateDto1>(_configMapper)
                .OrderByDescending(x => x.ID).Select(x => new GlueCreateDto1
                {
                    ID = x.ID,
                    Name = x.Name,
                    GlueID = x.GlueID,
                    Code = x.Code,
                    ModelNo = x.ModelNo,
                    CreatedDate = x.CreatedDate,
                    BPFCEstablishID = x.BPFCEstablishID,
                    PathName = x.PathName,
                    PartNameID = x.PartNameID,
                    MaterialNameID = x.MaterialNameID,
                    MaterialName = x.MaterialName,
                    Consumption = x.Consumption,
                    ExpiredTime = x.ExpiredTime,
                    CreatedBy = x.CreatedBy,
                    Chemical = new GlueDto1 { ID = x.GlueID, Name = x.Name }
                }).ToListAsync();
            return lists;
        }
    }
}