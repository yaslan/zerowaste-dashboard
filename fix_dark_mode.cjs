const fs = require('fs');
const path = require('path');

const srcDir = 'e:/rew/zerowaste-dashboard/src';
const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            filelist = walkSync(filePath, filelist);
        } else if (filePath.endsWith('.jsx')) {
            filelist.push(filePath);
        }
    });
    return filelist;
};

const files = walkSync(srcDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace backgrounds
    content = content.replace(/bg-background-dark/g, 'bg-background-light dark:bg-background-dark');
    content = content.replace(/bg-surface-dark/g, 'bg-white dark:bg-surface-dark');

    // Replace borders
    content = content.replace(/border-border-dark/g, 'border-slate-200 dark:border-border-dark');
    content = content.replace(/divide-border-dark/g, 'divide-slate-200 dark:divide-border-dark');

    // Text colors
    // Convert text-white to text-slate-900 dark:text-white
    // Convert text-slate-400 to text-slate-500 dark:text-slate-400
    // Convert text-slate-100 to text-slate-800 dark:text-slate-100
    // Convert text-slate-300 to text-slate-600 dark:text-slate-300
    content = content.replace(/text-white/g, 'text-slate-900 dark:text-white');
    content = content.replace(/text-slate-400/g, 'text-slate-500 dark:text-slate-400');
    content = content.replace(/text-slate-100/g, 'text-slate-800 dark:text-slate-100');
    content = content.replace(/text-slate-300/g, 'text-slate-600 dark:text-slate-300');

    // Fix buttons that MUST be white
    // Any element taking a background color that is dark by nature (like bg-primary, bg-red, etc) needs white text
    const revertWhitePattern = /(bg-primary|bg-red-500|bg-blue-500)(-light)?([\w\s-]*?)text-slate-900 dark:text-white/g;
    content = content.replace(revertWhitePattern, '$1$2$3text-white');

    const revertWhitePattern2 = /text-slate-900 dark:text-white([\w\s-]*?)(bg-primary|bg-red-500|bg-blue-500)/g;
    content = content.replace(revertWhitePattern2, 'text-white$1$2');

    // Cleanup potential duplication if script runs twice
    content = content.replace(/bg-background-light dark:(bg-background-light dark:)+/g, 'bg-background-light dark:');
    content = content.replace(/bg-white dark:(bg-white dark:)+/g, 'bg-white dark:');
    content = content.replace(/border-slate-200 dark:(border-slate-200 dark:)+/g, 'border-slate-200 dark:');
    content = content.replace(/divide-slate-200 dark:(divide-slate-200 dark:)+/g, 'divide-slate-200 dark:');
    content = content.replace(/text-slate-900 dark:(text-slate-900 dark:)+/g, 'text-slate-900 dark:');
    content = content.replace(/text-slate-500 dark:(text-slate-500 dark:)+/g, 'text-slate-500 dark:');
    content = content.replace(/text-slate-800 dark:(text-slate-800 dark:)+/g, 'text-slate-800 dark:');
    content = content.replace(/text-slate-600 dark:(text-slate-600 dark:)+/g, 'text-slate-600 dark:');

    // Specific fix for activeTab bg-primary text-white in dashboard menus
    content = content.replace(
        /'bg-primary text-slate-900 dark:text-white'/g,
        "'bg-primary text-white'"
    );

    fs.writeFileSync(file, content);
});
console.log('Class mapping completed for light/dark mode.');
