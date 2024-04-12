# Github Email Scraper

Collect the email address of users affiliated to a given repository

## Installation
### From PyPi

```python
pip install github-email-scraper
```

## Usage

From your python script
```python
from github_email_scraper import EmailScraper

email_scraper = EmailScraper("MY_GITHUB_TOKEN", "owner/repo")
emails = email_scraper.get_emails()
print(emails)
```
