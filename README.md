# Github Email Scraper

Collect the email address of users affiliated to a given repository

## Installation
### From PyPi

```python
pip install github-email-scraper
```

## Usage
### Generate Github Token in https://github.com/settings/tokens/new <br/>
![Screenshot 2024-04-13 015158](https://github.com/EmailScraper/EmailScraper/assets/166853562/44bd8b42-e5ba-4659-ad16-731044284ed7)
<br/>
### From python script
```python
from github_email_scraper import EmailScraper

email_scraper = EmailScraper("MY_GITHUB_TOKEN", "owner/repo")
emails = email_scraper.get_emails()
print(emails)
```
![Screenshot 2024-04-13 014741](https://github.com/EmailScraper/EmailScraper/assets/166853562/6ad57320-7667-40bf-b740-43f3cd04b14d)
