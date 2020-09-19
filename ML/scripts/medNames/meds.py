import concurrent.futures
import os
import re
import sys
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
DRIVER_BIN = os.path.join(PROJECT_ROOT, "chromedriver")
option = webdriver.ChromeOptions()
option.add_argument('headless')


def netmeds(generic_name):
    names = []
    prices = []
    try:
        url = "https://www.netmeds.com/catalogsearch/result?q=" + generic_name
        driver = webdriver.Chrome(executable_path=DRIVER_BIN, options=option)
        driver.get(url)
        res = driver.execute_script("return document.documentElement.outerHTML")
        soup = BeautifulSoup(res, 'lxml')
        driver.quit()
        main_container = soup.find("div", {"class": "left-block"})
        all_drugs = main_container.find_all("div", {"class": "drug_list"})
        for drug in all_drugs:
            drug_name = drug.find("div", {"class": "info"}).text
            price = drug.find("div", {"class": "pricebox"}).text
            price = re.sub('[^0-9.]', "", price)
            price = str(price)[1:]
            cleaned_name = re.sub('[^A-Za-z0-9 ]+', '', drug_name)
            cleaned_name = str(cleaned_name)[41: -40]
            names.append(cleaned_name)
            prices.append(price)
        return names, prices
    except:
        driver.quit()
        names.append("No results")
        prices.append("")
        return names, prices

def one_mg(generic_name):
    names = []
    prices = []
    try:
        url = "https://www.1mg.com/search/all?name=" + generic_name + "&filter=true&sort=popularity"
        driver = webdriver.Chrome(executable_path=DRIVER_BIN, options=option)
        driver.get(url)
        res = driver.execute_script("return document.documentElement.outerHTML")
        soup = BeautifulSoup(res, 'lxml')
        driver.quit()
        main_container = soup.find("div", {"class": "row style__grid-container___3OfcL"})
        all_drugs = main_container.find_all("div", {"class": "col-xs-12 col-md-9 col-sm-9 style__container___cTDz0"})
        for drug in all_drugs:
            drug_name = drug.find("div", {"class": "style__product-description___1vPQe"}).text
            price = drug.find("div", {"class": "style__price-tag___B2csA"}).text
            price = re.sub('[^0-9.]', "", price)
            names.append(drug_name)
            prices.append(price)
        return names, prices
    except:
        driver.quit()
        names.append("Not results")
        prices.append("")
        return names, prices


def scrape(generic):
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future1 = executor.submit(netmeds, generic)
        future2 = executor.submit(one_mg, generic)

        names_netmed, price_netmed = future1.result()
        names_1mg, price_1mg = future2.result()
        source_netmed = ["netmeds"] * len(names_netmed)
        source_1mg = ["1mg"] * len(names_1mg)
        names = names_netmed + names_1mg
        prices = price_netmed + price_1mg
        source = source_netmed + source_1mg
        result = []

    for ctr, name in enumerate(names):
        if ctr == 10:
            break
        price = prices[ctr]
        src = source[ctr]
        temp_dict = {
            "name": name,
            "price": price,
            "source": src
        }
        result.append(temp_dict)
    return result
