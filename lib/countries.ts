/** Country dial codes — used by the contact form phone field */
export interface Country {
  name: string;
  code: string; // ISO 3166-1 alpha-2
  dial: string; // e.g. "+91"
  flag: string; // emoji
  minDigits: number;
  maxDigits: number;
}

export const COUNTRIES: Country[] = [
  { name: 'India',                code: 'IN', dial: '+91',  flag: '🇮🇳', minDigits: 10, maxDigits: 10 },
  { name: 'United States',        code: 'US', dial: '+1',   flag: '🇺🇸', minDigits: 10, maxDigits: 10 },
  { name: 'United Kingdom',       code: 'GB', dial: '+44',  flag: '🇬🇧', minDigits: 10, maxDigits: 10 },
  { name: 'United Arab Emirates', code: 'AE', dial: '+971', flag: '🇦🇪', minDigits: 9,  maxDigits: 9  },
  { name: 'Saudi Arabia',         code: 'SA', dial: '+966', flag: '🇸🇦', minDigits: 9,  maxDigits: 9  },
  { name: 'Australia',            code: 'AU', dial: '+61',  flag: '🇦🇺', minDigits: 9,  maxDigits: 9  },
  { name: 'Canada',               code: 'CA', dial: '+1',   flag: '🇨🇦', minDigits: 10, maxDigits: 10 },
  { name: 'Singapore',            code: 'SG', dial: '+65',  flag: '🇸🇬', minDigits: 8,  maxDigits: 8  },
  { name: 'Germany',              code: 'DE', dial: '+49',  flag: '🇩🇪', minDigits: 10, maxDigits: 12 },
  { name: 'France',               code: 'FR', dial: '+33',  flag: '🇫🇷', minDigits: 9,  maxDigits: 9  },
  { name: 'Netherlands',          code: 'NL', dial: '+31',  flag: '🇳🇱', minDigits: 9,  maxDigits: 9  },
  { name: 'Qatar',                code: 'QA', dial: '+974', flag: '🇶🇦', minDigits: 8,  maxDigits: 8  },
  { name: 'Kuwait',               code: 'KW', dial: '+965', flag: '🇰🇼', minDigits: 8,  maxDigits: 8  },
  { name: 'Bahrain',              code: 'BH', dial: '+973', flag: '🇧🇭', minDigits: 8,  maxDigits: 8  },
  { name: 'Oman',                 code: 'OM', dial: '+968', flag: '🇴🇲', minDigits: 8,  maxDigits: 8  },
  { name: 'Malaysia',             code: 'MY', dial: '+60',  flag: '🇲🇾', minDigits: 9,  maxDigits: 10 },
  { name: 'New Zealand',          code: 'NZ', dial: '+64',  flag: '🇳🇿', minDigits: 8,  maxDigits: 9  },
  { name: 'South Africa',         code: 'ZA', dial: '+27',  flag: '🇿🇦', minDigits: 9,  maxDigits: 9  },
  { name: 'Nigeria',              code: 'NG', dial: '+234', flag: '🇳🇬', minDigits: 10, maxDigits: 11 },
  { name: 'Kenya',                code: 'KE', dial: '+254', flag: '🇰🇪', minDigits: 10, maxDigits: 10 },
  { name: 'Bangladesh',           code: 'BD', dial: '+880', flag: '🇧🇩', minDigits: 10, maxDigits: 10 },
  { name: 'Pakistan',             code: 'PK', dial: '+92',  flag: '🇵🇰', minDigits: 10, maxDigits: 10 },
  { name: 'Sri Lanka',            code: 'LK', dial: '+94',  flag: '🇱🇰', minDigits: 9,  maxDigits: 9  },
  { name: 'Nepal',                code: 'NP', dial: '+977', flag: '🇳🇵', minDigits: 9,  maxDigits: 10 },
  { name: 'Philippines',          code: 'PH', dial: '+63',  flag: '🇵🇭', minDigits: 10, maxDigits: 10 },
  { name: 'Indonesia',            code: 'ID', dial: '+62',  flag: '🇮🇩', minDigits: 9,  maxDigits: 12 },
  { name: 'Japan',                code: 'JP', dial: '+81',  flag: '🇯🇵', minDigits: 10, maxDigits: 11 },
  { name: 'China',                code: 'CN', dial: '+86',  flag: '🇨🇳', minDigits: 11, maxDigits: 11 },
  { name: 'Italy',                code: 'IT', dial: '+39',  flag: '🇮🇹', minDigits: 9,  maxDigits: 11 },
  { name: 'Spain',                code: 'ES', dial: '+34',  flag: '🇪🇸', minDigits: 9,  maxDigits: 9  },
  { name: 'Ireland',              code: 'IE', dial: '+353', flag: '🇮🇪', minDigits: 9,  maxDigits: 9  },
  { name: 'Sweden',               code: 'SE', dial: '+46',  flag: '🇸🇪', minDigits: 9,  maxDigits: 10 },
  { name: 'Norway',               code: 'NO', dial: '+47',  flag: '🇳🇴', minDigits: 8,  maxDigits: 8  },
  { name: 'Denmark',              code: 'DK', dial: '+45',  flag: '🇩🇰', minDigits: 8,  maxDigits: 8  },
  { name: 'Switzerland',          code: 'CH', dial: '+41',  flag: '🇨🇭', minDigits: 9,  maxDigits: 9  },
  { name: 'Brazil',               code: 'BR', dial: '+55',  flag: '🇧🇷', minDigits: 10, maxDigits: 11 },
  { name: 'Mexico',               code: 'MX', dial: '+52',  flag: '🇲🇽', minDigits: 10, maxDigits: 10 },
  { name: 'Ghana',                code: 'GH', dial: '+233', flag: '🇬🇭', minDigits: 9,  maxDigits: 9  },
];

export function findCountry(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code);
}

/**
 * Validate an international phone number given a country code.
 *
 * rawNumber should be the dial code + local number, e.g. "+919876543210".
 * We strip EXACTLY the country's dial prefix so the remaining digit count
 * can be checked against that country's known min/max length.
 */
export function isValidInternationalPhone(rawNumber: string, countryCode: string): boolean {
  const country = findCountry(countryCode);
  if (!country) return false;

  // Remove formatting characters (spaces, dashes, dots, parentheses)
  const clean = rawNumber.replace(/[\s\-.()]/g, '');

  // Strip the exact dial prefix. Try "+91" first, then "91", then "0".
  let localDigits = clean;
  if (localDigits.startsWith(country.dial)) {
    // e.g. "+91" prefix found → strip it
    localDigits = localDigits.slice(country.dial.length);
  } else {
    // Try without leading "+"
    const dialNoPlus = country.dial.replace('+', '');
    if (localDigits.startsWith(dialNoPlus)) {
      localDigits = localDigits.slice(dialNoPlus.length);
    }
  }

  // Must be pure digits and within the country's expected length
  return (
    /^\d+$/.test(localDigits) &&
    localDigits.length >= country.minDigits &&
    localDigits.length <= country.maxDigits
  );
}
