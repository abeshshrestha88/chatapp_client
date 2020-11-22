const countries = [
  {
    iso: "AF",
    name: "AFGHANISTAN",
    phonecode: 93,
  },
  {
    iso: "AL",
    name: "ALBANIA",
    phonecode: 355,
  },
  {
    iso: "DZ",
    name: "ALGERIA",
    phonecode: 213,
  },
  {
    iso: "AS",
    name: "AMERICAN SAMOA",
    phonecode: 1684,
  },
  {
    iso: "AD",
    name: "ANDORRA",
    phonecode: 376,
  },
  {
    iso: "AO",
    name: "ANGOLA",
    phonecode: 244,
  },
  {
    iso: "AI",
    name: "ANGUILLA",
    phonecode: 1264,
  },
  {
    iso: "AQ",
    name: "ANTARCTICA",
    phonecode: 0,
  },
  {
    iso: "AG",
    name: "ANTIGUA AND BARBUDA",
    phonecode: 1268,
  },
  {
    iso: "AR",
    name: "ARGENTINA",
    phonecode: 54,
  },
  {
    iso: "AM",
    name: "ARMENIA",
    phonecode: 374,
  },
  {
    iso: "AW",
    name: "ARUBA",
    phonecode: 297,
  },
  {
    iso: "AU",
    name: "AUSTRALIA",
    phonecode: 61,
  },
  {
    iso: "AT",
    name: "AUSTRIA",
    phonecode: 43,
  },
  {
    iso: "AZ",
    name: "AZERBAIJAN",
    phonecode: 994,
  },
  {
    iso: "BS",
    name: "BAHAMAS",
    phonecode: 1242,
  },
  {
    iso: "BH",
    name: "BAHRAIN",
    phonecode: 973,
  },
  {
    iso: "BD",
    name: "BANGLADESH",
    phonecode: 880,
  },
  {
    iso: "BB",
    name: "BARBADOS",
    phonecode: 1246,
  },
  {
    iso: "BY",
    name: "BELARUS",
    phonecode: 375,
  },
  {
    iso: "BE",
    name: "BELGIUM",
    phonecode: 32,
  },
  {
    iso: "BZ",
    name: "BELIZE",
    phonecode: 501,
  },
  {
    iso: "BJ",
    name: "BENIN",
    phonecode: 229,
  },
  {
    iso: "BM",
    name: "BERMUDA",
    phonecode: 1441,
  },
  {
    iso: "BT",
    name: "BHUTAN",
    phonecode: 975,
  },
  {
    iso: "BO",
    name: "BOLIVIA",
    phonecode: 591,
  },
  {
    iso: "BA",
    name: "BOSNIA AND HERZEGOVINA",
    phonecode: 387,
  },
  {
    iso: "BW",
    name: "BOTSWANA",
    phonecode: 267,
  },
  {
    iso: "BV",
    name: "BOUVET ISLAND",
    phonecode: 0,
  },
  {
    iso: "BR",
    name: "BRAZIL",
    phonecode: 55,
  },
  {
    iso: "IO",
    name: "BRITISH INDIAN OCEAN TERRITORY",
    phonecode: 246,
  },
  {
    iso: "BN",
    name: "BRUNEI DARUSSALAM",
    phonecode: 673,
  },
  {
    iso: "BG",
    name: "BULGARIA",
    phonecode: 359,
  },
  {
    iso: "BF",
    name: "BURKINA FASO",
    phonecode: 226,
  },
  {
    iso: "BI",
    name: "BURUNDI",
    phonecode: 257,
  },
  {
    iso: "KH",
    name: "CAMBODIA",
    phonecode: 855,
  },
  {
    iso: "CM",
    name: "CAMEROON",
    phonecode: 237,
  },
  {
    iso: "CA",
    name: "CANADA",
    phonecode: 1,
  },
  {
    iso: "CV",
    name: "CAPE VERDE",
    phonecode: 238,
  },
  {
    iso: "KY",
    name: "CAYMAN ISLANDS",
    phonecode: 1345,
  },
  {
    iso: "CF",
    name: "CENTRAL AFRICAN REPUBLIC",
    phonecode: 236,
  },
  {
    iso: "TD",
    name: "CHAD",
    phonecode: 235,
  },
  {
    iso: "CL",
    name: "CHILE",
    phonecode: 56,
  },
  {
    iso: "CN",
    name: "CHINA",
    phonecode: 86,
  },
  {
    iso: "CX",
    name: "CHRISTMAS ISLAND",
    phonecode: 61,
  },
  {
    iso: "CC",
    name: "COCOS (KEELING) ISLANDS",
    phonecode: 672,
  },
  {
    iso: "CO",
    name: "COLOMBIA",
    phonecode: 57,
  },
  {
    iso: "KM",
    name: "COMOROS",
    phonecode: 269,
  },
  {
    iso: "CG",
    name: "CONGO",
    phonecode: 242,
  },
  {
    iso: "CD",
    name: "CONGO, THE DEMOCRATIC REPUBLIC OF THE",
    phonecode: 242,
  },
  {
    iso: "CK",
    name: "COOK ISLANDS",
    phonecode: 682,
  },
  {
    iso: "CR",
    name: "COSTA RICA",
    phonecode: 506,
  },
  {
    iso: "CI",
    name: "COTE D'IVOIRE",
    phonecode: 225,
  },
  {
    iso: "HR",
    name: "CROATIA",
    phonecode: 385,
  },
  {
    iso: "CU",
    name: "CUBA",
    phonecode: 53,
  },
  {
    iso: "CY",
    name: "CYPRUS",
    phonecode: 357,
  },
  {
    iso: "CZ",
    name: "CZECHIA",
    phonecode: 420,
  },
  {
    iso: "DK",
    name: "DENMARK",
    phonecode: 45,
  },
  {
    iso: "DJ",
    name: "DJIBOUTI",
    phonecode: 253,
  },
  {
    iso: "DM",
    name: "DOMINICA",
    phonecode: 1767,
  },
  {
    iso: "DO",
    name: "DOMINICAN REPUBLIC",
    phonecode: 1,
  },
  {
    iso: "EC",
    name: "ECUADOR",
    phonecode: 593,
  },
  {
    iso: "EG",
    name: "EGYPT",
    phonecode: 20,
  },
  {
    iso: "SV",
    name: "EL SALVADOR",
    phonecode: 503,
  },
  {
    iso: "GQ",
    name: "EQUATORIAL GUINEA",
    phonecode: 240,
  },
  {
    iso: "ER",
    name: "ERITREA",
    phonecode: 291,
  },
  {
    iso: "EE",
    name: "ESTONIA",
    phonecode: 372,
  },
  {
    iso: "ET",
    name: "ETHIOPIA",
    phonecode: 251,
  },
  {
    iso: "FK",
    name: "FALKLAND ISLANDS (MALVINAS)",
    phonecode: 500,
  },
  {
    iso: "FO",
    name: "FAROE ISLANDS",
    phonecode: 298,
  },
  {
    iso: "FJ",
    name: "FIJI",
    phonecode: 679,
  },
  {
    iso: "FI",
    name: "FINLAND",
    phonecode: 358,
  },
  {
    iso: "FR",
    name: "FRANCE",
    phonecode: 33,
  },
  {
    iso: "GF",
    name: "FRENCH GUIANA",
    phonecode: 594,
  },
  {
    iso: "PF",
    name: "FRENCH POLYNESIA",
    phonecode: 689,
  },
  {
    iso: "TF",
    name: "FRENCH SOUTHERN TERRITORIES",
    phonecode: 0,
  },
  {
    iso: "GA",
    name: "GABON",
    phonecode: 241,
  },
  {
    iso: "GM",
    name: "GAMBIA",
    phonecode: 220,
  },
  {
    iso: "GE",
    name: "GEORGIA",
    phonecode: 995,
  },
  {
    iso: "DE",
    name: "GERMANY",
    phonecode: 49,
  },
  {
    iso: "GH",
    name: "GHANA",
    phonecode: 233,
  },
  {
    iso: "GI",
    name: "GIBRALTAR",
    phonecode: 350,
  },
  {
    iso: "GR",
    name: "GREECE",
    phonecode: 30,
  },
  {
    iso: "GL",
    name: "GREENLAND",
    phonecode: 299,
  },
  {
    iso: "GD",
    name: "GRENADA",
    phonecode: 1473,
  },
  {
    iso: "GP",
    name: "GUADELOUPE",
    phonecode: 590,
  },
  {
    iso: "GU",
    name: "GUAM",
    phonecode: 1671,
  },
  {
    iso: "GT",
    name: "GUATEMALA",
    phonecode: 502,
  },
  {
    iso: "GN",
    name: "GUINEA",
    phonecode: 224,
  },
  {
    iso: "GW",
    name: "GUINEA-BISSAU",
    phonecode: 245,
  },
  {
    iso: "GY",
    name: "GUYANA",
    phonecode: 592,
  },
  {
    iso: "HT",
    name: "HAITI",
    phonecode: 509,
  },
  {
    iso: "HM",
    name: "HEARD ISLAND AND MCDONALD ISLANDS",
    phonecode: 0,
  },
  {
    iso: "VA",
    name: "HOLY SEE (VATICAN CITY STATE)",
    phonecode: 39,
  },
  {
    iso: "HN",
    name: "HONDURAS",
    phonecode: 504,
  },
  {
    iso: "HK",
    name: "HONG KONG",
    phonecode: 852,
  },
  {
    iso: "HU",
    name: "HUNGARY",
    phonecode: 36,
  },
  {
    iso: "IS",
    name: "ICELAND",
    phonecode: 354,
  },
  {
    iso: "IN",
    name: "INDIA",
    phonecode: 91,
  },
  {
    iso: "ID",
    name: "INDONESIA",
    phonecode: 62,
  },
  {
    iso: "IR",
    name: "IRAN, ISLAMIC REPUBLIC OF",
    phonecode: 98,
  },
  {
    iso: "IQ",
    name: "IRAQ",
    phonecode: 964,
  },
  {
    iso: "IE",
    name: "IRELAND",
    phonecode: 353,
  },
  {
    iso: "IL",
    name: "ISRAEL",
    phonecode: 972,
  },
  {
    iso: "IT",
    name: "ITALY",
    phonecode: 39,
  },
  {
    iso: "JM",
    name: "JAMAICA",
    phonecode: 1876,
  },
  {
    iso: "JP",
    name: "JAPAN",
    phonecode: 81,
  },
  {
    iso: "JO",
    name: "JORDAN",
    phonecode: 962,
  },
  {
    iso: "KZ",
    name: "KAZAKHSTAN",
    phonecode: 7,
  },
  {
    iso: "KE",
    name: "KENYA",
    phonecode: 254,
  },
  {
    iso: "KI",
    name: "KIRIBATI",
    phonecode: 686,
  },
  {
    iso: "KP",
    name: "KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF",
    phonecode: 850,
  },
  {
    iso: "KR",
    name: "KOREA, REPUBLIC OF",
    phonecode: 82,
  },
  {
    iso: "KW",
    name: "KUWAIT",
    phonecode: 965,
  },
  {
    iso: "KG",
    name: "KYRGYZSTAN",
    phonecode: 996,
  },
  {
    iso: "LA",
    name: "LAO PEOPLE'S DEMOCRATIC REPUBLIC",
    phonecode: 856,
  },
  {
    iso: "LV",
    name: "LATVIA",
    phonecode: 371,
  },
  {
    iso: "LB",
    name: "LEBANON",
    phonecode: 961,
  },
  {
    iso: "LS",
    name: "LESOTHO",
    phonecode: 266,
  },
  {
    iso: "LR",
    name: "LIBERIA",
    phonecode: 231,
  },
  {
    iso: "LY",
    name: "LIBYAN ARAB JAMAHIRIYA",
    phonecode: 218,
  },
  {
    iso: "LI",
    name: "LIECHTENSTEIN",
    phonecode: 423,
  },
  {
    iso: "LT",
    name: "LITHUANIA",
    phonecode: 370,
  },
  {
    iso: "LU",
    name: "LUXEMBOURG",
    phonecode: 352,
  },
  {
    iso: "MO",
    name: "MACAO",
    phonecode: 853,
  },
  {
    iso: "MK",
    name: "NORTH MACEDONIA",
    phonecode: 389,
  },
  {
    iso: "MG",
    name: "MADAGASCAR",
    phonecode: 261,
  },
  {
    iso: "MW",
    name: "MALAWI",
    phonecode: 265,
  },
  {
    iso: "MY",
    name: "MALAYSIA",
    phonecode: 60,
  },
  {
    iso: "MV",
    name: "MALDIVES",
    phonecode: 960,
  },
  {
    iso: "ML",
    name: "MALI",
    phonecode: 223,
  },
  {
    iso: "MT",
    name: "MALTA",
    phonecode: 356,
  },
  {
    iso: "MH",
    name: "MARSHALL ISLANDS",
    phonecode: 692,
  },
  {
    iso: "MQ",
    name: "MARTINIQUE",
    phonecode: 596,
  },
  {
    iso: "MR",
    name: "MAURITANIA",
    phonecode: 222,
  },
  {
    iso: "MU",
    name: "MAURITIUS",
    phonecode: 230,
  },
  {
    iso: "YT",
    name: "MAYOTTE",
    phonecode: 269,
  },
  {
    iso: "MX",
    name: "MEXICO",
    phonecode: 52,
  },
  {
    iso: "FM",
    name: "MICRONESIA, FEDERATED STATES OF",
    phonecode: 691,
  },
  {
    iso: "MD",
    name: "MOLDOVA, REPUBLIC OF",
    phonecode: 373,
  },
  {
    iso: "MC",
    name: "MONACO",
    phonecode: 377,
  },
  {
    iso: "MN",
    name: "MONGOLIA",
    phonecode: 976,
  },
  {
    iso: "MS",
    name: "MONTSERRAT",
    phonecode: 1664,
  },
  {
    iso: "MA",
    name: "MOROCCO",
    phonecode: 212,
  },
  {
    iso: "MZ",
    name: "MOZAMBIQUE",
    phonecode: 258,
  },
  {
    iso: "MM",
    name: "MYANMAR",
    phonecode: 95,
  },
  {
    iso: "NA",
    name: "NAMIBIA",
    phonecode: 264,
  },
  {
    iso: "NR",
    name: "NAURU",
    phonecode: 674,
  },
  {
    iso: "NP",
    name: "NEPAL",
    phonecode: 977,
  },
  {
    iso: "NL",
    name: "NETHERLANDS",
    phonecode: 31,
  },
  {
    iso: "AN",
    name: "NETHERLANDS ANTILLES",
    phonecode: 599,
  },
  {
    iso: "NC",
    name: "NEW CALEDONIA",
    phonecode: 687,
  },
  {
    iso: "NZ",
    name: "NEW ZEALAND",
    phonecode: 64,
  },
  {
    iso: "NI",
    name: "NICARAGUA",
    phonecode: 505,
  },
  {
    iso: "NE",
    name: "NIGER",
    phonecode: 227,
  },
  {
    iso: "NG",
    name: "NIGERIA",
    phonecode: 234,
  },
  {
    iso: "NU",
    name: "NIUE",
    phonecode: 683,
  },
  {
    iso: "NF",
    name: "NORFOLK ISLAND",
    phonecode: 672,
  },
  {
    iso: "MP",
    name: "NORTHERN MARIANA ISLANDS",
    phonecode: 1670,
  },
  {
    iso: "NO",
    name: "NORWAY",
    phonecode: 47,
  },
  {
    iso: "OM",
    name: "OMAN",
    phonecode: 968,
  },
  {
    iso: "PK",
    name: "PAKISTAN",
    phonecode: 92,
  },
  {
    iso: "PW",
    name: "PALAU",
    phonecode: 680,
  },
  {
    iso: "PS",
    name: "PALESTINIAN TERRITORY, OCCUPIED",
    phonecode: 970,
  },
  {
    iso: "PA",
    name: "PANAMA",
    phonecode: 507,
  },
  {
    iso: "PG",
    name: "PAPUA NEW GUINEA",
    phonecode: 675,
  },
  {
    iso: "PY",
    name: "PARAGUAY",
    phonecode: 595,
  },
  {
    iso: "PE",
    name: "PERU",
    phonecode: 51,
  },
  {
    iso: "PH",
    name: "PHILIPPINES",
    phonecode: 63,
  },
  {
    iso: "PN",
    name: "PITCAIRN",
    phonecode: 0,
  },
  {
    iso: "PL",
    name: "POLAND",
    phonecode: 48,
  },
  {
    iso: "PT",
    name: "PORTUGAL",
    phonecode: 351,
  },
  {
    iso: "PR",
    name: "PUERTO RICO",
    phonecode: 1787,
  },
  {
    iso: "QA",
    name: "QATAR",
    phonecode: 974,
  },
  {
    iso: "RE",
    name: "REUNION",
    phonecode: 262,
  },
  {
    iso: "RO",
    name: "ROMANIA",
    phonecode: 40,
  },
  {
    iso: "RU",
    name: "RUSSIAN FEDERATION",
    phonecode: 7,
  },
  {
    iso: "RW",
    name: "RWANDA",
    phonecode: 250,
  },
  {
    iso: "SH",
    name: "SAINT HELENA",
    phonecode: 290,
  },
  {
    iso: "KN",
    name: "SAINT KITTS AND NEVIS",
    phonecode: 1869,
  },
  {
    iso: "LC",
    name: "SAINT LUCIA",
    phonecode: 1758,
  },
  {
    iso: "PM",
    name: "SAINT PIERRE AND MIQUELON",
    phonecode: 508,
  },
  {
    iso: "VC",
    name: "SAINT VINCENT AND THE GRENADINES",
    phonecode: 1784,
  },
  {
    iso: "WS",
    name: "SAMOA",
    phonecode: 684,
  },
  {
    iso: "SM",
    name: "SAN MARINO",
    phonecode: 378,
  },
  {
    iso: "ST",
    name: "SAO TOME AND PRINCIPE",
    phonecode: 239,
  },
  {
    iso: "SA",
    name: "SAUDI ARABIA",
    phonecode: 966,
  },
  {
    iso: "SN",
    name: "SENEGAL",
    phonecode: 221,
  },
  {
    iso: "RS",
    name: "SERBIA",
    phonecode: 381,
  },
  {
    iso: "SC",
    name: "SEYCHELLES",
    phonecode: 248,
  },
  {
    iso: "SL",
    name: "SIERRA LEONE",
    phonecode: 232,
  },
  {
    iso: "SG",
    name: "SINGAPORE",
    phonecode: 65,
  },
  {
    iso: "SK",
    name: "SLOVAKIA",
    phonecode: 421,
  },
  {
    iso: "SI",
    name: "SLOVENIA",
    phonecode: 386,
  },
  {
    iso: "SB",
    name: "SOLOMON ISLANDS",
    phonecode: 677,
  },
  {
    iso: "SO",
    name: "SOMALIA",
    phonecode: 252,
  },
  {
    iso: "ZA",
    name: "SOUTH AFRICA",
    phonecode: 27,
  },
  {
    iso: "GS",
    name: "SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS",
    phonecode: 0,
  },
  {
    iso: "ES",
    name: "SPAIN",
    phonecode: 34,
  },
  {
    iso: "LK",
    name: "SRI LANKA",
    phonecode: 94,
  },
  {
    iso: "SD",
    name: "SUDAN",
    phonecode: 249,
  },
  {
    iso: "SR",
    name: "SURINAME",
    phonecode: 597,
  },
  {
    iso: "SJ",
    name: "SVALBARD AND JAN MAYEN",
    phonecode: 47,
  },
  {
    iso: "SZ",
    name: "SWAZILAND",
    phonecode: 268,
  },
  {
    iso: "SE",
    name: "SWEDEN",
    phonecode: 46,
  },
  {
    iso: "CH",
    name: "SWITZERLAND",
    phonecode: 41,
  },
  {
    iso: "SY",
    name: "SYRIAN ARAB REPUBLIC",
    phonecode: 963,
  },
  {
    iso: "TW",
    name: "TAIWAN, PROVINCE OF CHINA",
    phonecode: 886,
  },
  {
    iso: "TJ",
    name: "TAJIKISTAN",
    phonecode: 992,
  },
  {
    iso: "TZ",
    name: "TANZANIA, UNITED REPUBLIC OF",
    phonecode: 255,
  },
  {
    iso: "TH",
    name: "THAILAND",
    phonecode: 66,
  },
  {
    iso: "TL",
    name: "TIMOR-LESTE",
    phonecode: 670,
  },
  {
    iso: "TG",
    name: "TOGO",
    phonecode: 228,
  },
  {
    iso: "TK",
    name: "TOKELAU",
    phonecode: 690,
  },
  {
    iso: "TO",
    name: "TONGA",
    phonecode: 676,
  },
  {
    iso: "TT",
    name: "TRINIDAD AND TOBAGO",
    phonecode: 1868,
  },
  {
    iso: "TN",
    name: "TUNISIA",
    phonecode: 216,
  },
  {
    iso: "TR",
    name: "TURKEY",
    phonecode: 90,
  },
  {
    iso: "TM",
    name: "TURKMENISTAN",
    phonecode: 993,
  },
  {
    iso: "TC",
    name: "TURKS AND CAICOS ISLANDS",
    phonecode: 1649,
  },
  {
    iso: "TV",
    name: "TUVALU",
    phonecode: 688,
  },
  {
    iso: "UG",
    name: "UGANDA",
    phonecode: 256,
  },
  {
    iso: "UA",
    name: "UKRAINE",
    phonecode: 380,
  },
  {
    iso: "AE",
    name: "UNITED ARAB EMIRATES",
    phonecode: 971,
  },
  {
    iso: "GB",
    name: "UNITED KINGDOM",
    phonecode: 44,
  },
  {
    iso: "US",
    name: "UNITED STATES",
    phonecode: 1,
  },
  {
    iso: "UM",
    name: "UNITED STATES MINOR OUTLYING ISLANDS",
    phonecode: 1,
  },
  {
    iso: "UY",
    name: "URUGUAY",
    phonecode: 598,
  },
  {
    iso: "UZ",
    name: "UZBEKISTAN",
    phonecode: 998,
  },
  {
    iso: "VU",
    name: "VANUATU",
    phonecode: 678,
  },
  {
    iso: "VE",
    name: "VENEZUELA",
    phonecode: 58,
  },
  {
    iso: "VN",
    name: "VIET NAM",
    phonecode: 84,
  },
  {
    iso: "VG",
    name: "VIRGIN ISLANDS, BRITISH",
    phonecode: 1284,
  },
  {
    iso: "VI",
    name: "VIRGIN ISLANDS, U.S.",
    phonecode: 1340,
  },
  {
    iso: "WF",
    name: "WALLIS AND FUTUNA",
    phonecode: 681,
  },
  {
    iso: "EH",
    name: "WESTERN SAHARA",
    phonecode: 212,
  },
  {
    iso: "YE",
    name: "YEMEN",
    phonecode: 967,
  },
  {
    iso: "ZM",
    name: "ZAMBIA",
    phonecode: 260,
  },
  {
    iso: "ZW",
    name: "ZIMBABWE",
    phonecode: 263,
  },
  {
    iso: "ME",
    name: "MONTENEGRO",
    phonecode: 382,
  },
  {
    iso: "XK",
    name: "KOSOVO",
    phonecode: 383,
  },
  {
    iso: "AX",
    name: "ALAND ISLANDS",
    phonecode: 358,
  },
  {
    iso: "BQ",
    name: "BONAIRE, SINT EUSTATIUS AND SABA",
    phonecode: 599,
  },
  {
    iso: "CW",
    name: "CURACAO",
    phonecode: 599,
  },
  {
    iso: "GG",
    name: "GUERNSEY",
    phonecode: 44,
  },
  {
    iso: "IM",
    name: "ISLE OF MAN",
    phonecode: 44,
  },
  {
    iso: "JE",
    name: "JERSEY",
    phonecode: 44,
  },
  {
    iso: "BL",
    name: "SAINT BARTHELEMY",
    phonecode: 590,
  },
  {
    iso: "MF",
    name: "SAINT MARTIN",
    phonecode: 590,
  },
  {
    iso: "SX",
    name: "SINT MAARTEN",
    phonecode: 1,
  },
  {
    iso: "SS",
    name: "SOUTH SUDAN",
    phonecode: 211,
  },
];

export default countries;
