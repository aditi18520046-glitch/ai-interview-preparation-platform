import { CRCompany, CRRole } from './types';

const companyNames = [
  'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Adobe', 'Oracle', 'IBM', 'Intel', 
  'NVIDIA', 'Cisco', 'Qualcomm', 'Salesforce', 'LinkedIn', 'Uber', 'Airbnb', 'Stripe', 'PayPal', 
  'Atlassian', 'Flipkart', 'PhonePe', 'Razorpay', 'Swiggy', 'Zomato', 'Meesho', 'CRED', 'Groww', 
  'Ola', 'Paytm', 'Zoho', 'Freshworks', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'Capgemini', 
  'Cognizant', 'Tech Mahindra', 'HCL', 'Deloitte', 'EY', 'PwC', 'KPMG'
];

export const allCompanies: CRCompany[] = companyNames.map((name, i) => {
  const isProduct = i < 32;
  const isStartup = i >= 20 && i < 32;
  return {
    id: `comp-${i}`,
    name,
    type: isStartup ? 'Startup / Unicorn' : (isProduct ? 'Product Based' : 'Service Based / Consulting'),
    industry: isProduct ? (isStartup ? 'E-Commerce / FinTech' : 'Software / Cloud / AI') : 'IT Services & Consulting',
    headquarters: isProduct ? (isStartup ? 'Bengaluru, India' : 'Silicon Valley, USA') : 'Global',
    founded: (1990 + (i % 30)).toString(),
    size: isStartup ? '1,000 - 5,000' : '10,000+',
    hiringStatus: i % 3 === 0 ? 'Actively Hiring' : 'Frequently Hiring',
    description: `${name} is a global leader in its domain, constantly innovating and offering great opportunities for engineers and professionals worldwide.`,
    popularRoles: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Cloud Engineer'],
    technologies: ['Java', 'Python', 'React', 'AWS', 'System Design']
  };
});

export const featuredCompanies: CRCompany[] = allCompanies.slice(0, 12);

const roleTitles = [
  'Software Engineer', 'Backend Developer', 'Frontend Developer', 'Full Stack Developer', 
  'Data Scientist', 'Machine Learning Engineer', 'AI Engineer', 'Cloud Engineer', 
  'DevOps Engineer', 'Cyber Security Engineer', 'QA Engineer', 'SDET', 'Android Developer', 
  'iOS Developer', 'Data Analyst', 'Business Analyst', 'Product Manager', 'UI/UX Designer', 
  'System Engineer', 'Network Engineer', 'Embedded Engineer', 'Game Developer', 
  'Blockchain Developer', 'Research Engineer'
];

export const allRoles: CRRole[] = roleTitles.map((title, i) => {
  return {
    id: `role-${i}`,
    title,
    description: `A ${title} is responsible for designing, building, and maintaining robust and scalable solutions in their domain, working closely with cross-functional teams to deliver high-quality products.`,
    skills: title.includes('Frontend') || title.includes('UI/UX') 
      ? ['React', 'JavaScript', 'CSS', 'Figma']
      : title.includes('Data') || title.includes('AI') || title.includes('Machine')
      ? ['Python', 'SQL', 'TensorFlow', 'Statistics']
      : ['Java', 'C++', 'System Design', 'Algorithms'],
    demand: i % 4 === 0 ? 'High' : 'Medium'
  };
});
