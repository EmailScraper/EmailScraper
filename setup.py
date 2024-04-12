# coding: utf8

import sys
import setuptools

with open('requirements.txt', 'r') as f:
    requirements = [
        s for s in [
            line.split('#', 1)[0].strip(' \t\n') for line in f
        ] if s != ''
    ]

long_description = open("README.md", "r").read()

setuptools.setup(
    name='github_email_scraper',
    version='0.1',
    author='EmailScraper',
    author_email='alanzhang311@gmail.com',
    description="Collect email address of users affiliated to a given repository",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url='https://github.com/EmailScraper/EmailScraper',
    packages=['github_email_scraper'],
    install_requires=requirements
)
