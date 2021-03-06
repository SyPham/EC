﻿using EC_API.DTO;
using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Interface
{
   public interface ICommentService : IECService<CommentDto>
    {
        Task<List<CommentDto>> GetAllCommentByBPFCEstablishID(int BPFCEstablishID);
    }
}
