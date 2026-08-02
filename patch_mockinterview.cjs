const fs = require('fs');
let content = fs.readFileSync('src/pages/MockInterview.tsx', 'utf8');

const targetImport = "import Sidebar from '../components/dashboard/Sidebar';";
const targetImport2 = "import TopNav from '../components/dashboard/TopNav';";
const replacementImport = "import DashboardLayout from '../components/layout/DashboardLayout';";

content = content.replace(targetImport, replacementImport).replace(targetImport2, '');

const startTag = '<div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 flex">';
const endTag = '</div>\n    </div>\n  );\n}';

const newStart = '<DashboardLayout>';
const newEnd = '</DashboardLayout>\n  );\n}';

// Also we need to strip out Sidebar, TopNav, the background gradients, and the main container
const mainStart = '<main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 scrollbar-hide">';
const mainStartAlt = '<main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto overflow-x-hidden relative z-10 scrollbar-hide">';
const maxWStart = '<div className="max-w-[1440px] mx-auto space-y-10">';
// Wait, the easiest way is to just replace the outer layout completely.

const returnIdx = content.indexOf('return (');
if (returnIdx !== -1) {
  let innerContent = content.slice(returnIdx);
  // Find where <div className="max-w-[1440px] mx-auto space-y-10"> starts
  const maxWIdx = innerContent.indexOf('<div className="max-w-[1440px] mx-auto space-y-10">');
  // Find DashboardFooter
  const footerIdx = innerContent.indexOf('<DashboardFooter />');
  
  if (maxWIdx !== -1 && footerIdx !== -1) {
    let extractedContent = innerContent.substring(maxWIdx + '<div className="max-w-[1440px] mx-auto space-y-10">'.length, footerIdx);
    
    let finalContent = content.substring(0, returnIdx) + 
      'return (\n    <DashboardLayout>\n' + extractedContent + '    </DashboardLayout>\n  );\n}\n';
      
    // Remove unused state
    finalContent = finalContent.replace('const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);', '');
    finalContent = finalContent.replace('const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);', '');
    
    fs.writeFileSync('src/pages/MockInterview.tsx', finalContent);
    console.log("MockInterview patched");
  }
}
