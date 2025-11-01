import * as fs from 'node:fs';
import * as path from 'node:path';
import { createInterface } from 'node:readline';
import { Command } from 'commander';

const program = new Command()
  .name('create-feature')
  .description('Create a new feature folder structure')
  .argument(
    '<feature-name>',
    'Name of the feature to create (supports nested features like "user-profile/settings")',
  )
  .option('-c, --config', 'Configure which folders/files to include interactively')
  .action(async (featureName, options) => {
    const featureParts = featureName.split('/');
    const nestingLevel = featureParts.length - 1; // 0 = no nesting, 1 = one level, etc.

    if (nestingLevel > 1) {
      console.log(
        `⚠️  Warning: You're creating a deeply nested feature (${nestingLevel} levels deep): ${featureName}`,
      );
      console.log('   Deep nesting can make the codebase harder to navigate and maintain.');
      console.log('   Consider if this feature structure could be simplified or reorganized.');
      console.log('');

      const answer = await promptUser('Do you want to proceed anyway? (y/N): ');
      if (answer !== 'y' && answer !== 'yes') {
        console.log('❌ Feature creation cancelled.');
        return;
      }
      console.log('');
    }

    console.log(`🔨 Creating feature ${featureName}...`);

    const featurePath = path.join(process.cwd(), 'src', 'features', featureName);

    if (fs.existsSync(featurePath)) {
      console.error(`❌ Feature ${featureName} already exists`);
      return;
    }

    fs.mkdirSync(featurePath, { recursive: true });

    let folders = ['ui', 'hooks', 'schemas', 'types', 'rpc'];
    let files = ['constants.ts'];

    if (options.config) {
      const selected = await promptForIncludes();
      folders = selected.folders;
      files = selected.files;

      if (folders.length === 0 && files.length === 0) {
        console.log('⚠️  No folders or files selected. Creating empty feature folder.');
      }
    }

    folders.forEach((folderName) => {
      const folderPath = path.join(featurePath, folderName);
      fs.mkdirSync(folderPath, { recursive: true });

      const indexPath = path.join(folderPath, 'index.ts');
      fs.writeFileSync(indexPath, '');
    });

    files.forEach((fileName) => {
      const filePath = path.join(featurePath, fileName);
      fs.writeFileSync(filePath, '');
    });

    console.log(`✅ Feature '${featureName}' created successfully in src/features/${featureName}`);

    if (nestingLevel > 0) {
      console.log(
        `📁 Nested structure created with ${nestingLevel} level${nestingLevel > 1 ? 's' : ''} of nesting`,
      );
    }

    if (folders.length > 0 || files.length > 0) {
      console.log('Created folders:');
      folders.forEach((folder) => console.log(`  📁 ${folder}/`));
      console.log('Created files:');
      files.forEach((file) => console.log(`  📄 ${file}`));
      folders.forEach((folder) => console.log(`  📄 ${folder}/index.ts`));
    }
  });

program.parse(process.argv);

function promptUser(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function promptForIncludes(): Promise<{
  folders: Array<string>;
  files: Array<string>;
}> {
  const allFolders = ['ui', 'hooks', 'lib', 'schemas', 'types', 'rpc'];
  const allFiles = ['constants.ts'];

  const selectedFolders: Array<string> = [];
  const selectedFiles: Array<string> = [];

  console.log('\n📋 Select which folders/files to include (y/N):\n');

  for (const folder of allFolders) {
    const answer = await promptUser(`  Include ${folder}/ folder? (Y/n): `);
    if (answer === '' || answer === 'y' || answer === 'yes') {
      selectedFolders.push(folder);
    }
  }

  console.log('');

  for (const file of allFiles) {
    const answer = await promptUser(`  Include ${file} file? (Y/n): `);
    if (answer === '' || answer === 'y' || answer === 'yes') {
      selectedFiles.push(file);
    }
  }

  console.log('');

  return { folders: selectedFolders, files: selectedFiles };
}
