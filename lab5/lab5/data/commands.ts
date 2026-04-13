export interface GitCommand {
  tag: string;
  desc: string;
  detail: string;
  category: "setup" | "staging" | "branching" | "remote" | "utility";
}

export const commands: GitCommand[] = [
  { tag: "git init",     category: "setup",     desc: "Initialize a new Git repository in the current directory",           detail: `git init\ngit init my-project\n\n# Creates a hidden .git folder\n# Always the first step in a new project` },
  { tag: "git clone",    category: "setup",     desc: "Copy a remote repository to your local machine",                    detail: `git clone https://github.com/user/repo.git\ngit clone <url> my-folder\n\n# Downloads all files, branches, and history` },
  { tag: "git add",      category: "staging",   desc: "Stage changes to be included in the next commit",                   detail: `git add filename.txt   # stage one file\ngit add .              # stage all changes\ngit add -p             # interactive staging` },
  { tag: "git commit",   category: "staging",   desc: "Save staged changes permanently to the repository history",         detail: `git commit -m "your message"\ngit commit -am "add and commit tracked files"\n\n# Use short, present-tense messages` },
  { tag: "git status",   category: "utility",   desc: "Show the current state of your working directory and staging area", detail: `git status\ngit status -s   # short/compact output\n\n# Shows untracked, modified, and staged files` },
  { tag: "git log",      category: "utility",   desc: "Display the commit history of the repository",                      detail: `git log\ngit log --oneline\ngit log --oneline --graph --all` },
  { tag: "git branch",   category: "branching", desc: "List, create, or delete branches",                                  detail: `git branch              # list branches\ngit branch feature-x    # create branch\ngit branch -d feature-x # delete branch` },
  { tag: "git merge",    category: "branching", desc: "Combine changes from one branch into the current branch",           detail: `git merge feature-x\ngit merge --no-ff feature-x\n\n# --no-ff always creates a merge commit` },
  { tag: "git pull",     category: "remote",    desc: "Fetch changes from the remote and merge them into your branch",     detail: `git pull\ngit pull origin main\ngit pull --rebase origin main\n\n# pull = fetch + merge` },
  { tag: "git push",     category: "remote",    desc: "Upload local commits to the remote repository",                     detail: `git push origin main\ngit push -u origin main\ngit push --force-with-lease` },
  { tag: "git stash",    category: "utility",   desc: "Temporarily save uncommitted changes to switch context",            detail: `git stash\ngit stash pop           # restore latest stash\ngit stash list          # view all stashes` },
  { tag: "git checkout", category: "branching", desc: "Switch between branches or restore file versions",                  detail: `git checkout main\ngit checkout -b new-feature  # create + switch\ngit checkout -- file.txt     # discard changes` },
];

export interface QuizQuestion {
  q: string;
  opts: string[];
  ans: number;
  exp: string;
}

export const questions: QuizQuestion[] = [
  { q: "What does `git init` do?",                          opts: ["Downloads a remote repository", "Creates a new local repository", "Stages all changes", "Pushes to remote"],         ans: 1, exp: "git init creates a hidden .git folder, initializing a new empty repository in your current directory." },
  { q: "Which command stages ALL changed files at once?",   opts: ["git commit -a", "git push .", "git add .", "git stage all"],                                                          ans: 2, exp: "git add . stages all new and modified files in the current directory and subdirectories." },
  { q: "What is the correct order of the basic workflow?",  opts: ["commit → add → push", "add → commit → push", "push → add → commit", "commit → push → add"],                         ans: 1, exp: "The standard flow is: modify → git add (stage) → git commit (save locally) → git push (send to remote)." },
  { q: "What does `git stash` do?",                         opts: ["Deletes uncommitted changes", "Merges two branches", "Temporarily saves uncommitted work", "Shows commit history"],  ans: 2, exp: "git stash temporarily saves uncommitted changes so you can switch branches cleanly and restore the work later." },
  { q: "Which flag creates AND switches to a new branch?",  opts: ["-b", "-n", "--new", "--create"],                                                                                     ans: 0, exp: "git checkout -b branch-name creates the branch and switches to it in a single command." },
];

export const flowSteps = [
  { label: "main",         sub: "stable branch" },
  { label: "branch",       sub: "checkout -b"   },
  { label: "develop",      sub: "write code"     },
  { label: "commit",       sub: "git commit"     },
  { label: "pull request", sub: "open PR"        },
  { label: "merge",        sub: "git merge"      },
];

export const flowCards = [
  { title: "1. Branch off main",    body: "Always start a new feature from an up-to-date main. Run git checkout -b feature/my-task to begin." },
  { title: "2. Make small commits", body: "Commit often with clear messages. Each commit should represent one logical, self-contained change." },
  { title: "3. Push & open PR",     body: "Push your branch and open a pull request for team review. Never push directly to main." },
  { title: "4. Merge & clean up",   body: "After approval, merge to main and delete the feature branch to keep the repository tidy." },
];
