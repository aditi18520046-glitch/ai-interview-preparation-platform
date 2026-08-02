const fs = require('fs');
let content = fs.readFileSync('src/pages/MockInterview.tsx', 'utf8');

const targetImport = "import Sidebar from '../components/dashboard/Sidebar';";
const targetImport2 = "import TopNav from '../components/dashboard/TopNav';";
const replacementImport = "import DashboardLayout from '../components/layout/DashboardLayout';";

content = content.replace(targetImport, replacementImport).replace(targetImport2, '');

const returnIdx = content.indexOf('return (');
if (returnIdx !== -1) {
  let innerContent = content.slice(returnIdx);
  const maxWIdx = innerContent.indexOf('<div className="max-w-[1440px] mx-auto space-y-8">');
  const footerIdx = innerContent.indexOf('<DashboardFooter />');
  
  if (maxWIdx !== -1 && footerIdx !== -1) {
    let extractedContent = innerContent.substring(maxWIdx + '<div className="max-w-[1440px] mx-auto space-y-8">'.length, footerIdx);
    
    let finalContent = content.substring(0, returnIdx) + 
      'return (\n    <DashboardLayout>\n      <div className="space-y-8">\n' + extractedContent + '      </div>\n    </DashboardLayout>\n  );\n}\n';
      
    finalContent = finalContent.replace('const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);', '');
    finalContent = finalContent.replace('const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);', '');
    
    fs.writeFileSync('src/pages/MockInterview.tsx', finalContent);
    console.log("MockInterview patched");
  } else {
    console.log("Not found maxW or footer", maxWIdx, footerIdx);
  }
}
