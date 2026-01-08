using System;

namespace CongDuLieuDatDaiPhiaNam.WebApi.Helpers
{
    public static class EnumHelper
    {
        public static bool TryParse<T>(string? value, out T parsed) where T : struct, Enum
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                parsed = default;
                return false;
            }

            return Enum.TryParse(value, true, out parsed);
        }
    }
}
