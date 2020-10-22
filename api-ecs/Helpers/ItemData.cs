using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Helpers
{
    public class ItemData<T, V> : List<KeyValuePair<T, V>>
    {
        public void Add(T key, V value)
        {
            Add(new KeyValuePair<T, V>(key, value));
        }

        public List<V> Get(T key)
        {
            return FindAll(p => p.Key.Equals(key)).ConvertAll(p => p.Value);
        }
    }
}
