/**
*THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION;LOSS OF HEALTH IN ANY FORM) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * @version 
 * @author Mehdi Fanai
 * @copyright Copyright (C) 2011 Mehdi Fanai. All rights reserved.
 * @license GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link http://www.MedAlyser.com
 */
Ext.define('MA.store.Countries', {
			extend : 'Ext.data.Store',
			// model:'NewPatientWizard',
			fields : [{
						name : 'iso'
					}, {
						name : 'name'
					}],
			data : [{
						"iso" : "AD",
						"name" : "Andorra"
					}, {
						"iso" : "AE",
						"name" : "United Arab Emirates"
					}, {
						"iso" : "AF",
						"name" : "Afghanistan"
					}, {
						"iso" : "AG",
						"name" : "Antigua and Barbuda"
					}, {
						"iso" : "AI",
						"name" : "Anguilla"
					}, {
						"iso" : "AL",
						"name" : "Albania"
					}, {
						"iso" : "AM",
						"name" : "Armenia"
					}, {
						"iso" : "AN",
						"name" : "Netherlands Antilles"
					}, {
						"iso" : "AO",
						"name" : "Angola"
					}, {
						"iso" : "AQ",
						"name" : "Antarctica"
					}, {
						"iso" : "AR",
						"name" : "Argentina"
					}, {
						"iso" : "AS",
						"name" : "American Samoa"
					}, {
						"iso" : "AT",
						"name" : "Austria"
					}, {
						"iso" : "AU",
						"name" : "Australia"
					}, {
						"iso" : "AW",
						"name" : "Aruba"
					}, {
						"iso" : "AX",
						"name" : "\u00c5land Islands"
					}, {
						"iso" : "AZ",
						"name" : "Azerbaijan"
					}, {
						"iso" : "BA",
						"name" : "Bosnia and Herzegovina"
					}, {
						"iso" : "BB",
						"name" : "Barbados"
					}, {
						"iso" : "BD",
						"name" : "Bangladesh"
					}, {
						"iso" : "BE",
						"name" : "Belgium"
					}, {
						"iso" : "BF",
						"name" : "Burkina Faso"
					}, {
						"iso" : "BG",
						"name" : "Bulgaria"
					}, {
						"iso" : "BH",
						"name" : "Bahrain"
					}, {
						"iso" : "BI",
						"name" : "Burundi"
					}, {
						"iso" : "BJ",
						"name" : "Benin"
					}, {
						"iso" : "BL",
						"name" : "Saint Barth\u00e9lemy"
					}, {
						"iso" : "BM",
						"name" : "Bermuda"
					}, {
						"iso" : "BN",
						"name" : "Brunei"
					}, {
						"iso" : "BO",
						"name" : "Bolivia"
					}, {
						"iso" : "BQ",
						"name" : "British Antarctic Territory"
					}, {
						"iso" : "BR",
						"name" : "Brazil"
					}, {
						"iso" : "BS",
						"name" : "Bahamas"
					}, {
						"iso" : "BT",
						"name" : "Bhutan"
					}, {
						"iso" : "BV",
						"name" : "Bouvet Island"
					}, {
						"iso" : "BW",
						"name" : "Botswana"
					}, {
						"iso" : "BY",
						"name" : "Belarus"
					}, {
						"iso" : "BZ",
						"name" : "Belize"
					}, {
						"iso" : "CA",
						"name" : "Canada"
					}, {
						"iso" : "CC",
						"name" : "Cocos [Keeling] Islands"
					}, {
						"iso" : "CD",
						"name" : "Congo - Kinshasa"
					}, {
						"iso" : "CF",
						"name" : "Central African Republic"
					}, {
						"iso" : "CG",
						"name" : "Congo - Brazzaville"
					}, {
						"iso" : "CH",
						"name" : "Switzerland"
					}, {
						"iso" : "CI",
						"name" : "C\u00f4te d\u2019Ivoire"
					}, {
						"iso" : "CK",
						"name" : "Cook Islands"
					}, {
						"iso" : "CL",
						"name" : "Chile"
					}, {
						"iso" : "CM",
						"name" : "Cameroon"
					}, {
						"iso" : "CN",
						"name" : "China"
					}, {
						"iso" : "CO",
						"name" : "Colombia"
					}, {
						"iso" : "CR",
						"name" : "Costa Rica"
					}, {
						"iso" : "CS",
						"name" : "Serbia and Montenegro"
					}, {
						"iso" : "CT",
						"name" : "Canton and Enderbury Islands"
					}, {
						"iso" : "CU",
						"name" : "Cuba"
					}, {
						"iso" : "CV",
						"name" : "Cape Verde"
					}, {
						"iso" : "CX",
						"name" : "Christmas Island"
					}, {
						"iso" : "CY",
						"name" : "Cyprus"
					}, {
						"iso" : "CZ",
						"name" : "Czech Republic"
					}, {
						"iso" : "DD",
						"name" : "East Germany"
					}, {
						"iso" : "DE",
						"name" : "Germany"
					}, {
						"iso" : "DJ",
						"name" : "Djibouti"
					}, {
						"iso" : "DK",
						"name" : "Denmark"
					}, {
						"iso" : "DM",
						"name" : "Dominica"
					}, {
						"iso" : "DO",
						"name" : "Dominican Republic"
					}, {
						"iso" : "DZ",
						"name" : "Algeria"
					}, {
						"iso" : "EC",
						"name" : "Ecuador"
					}, {
						"iso" : "EE",
						"name" : "Estonia"
					}, {
						"iso" : "EG",
						"name" : "Egypt"
					}, {
						"iso" : "EH",
						"name" : "Western Sahara"
					}, {
						"iso" : "ER",
						"name" : "Eritrea"
					}, {
						"iso" : "ES",
						"name" : "Spain"
					}, {
						"iso" : "ET",
						"name" : "Ethiopia"
					}, {
						"iso" : "FI",
						"name" : "Finland"
					}, {
						"iso" : "FJ",
						"name" : "Fiji"
					}, {
						"iso" : "FK",
						"name" : "Falkland Islands"
					}, {
						"iso" : "FM",
						"name" : "Micronesia"
					}, {
						"iso" : "FO",
						"name" : "Faroe Islands"
					}, {
						"iso" : "FQ",
						"name" : "French Southern and Antarctic Territories"
					}, {
						"iso" : "FR",
						"name" : "France"
					}, {
						"iso" : "FX",
						"name" : "Metropolitan France"
					}, {
						"iso" : "GA",
						"name" : "Gabon"
					}, {
						"iso" : "GB",
						"name" : "United Kingdom"
					}, {
						"iso" : "GD",
						"name" : "Grenada"
					}, {
						"iso" : "GE",
						"name" : "Georgia"
					}, {
						"iso" : "GF",
						"name" : "French Guiana"
					}, {
						"iso" : "GG",
						"name" : "Guernsey"
					}, {
						"iso" : "GH",
						"name" : "Ghana"
					}, {
						"iso" : "GI",
						"name" : "Gibraltar"
					}, {
						"iso" : "GL",
						"name" : "Greenland"
					}, {
						"iso" : "GM",
						"name" : "Gambia"
					}, {
						"iso" : "GN",
						"name" : "Guinea"
					}, {
						"iso" : "GP",
						"name" : "Guadeloupe"
					}, {
						"iso" : "GQ",
						"name" : "Equatorial Guinea"
					}, {
						"iso" : "GR",
						"name" : "Greece"
					}, {
						"iso" : "GS",
						"name" : "South Georgia and the South Sandwich Islands"
					}, {
						"iso" : "GT",
						"name" : "Guatemala"
					}, {
						"iso" : "GU",
						"name" : "Guam"
					}, {
						"iso" : "GW",
						"name" : "Guinea-Bissau"
					}, {
						"iso" : "GY",
						"name" : "Guyana"
					}, {
						"iso" : "HK",
						"name" : "Hong Kong SAR China"
					}, {
						"iso" : "HM",
						"name" : "Heard Island and McDonald Islands"
					}, {
						"iso" : "HN",
						"name" : "Honduras"
					}, {
						"iso" : "HR",
						"name" : "Croatia"
					}, {
						"iso" : "HT",
						"name" : "Haiti"
					}, {
						"iso" : "HU",
						"name" : "Hungary"
					}, {
						"iso" : "ID",
						"name" : "Indonesia"
					}, {
						"iso" : "IE",
						"name" : "Ireland"
					}, {
						"iso" : "IL",
						"name" : "Israel"
					}, {
						"iso" : "IM",
						"name" : "Isle of Man"
					}, {
						"iso" : "IN",
						"name" : "India"
					}, {
						"iso" : "IO",
						"name" : "British Indian Ocean Territory"
					}, {
						"iso" : "IQ",
						"name" : "Iraq"
					}, {
						"iso" : "IR",
						"name" : "Iran"
					}, {
						"iso" : "IS",
						"name" : "Iceland"
					}, {
						"iso" : "IT",
						"name" : "Italy"
					}, {
						"iso" : "JE",
						"name" : "Jersey"
					}, {
						"iso" : "JM",
						"name" : "Jamaica"
					}, {
						"iso" : "JO",
						"name" : "Jordan"
					}, {
						"iso" : "JP",
						"name" : "Japan"
					}, {
						"iso" : "JT",
						"name" : "Johnston Island"
					}, {
						"iso" : "KE",
						"name" : "Kenya"
					}, {
						"iso" : "KG",
						"name" : "Kyrgyzstan"
					}, {
						"iso" : "KH",
						"name" : "Cambodia"
					}, {
						"iso" : "KI",
						"name" : "Kiribati"
					}, {
						"iso" : "KM",
						"name" : "Comoros"
					}, {
						"iso" : "KN",
						"name" : "Saint Kitts and Nevis"
					}, {
						"iso" : "KP",
						"name" : "North Korea"
					}, {
						"iso" : "KR",
						"name" : "South Korea"
					}, {
						"iso" : "KW",
						"name" : "Kuwait"
					}, {
						"iso" : "KY",
						"name" : "Cayman Islands"
					}, {
						"iso" : "KZ",
						"name" : "Kazakhstan"
					}, {
						"iso" : "LA",
						"name" : "Laos"
					}, {
						"iso" : "LB",
						"name" : "Lebanon"
					}, {
						"iso" : "LC",
						"name" : "Saint Lucia"
					}, {
						"iso" : "LI",
						"name" : "Liechtenstein"
					}, {
						"iso" : "LK",
						"name" : "Sri Lanka"
					}, {
						"iso" : "LR",
						"name" : "Liberia"
					}, {
						"iso" : "LS",
						"name" : "Lesotho"
					}, {
						"iso" : "LT",
						"name" : "Lithuania"
					}, {
						"iso" : "LU",
						"name" : "Luxembourg"
					}, {
						"iso" : "LV",
						"name" : "Latvia"
					}, {
						"iso" : "LY",
						"name" : "Libya"
					}, {
						"iso" : "MA",
						"name" : "Morocco"
					}, {
						"iso" : "MA",
						"name" : "Monaco"
					}, {
						"iso" : "MD",
						"name" : "Moldova"
					}, {
						"iso" : "ME",
						"name" : "Montenegro"
					}, {
						"iso" : "MF",
						"name" : "Saint Martin"
					}, {
						"iso" : "MG",
						"name" : "Madagascar"
					}, {
						"iso" : "MH",
						"name" : "Marshall Islands"
					}, {
						"iso" : "MI",
						"name" : "Midway Islands"
					}, {
						"iso" : "MK",
						"name" : "Macedonia"
					}, {
						"iso" : "ML",
						"name" : "Mali"
					}, {
						"iso" : "MM",
						"name" : "Myanmar [Burma]"
					}, {
						"iso" : "MN",
						"name" : "Mongolia"
					}, {
						"iso" : "MO",
						"name" : "Macau SAR China"
					}, {
						"iso" : "MP",
						"name" : "Northern Mariana Islands"
					}, {
						"iso" : "MQ",
						"name" : "Martinique"
					}, {
						"iso" : "MR",
						"name" : "Mauritania"
					}, {
						"iso" : "MS",
						"name" : "Montserrat"
					}, {
						"iso" : "MT",
						"name" : "Malta"
					}, {
						"iso" : "MU",
						"name" : "Mauritius"
					}, {
						"iso" : "MV",
						"name" : "Maldives"
					}, {
						"iso" : "MW",
						"name" : "Malawi"
					}, {
						"iso" : "MX",
						"name" : "Mexico"
					}, {
						"iso" : "MY",
						"name" : "Malaysia"
					}, {
						"iso" : "MZ",
						"name" : "Mozambique"
					}, {
						"iso" : "NA",
						"name" : "Namibia"
					}, {
						"iso" : "NC",
						"name" : "New Caledonia"
					}, {
						"iso" : "NE",
						"name" : "Niger"
					}, {
						"iso" : "NF",
						"name" : "Norfolk Island"
					}, {
						"iso" : "NG",
						"name" : "Nigeria"
					}, {
						"iso" : "NI",
						"name" : "Nicaragua"
					}, {
						"iso" : "NL",
						"name" : "Netherlands"
					}, {
						"iso" : "NO",
						"name" : "Norway"
					}, {
						"iso" : "NP",
						"name" : "Nepal"
					}, {
						"iso" : "NQ",
						"name" : "Dronning Maud Land"
					}, {
						"iso" : "NR",
						"name" : "Nauru"
					}, {
						"iso" : "NT",
						"name" : "Neutral Zone"
					}, {
						"iso" : "NU",
						"name" : "Niue"
					}, {
						"iso" : "NZ",
						"name" : "New Zealand"
					}, {
						"iso" : "OM",
						"name" : "Oman"
					}, {
						"iso" : "PA",
						"name" : "Panama"
					}, {
						"iso" : "PC",
						"name" : "Pacific Islands Trust Territory"
					}, {
						"iso" : "PE",
						"name" : "Peru"
					}, {
						"iso" : "PF",
						"name" : "French Polynesia"
					}, {
						"iso" : "PG",
						"name" : "Papua New Guinea"
					}, {
						"iso" : "PH",
						"name" : "Philippines"
					}, {
						"iso" : "PK",
						"name" : "Pakistan"
					}, {
						"iso" : "PL",
						"name" : "Poland"
					}, {
						"iso" : "PM",
						"name" : "Saint Pierre and Miquelon"
					}, {
						"iso" : "PN",
						"name" : "Pitcairn Islands"
					}, {
						"iso" : "PR",
						"name" : "Puerto Rico"
					}, {
						"iso" : "PS",
						"name" : "Palestinian Territories"
					}, {
						"iso" : "PT",
						"name" : "Portugal"
					}, {
						"iso" : "PU",
						"name" : "U.S. Miscellaneous Pacific Islands"
					}, {
						"iso" : "PW",
						"name" : "Palau"
					}, {
						"iso" : "PY",
						"name" : "Paraguay"
					}, {
						"iso" : "PZ",
						"name" : "Panama Canal Zone"
					}, {
						"iso" : "QA",
						"name" : "Qatar"
					}, {
						"iso" : "RE",
						"name" : "R\u00e9union"
					}, {
						"iso" : "RO",
						"name" : "Romania"
					}, {
						"iso" : "RS",
						"name" : "Serbia"
					}, {
						"iso" : "RU",
						"name" : "Russia"
					}, {
						"iso" : "RW",
						"name" : "Rwanda"
					}, {
						"iso" : "SA",
						"name" : "Saudi Arabia"
					}, {
						"iso" : "SB",
						"name" : "Solomon Islands"
					}, {
						"iso" : "SC",
						"name" : "Seychelles"
					}, {
						"iso" : "SD",
						"name" : "Sudan"
					}, {
						"iso" : "SE",
						"name" : "Sweden"
					}, {
						"iso" : "SG",
						"name" : "Singapore"
					}, {
						"iso" : "SH",
						"name" : "Saint Helena"
					}, {
						"iso" : "SI",
						"name" : "Slovenia"
					}, {
						"iso" : "SJ",
						"name" : "Svalbard and Jan Mayen"
					}, {
						"iso" : "SK",
						"name" : "Slovakia"
					}, {
						"iso" : "SL",
						"name" : "Sierra Leone"
					}, {
						"iso" : "SM",
						"name" : "San Marino"
					}, {
						"iso" : "SN",
						"name" : "Senegal"
					}, {
						"iso" : "SO",
						"name" : "Somalia"
					}, {
						"iso" : "SR",
						"name" : "Suriname"
					}, {
						"iso" : "ST",
						"name" : "S\u00e3o Tom\u00e9 and Pr\u00edncipe"
					}, {
						"iso" : "SU",
						"name" : "Union of Soviet Socialist Republics"
					}, {
						"iso" : "SV",
						"name" : "El Salvador"
					}, {
						"iso" : "SY",
						"name" : "Syria"
					}, {
						"iso" : "SZ",
						"name" : "Swaziland"
					}, {
						"iso" : "TC",
						"name" : "Turks and Caicos Islands"
					}, {
						"iso" : "TD",
						"name" : "Chad"
					}, {
						"iso" : "TF",
						"name" : "French Southern Territories"
					}, {
						"iso" : "TG",
						"name" : "Togo"
					}, {
						"iso" : "TH",
						"name" : "Thailand"
					}, {
						"iso" : "TJ",
						"name" : "Tajikistan"
					}, {
						"iso" : "TK",
						"name" : "Tokelau"
					}, {
						"iso" : "TL",
						"name" : "Timor-Leste"
					}, {
						"iso" : "TM",
						"name" : "Turkmenistan"
					}, {
						"iso" : "TN",
						"name" : "Tunisia"
					}, {
						"iso" : "TO",
						"name" : "Tonga"
					}, {
						"iso" : "TR",
						"name" : "Turkey"
					}, {
						"iso" : "TT",
						"name" : "Trinidad and Tobago"
					}, {
						"iso" : "TV",
						"name" : "Tuvalu"
					}, {
						"iso" : "TW",
						"name" : "Taiwan"
					}, {
						"iso" : "TZ",
						"name" : "Tanzania"
					}, {
						"iso" : "UA",
						"name" : "Ukraine"
					}, {
						"iso" : "UG",
						"name" : "Uganda"
					}, {
						"iso" : "UM",
						"name" : "U.S. Minor Outlying Islands"
					}, {
						"iso" : "US",
						"name" : "United States"
					}, {
						"iso" : "UY",
						"name" : "Uruguay"
					}, {
						"iso" : "UZ",
						"name" : "Uzbekistan"
					}, {
						"iso" : "VA",
						"name" : "Vatican City"
					}, {
						"iso" : "VC",
						"name" : "Saint Vincent and the Grenadines"
					}, {
						"iso" : "VD",
						"name" : "North Vietnam"
					}, {
						"iso" : "VE",
						"name" : "Venezuela"
					}, {
						"iso" : "VG",
						"name" : "British Virgin Islands"
					}, {
						"iso" : "VI",
						"name" : "U.S. Virgin Islands"
					}, {
						"iso" : "VN",
						"name" : "Vietnam"
					}, {
						"iso" : "VU",
						"name" : "Vanuatu"
					}, {
						"iso" : "WF",
						"name" : "Wallis and Futuna"
					}, {
						"iso" : "WK",
						"name" : "Wake Island"
					}, {
						"iso" : "WS",
						"name" : "Samoa"
					}, {
						"iso" : "YD",
						"name" : "People's Democratic Republic of Yemen"
					}, {
						"iso" : "YE",
						"name" : "Yemen"
					}, {
						"iso" : "YT",
						"name" : "Mayotte"
					}, {
						"iso" : "ZA",
						"name" : "South Africa"
					}, {
						"iso" : "ZM",
						"name" : "Zambia"
					}, {
						"iso" : "ZW",
						"name" : "Zimbabwe"
					}, {
						"iso" : "ZZ",
						"name" : "Unknown or Invalid Region"
					}]
		});