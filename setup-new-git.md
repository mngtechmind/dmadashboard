# Setup Management Dashboard for New Git Account

## Step 1: Create New Repository
1. Log into your new GitHub/GitLab account
2. Create a new repository named `management-dashboard`
3. Copy the repository URL (e.g., `https://github.com/YOURNEWACCOUNT/management-dashboard.git`)

## Step 2: Configure Git for This Project

### Change Remote URL
```powershell
cd "d:\My_Docs\VIJAY\Office\Management_Dashboard"
git remote set-url origin YOUR_NEW_REPOSITORY_URL
```

### Set Git User for This Repository
```powershell
git config user.name "Your New Username"
git config user.email "your.new.email@example.com"
```

### Verify Configuration
```powershell
git remote -v
git config user.name
git config user.email
```

## Step 3: Push to New Repository
```powershell
# Push to new remote repository
git push -u origin main
```

## Step 4: Optional - Authentication Setup

### Option A: Personal Access Token
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate new token with repo permissions
3. Use token as password when prompted

### Option B: SSH Key Setup
```powershell
# Generate SSH key (if you don't have one)
ssh-keygen -t rsa -b 4096 -C "your.new.email@example.com"

# Add SSH key to ssh-agent
ssh-add ~/.ssh/id_rsa

# Copy public key to clipboard
Get-Content ~/.ssh/id_rsa.pub | Set-Clipboard
```
Then add the SSH key to your GitHub/GitLab account settings.

### Option C: Git Credential Manager
```powershell
# Clear old credentials
git config --global --unset credential.helper
git credential-manager-core erase
```

## Example Complete Setup:
```powershell
# Navigate to project
cd "d:\My_Docs\VIJAY\Office\Management_Dashboard"

# Change remote URL
git remote set-url origin https://github.com/YOURNEWACCOUNT/management-dashboard.git

# Set new user
git config user.name "Your New Name"
git config user.email "newemail@example.com"

# Verify
git remote -v
git config user.name
git config user.email

# Push to new repository
git push -u origin main
```