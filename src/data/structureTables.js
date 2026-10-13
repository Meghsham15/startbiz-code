/** Factual starting comparisons. Not a copy of any other site, and not a legal opinion. */

export const structureColumns = [
  { label: 'Private Limited', slug: 'private-limited-company-registration' },
  { label: 'OPC', slug: 'one-person-company-registration' },
  { label: 'LLP', slug: 'limited-liability-partnership-registration' },
  { label: 'Partnership', slug: 'partnership-firm-registration' },
  { label: 'Proprietorship', slug: 'sole-proprietorship-firm-registration' },
];

export const structureTableGroups = [
  {
    title: 'Setting it up',
    rows: [
      {
        label: 'Usual law',
        cells: [
          'Companies Act, 2013',
          'Companies Act, 2013',
          'LLP Act, 2008',
          'Partnership Act, 1932',
          'No single incorporation Act',
        ],
      },
      {
        label: 'Registration',
        cells: [
          'Required with the MCA',
          'Required with the MCA',
          'Required with the MCA',
          'Optional, but useful',
          'No company-style incorporation',
        ],
      },
      {
        label: 'Owners',
        cells: [
          '2 to 200 shareholders',
          '1 shareholder, plus a nominee',
          'At least 2 partners',
          '2 to 50 partners',
          '1 proprietor',
        ],
      },
      {
        label: 'Foreign ownership',
        cells: [
          'Often allowed, subject to FDI rules',
          'The usual OPC member must be an Indian resident',
          'Often allowed, subject to FDI rules',
          'An NRI can be a partner in many cases',
          'A foreign national cannot own it in the usual way',
        ],
      },
    ],
  },
  {
    title: 'Liability and ownership',
    rows: [
      {
        label: 'Separate legal entity',
        cells: ['Yes', 'Yes', 'Yes', 'No', 'No'],
      },
      {
        label: 'Liability',
        cells: [
          'Limited to unpaid share capital',
          'Limited to unpaid share capital',
          'Limited to the agreed contribution',
          'Unlimited for the partners',
          'Unlimited for the proprietor',
        ],
      },
      {
        label: 'If owners change',
        cells: [
          'The company continues',
          'It continues, still with one owner',
          'The LLP continues',
          'The firm may need to be reconstituted',
          'The business is tied to the proprietor',
        ],
      },
      {
        label: 'Transfer',
        cells: [
          'Shares can be transferred',
          'The single holding has to move together',
          'By partner consent and a fresh agreement',
          'Only as the deed allows',
          'The firm itself is not transferred like shares',
        ],
      },
    ],
  },
  {
    title: 'Yearly load',
    rows: [
      {
        label: 'Statutory audit',
        cells: [
          'Mandatory',
          'Mandatory',
          'Required after prescribed limits',
          'Not mandatory by default',
          'Not mandatory by default',
        ],
      },
      {
        label: 'Compliance',
        cells: [
          'Highest of these five',
          'Close to a company, without an AGM',
          'Lighter than a company',
          'Mostly tax and the deed',
          'Mostly the proprietor’s own tax filings',
        ],
      },
      {
        label: 'Outside investment',
        cells: [
          'The usual route for equity investors',
          'Harder, because there is only one owner',
          'Possible, but less usual than shares',
          'Uncommon',
          'Not a share-based investment',
        ],
      },
    ],
  },
];

export const serviceFactTables = {
  'private-limited-company-registration': {
    title: 'Private limited company at a glance',
    rows: [
      ['Governing law', 'Companies Act, 2013'],
      ['Shareholders', '2 to 200'],
      ['Directors', 'Minimum 2, with at least one resident in India'],
      ['Paid-up capital', 'No minimum amount is prescribed'],
      ['Liability', 'Limited to unpaid share capital'],
      ['Separate entity', 'Yes. It can own assets and sign contracts'],
      ['Audit', 'A statutory auditor is required'],
    ],
  },
  'one-person-company-registration': {
    title: 'One person company at a glance',
    rows: [
      ['Governing law', 'Companies Act, 2013'],
      ['Owners', 'One shareholder and a nominee'],
      ['Directors', 'At least one'],
      ['Liability', 'Limited to unpaid share capital'],
      ['Separate entity', 'Yes'],
      ['Who can form it', 'An Indian resident individual, in the usual case'],
      ['Audit', 'A statutory auditor is required'],
    ],
  },
  'limited-liability-partnership-registration': {
    title: 'LLP at a glance',
    rows: [
      ['Governing law', 'LLP Act, 2008'],
      ['Partners', 'At least two'],
      ['Liability', 'Limited to each partner’s agreed contribution'],
      ['Separate entity', 'Yes'],
      ['Management', 'Set out in the LLP agreement'],
      ['Audit', 'Required once turnover or contribution crosses the prescribed limit'],
      ['Compared with a company', 'Usually a lighter annual filing load'],
    ],
  },
  'partnership-firm-registration': {
    title: 'Partnership firm at a glance',
    rows: [
      ['Governing law', 'Indian Partnership Act, 1932'],
      ['Partners', '2 to 50'],
      ['Registration', 'Optional. A registered firm is easier to enforce'],
      ['Liability', 'Partners are jointly and severally liable'],
      ['Separate entity', 'No. The firm is not separate from its partners'],
      ['Deed', 'The partnership deed records shares, roles and exit'],
    ],
  },
  'sole-proprietorship-firm-registration': {
    title: 'Proprietorship at a glance',
    rows: [
      ['Owners', 'One person'],
      ['Separate entity', 'No. The person and the business share one identity'],
      ['Liability', 'Unlimited. Business dues can reach personal assets'],
      ['Incorporation', 'There is no MCA incorporation for a proprietorship'],
      ['What people still register', 'GST, Shop Act, Udyam or a local licence, if those apply'],
      ['Best suited to', 'A small or local activity with one owner'],
    ],
  },
  'gst-registration': {
    title: 'GST registration at a glance',
    rows: [
      ['What it is', 'A tax registration, not a company incorporation'],
      ['When it often matters', 'Turnover, interstate supply, and many online sales'],
      ['Thresholds', 'They differ for goods and services, and they change'],
      ['What you can do after', 'Issue GST invoices where the law requires them'],
      ['What it does not replace', 'Udyam, FSSAI, Shop Act or a trademark'],
    ],
  },
  'udyam-msme-registration': {
    title: 'Udyam at a glance',
    rows: [
      ['What it is', 'The current MSME registration'],
      ['Who it is for', 'Eligible micro, small and medium enterprises'],
      ['What it can help with', 'Some schemes, tenders and banking conversations'],
      ['What it is not', 'Not a trading licence, and not a substitute for GST'],
    ],
  },
  'fssai-registration': {
    title: 'FSSAI at a glance',
    rows: [
      ['What it is', 'The food-safety registration or licence'],
      ['Categories', 'Basic registration, state licence and central licence'],
      ['What decides the category', 'The food activity and the turnover'],
      ['Who usually needs it', 'Restaurants, cloud kitchens, manufacturers and many food traders'],
    ],
  },
  'trademark-registration': {
    title: 'Trademark at a glance',
    rows: [
      ['What it protects', 'A brand name, logo or tagline used in the market'],
      ['Where it is filed', 'The Trade Marks Registry'],
      ['Classes', 'Chosen from the goods or services you actually sell'],
      ['Company name', 'MCA name approval does not by itself give trademark rights'],
    ],
  },
  'shop-and-establishment-registration': {
    title: 'Shop Act at a glance',
    rows: [
      ['What it is', 'A state-level registration for a shop, office or commercial establishment'],
      ['Who it often covers', 'Employers and many local commercial premises'],
      ['Rules', 'They differ by state'],
      ['What it does not replace', 'GST, FSSAI or company incorporation'],
    ],
  },
  'import-export-code-registration': {
    title: 'Import Export Code at a glance',
    rows: [
      ['What it is', 'A code for a business that imports or exports'],
      ['Who applies', 'The firm, company or LLP that will trade'],
      ['Where it is used', 'Customs and foreign-trade paperwork'],
      ['What it does not replace', 'GST, a customs broker, or a product-specific licence'],
    ],
  },
  'iso-certification': {
    title: 'ISO certification at a glance',
    rows: [
      ['What it is', 'A management-system certificate against a chosen ISO standard'],
      ['What decides the standard', 'The work you do, such as quality, environment or information security'],
      ['How it is issued', 'An accredited certification body audits the system'],
      ['What it is not', 'Not a government licence, and not a product approval by itself'],
    ],
  },
};

const aliasFacts = {
  'llp-registration': 'limited-liability-partnership-registration',
  'msme-registration': 'udyam-msme-registration',
  'shop-act-registration': 'shop-and-establishment-registration',
  'fssai-food-license': 'fssai-registration',
};

export function getServiceFacts(slug) {
  const key = aliasFacts[slug] || slug;
  return serviceFactTables[key] || null;
}
