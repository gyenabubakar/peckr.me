import * as fs from 'node:fs';
import * as path from 'node:path';
import { Command } from 'commander';
import pc from 'picocolors';
import prompts from 'prompts';

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
    const nestingLevel = featureParts.length - 1;

    if (nestingLevel > 1) {
      console.log(
        pc.yellow(
          `⚠️  Warning: You're creating a deeply nested feature (${nestingLevel} levels deep): ${featureName}`,
        ),
      );
      console.log(
        pc.yellow('   Deep nesting can make the codebase harder to navigate and maintain.'),
      );
      console.log(
        pc.yellow('   Consider if this feature structure could be simplified or reorganized.'),
      );
      console.log('');

      const { proceed } = await prompts(
        {
          type: 'confirm',
          name: 'proceed',
          message: 'Do you want to proceed anyway?',
          initial: false,
        },
        { onCancel: () => process.exit(0) },
      );

      if (!proceed) {
        console.log(pc.red('❌ Feature creation cancelled.'));
        return;
      }
      console.log('');
    }

    const featurePath = path.join(process.cwd(), 'src', 'features', featureName);
    const featureExists = fs.existsSync(featurePath);

    if (featureExists) {
      return await handleExistingFeature(featureName, featurePath);
    }

    console.log(pc.cyan(`🔨 Creating feature ${featureName}...`));

    let folders = ['ui', 'hooks', 'schemas', 'types', 'rpc'];
    let files = ['constants.ts'];

    if (options.config) {
      const selected = await promptForIncludes();
      if (!selected) {
        console.log(pc.red('❌ Feature creation cancelled.'));
        return;
      }
      folders = selected.folders;
      files = selected.files;

      if (folders.length === 0 && files.length === 0) {
        console.log(pc.yellow('⚠️  No folders or files selected. Creating empty feature folder.'));
      }
    }

    fs.mkdirSync(featurePath, { recursive: true });

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

    console.log(
      pc.green(`✅ Feature '${featureName}' created successfully in src/features/${featureName}`),
    );

    if (nestingLevel > 0) {
      console.log(
        pc.cyan(
          `📁 Nested structure created with ${nestingLevel} level${nestingLevel > 1 ? 's' : ''} of nesting`,
        ),
      );
    }

    if (folders.length > 0 || files.length > 0) {
      console.log(pc.bold('\nCreated folders:'));
      folders.forEach((folder) => console.log(pc.dim(`  📁 ${folder}/`)));
      console.log(pc.bold('Created files:'));
      files.forEach((file) => console.log(pc.dim(`  📄 ${file}`)));
      folders.forEach((folder) => console.log(pc.dim(`  📄 ${folder}/index.ts`)));
    }
  });

program.parse(process.argv);

async function handleExistingFeature(featureName: string, featurePath: string) {
  const boxWidth = 70;
  const border = pc.yellow('─'.repeat(boxWidth));
  const sideBorder = pc.yellow('│');

  console.log('');
  console.log(pc.yellow('┌') + border + pc.yellow('┐'));
  console.log(
    sideBorder +
      pc.yellow(pc.bold(` ⚠️  Feature "${featureName}" already exists `.padEnd(boxWidth))) +
      sideBorder,
  );
  console.log(pc.yellow('└') + border + pc.yellow('┘'));
  console.log('');

  const existing = getExistingStructure(featurePath);

  console.log(pc.bold('📦 Existing structure:'));
  existing.folders.forEach((folder) => console.log(pc.green(`  ✓ ${folder}/`)));
  existing.files.forEach((file) => console.log(pc.green(`  ✓ ${file}`)));
  console.log('');

  const allFolders = ['ui', 'hooks', 'lib', 'schemas', 'types', 'rpc'];
  const allFiles = ['constants.ts'];

  const missingFolders = allFolders.filter((f) => !existing.folders.includes(f));
  const missingFiles = allFiles.filter((f) => !existing.files.includes(f));

  if (missingFolders.length === 0 && missingFiles.length === 0) {
    console.log(pc.green('✓ Feature already has all standard folders and files.'));
    return;
  }

  console.log(pc.bold('📋 Available to add:'));
  missingFolders.forEach((folder) => console.log(pc.dim(`  ○ ${folder}/`)));
  missingFiles.forEach((file) => console.log(pc.dim(`  ○ ${file}`)));
  console.log('');

  const { shouldEdit } = await prompts(
    {
      type: 'confirm',
      name: 'shouldEdit',
      message: 'Would you like to add missing folders/files?',
      initial: true,
    },
    { onCancel: () => process.exit(0) },
  );

  if (!shouldEdit) {
    console.log(pc.yellow('Skipped editing feature.'));
    return;
  }

  const selected = await promptForIncludes(missingFolders, missingFiles);
  if (!selected) {
    console.log(pc.red('❌ Feature editing cancelled.'));
    return;
  }

  const { folders, files } = selected;

  if (folders.length === 0 && files.length === 0) {
    console.log(pc.yellow('⚠️  No folders or files selected. Nothing was added.'));
    return;
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

  console.log(pc.green(`\n✅ Feature '${featureName}' updated successfully!`));

  if (folders.length > 0 || files.length > 0) {
    console.log(pc.bold('\nAdded folders:'));
    folders.forEach((folder) => console.log(pc.dim(`  📁 ${folder}/`)));
    if (files.length > 0) {
      console.log(pc.bold('Added files:'));
      files.forEach((file) => console.log(pc.dim(`  📄 ${file}`)));
    }
    folders.forEach((folder) => console.log(pc.dim(`  📄 ${folder}/index.ts`)));
  }
}

function getExistingStructure(featurePath: string): {
  folders: Array<string>;
  files: Array<string>;
} {
  const items = fs.readdirSync(featurePath);
  const folders: Array<string> = [];
  const files: Array<string> = [];

  items.forEach((item) => {
    const itemPath = path.join(featurePath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      folders.push(item);
    } else if (stat.isFile()) {
      files.push(item);
    }
  });

  return { folders, files };
}

async function promptForIncludes(
  availableFolders?: Array<string>,
  availableFiles?: Array<string>,
): Promise<{ folders: Array<string>; files: Array<string> } | null> {
  const allFolders = availableFolders ?? ['ui', 'hooks', 'lib', 'schemas', 'types', 'rpc'];
  const allFiles = availableFiles ?? ['constants.ts'];

  const questions = [];

  if (allFolders.length > 0) {
    questions.push({
      type: 'multiselect' as const,
      name: 'folders',
      message: 'Select folders to include (use ↑/↓ and space to toggle):',
      choices: allFolders.map((folder) => ({
        title: `${folder}/`,
        value: folder,
        selected: !availableFolders,
      })),
      hint: '- Space to select. Return to submit',
    });
  }

  if (allFiles.length > 0) {
    questions.push({
      type: 'multiselect' as const,
      name: 'files',
      message: 'Select files to include (use ↑/↓ and space to toggle):',
      choices: allFiles.map((file) => ({
        title: file,
        value: file,
        selected: !availableFiles,
      })),
      hint: '- Space to select. Return to submit',
    });
  }

  const result = await prompts(questions, { onCancel: () => null });

  if (Object.keys(result).length === 0) {
    return null;
  }

  return {
    folders: result.folders ?? [],
    files: result.files ?? [],
  };
}
