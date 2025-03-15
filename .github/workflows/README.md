# AutoBlog GitHub Actions Workflow

This directory contains GitHub Actions workflow files for automatically generating blog posts using AI and publishing them to your Jekyll blog.

## Setting Up GitHub Secrets

To use the AutoBlog workflow, you need to set up the following GitHub Secrets in your repository settings:

1. Go to your repository on GitHub
2. Click on "Settings" -> "Secrets and variables" -> "Actions"
3. Add the following secrets:

### Required Secrets

- `GH_TOKEN`: A GitHub Personal Access Token with `repo` scope to commit changes to your repository

### API Keys (at least one is required)

- `OPENAI_API_KEY`: Your OpenAI API key (if using OpenAI models)
- `ANTHROPIC_API_KEY`: Your Anthropic API key (if using Claude models)

### Optional Configuration Secrets

- `GOOGLE_API_KEY`: Your Google API key for web search
- `GOOGLE_CSE_ID`: Your Google Custom Search Engine ID
- `USE_OPENAI`: Set to "true" or "false" (default is "true")
- `USE_ANTHROPIC`: Set to "true" or "false" (default is "false")
- `MODEL_TEMPERATURE`: Temperature setting for AI model (default is "0.7")
- `MAX_TOKENS`: Maximum tokens for AI response (default is "4000")
- `NUM_POSTS`: Number of posts to generate (default is "1")

## Using the Workflow

### Automatic Scheduled Runs

The workflow is configured to run automatically every day at 8:00 AM UTC using the schedule trigger.

### Manual Triggering

You can also trigger the workflow manually:

1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. Select the "AutoBlog Post Generation" workflow
4. Click on "Run workflow"

### Using in Other Repositories

To use this action in another repository, create a workflow file like this:

```yaml
name: Generate Blog Posts

on:
  schedule:
    - cron: '0 8 * * *'  # Run daily at 8:00 AM UTC
  workflow_dispatch:      # Allow manual triggering

jobs:
  generate-posts:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Generate blog posts
        uses: RajanSandha/auto_blog@main
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          openai_api_key: ${{ secrets.OPENAI_API_KEY }}
          # Add other inputs as needed
```

## Troubleshooting

If you encounter any issues with the workflow:

1. Check the workflow run logs for error messages
2. Verify that all required secrets are properly set
3. Ensure your repository has the correct directory structure for Jekyll posts (`_posts` directory)
4. Check that the Python dependencies are correctly specified in your `requirements.txt` file 