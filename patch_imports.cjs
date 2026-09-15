const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const additionalIcons = ['User', 'Target', 'Lightbulb', 'Star', 'Package', 'MonitorSmartphone', 'Users', 'CheckCircle2', 'Flag', 'Rocket', 'Leaf', 'TrendingUp', 'Globe', 'Scale', 'UserCheck', 'MessageSquare', 'Flame'];

// Find the import statement for lucide-react
const importRegex = /import\s+\{([^}]+)\}\s+from\s+'lucide-react';/;
const match = content.match(importRegex);

if (match) {
  let existingIcons = match[1].split(',').map(s => s.trim()).filter(s => s);
  
  additionalIcons.forEach(icon => {
    if (!existingIcons.includes(icon)) {
      existingIcons.push(icon);
    }
  });
  
  const newImport = `import { ${existingIcons.join(', ')} } from 'lucide-react';`;
  content = content.replace(importRegex, newImport);
  fs.writeFileSync('src/App.tsx', content);
}
