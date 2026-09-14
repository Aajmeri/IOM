using System;
using System.Collections.Generic;
using System.Text;

namespace IOM.Service.Helpers
{
    /// <summary>
    /// Minimal CSV line splitter supporting double-quoted fields (with embedded commas and
    /// escaped "" quotes). Good enough for the shipping-order upload contract; not a general
    /// purpose CSV library.
    /// </summary>
    public static class CsvHelper
    {
        public static List<string> SplitLine(string line)
        {
            var fields = new List<string>();
            if (line == null) return fields;

            var current = new StringBuilder();
            var inQuotes = false;

            for (var i = 0; i < line.Length; i++)
            {
                var c = line[i];

                if (inQuotes)
                {
                    if (c == '"')
                    {
                        if (i + 1 < line.Length && line[i + 1] == '"')
                        {
                            current.Append('"');
                            i++;
                        }
                        else
                        {
                            inQuotes = false;
                        }
                    }
                    else
                    {
                        current.Append(c);
                    }
                }
                else
                {
                    if (c == '"')
                    {
                        inQuotes = true;
                    }
                    else if (c == ',')
                    {
                        fields.Add(current.ToString());
                        current.Clear();
                    }
                    else
                    {
                        current.Append(c);
                    }
                }
            }

            fields.Add(current.ToString());
            return fields;
        }
    }
}
