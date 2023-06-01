import React, { useState, useEffect, ChangeEvent } from "react";

interface CompanyList {
  id: number;
  companyName: string;
  companyNameKana: string;
}

const filteredCompanyListWithWord = (companyList: CompanyList[], searchKeywords: string) => {
  return companyList.filter((company) => {
    const keywordRegexp = new RegExp(searchKeywords);
    return (
      keywordRegexp.test(String(company.id)) ||
      keywordRegexp.test(company.companyName) ||
      keywordRegexp.test(company.companyNameKana)
    );
  });
};

const ListApp = () => {
  const [keyword, setKeyword] = useState("");
  const [companyList, setCompanyList] = useState([] as CompanyList[]);
  const [filteredCompany, setFilteredCompany] = useState([] as CompanyList[]);

  const [companyId, setCompanyId] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [companyNameKana, setCompanyNameKana] = useState('');

  useEffect(() => {
    const fetchCompanyList = () => {
      chrome.storage.local.get("company-list", (result) => {
        const storedCompoanyList = result["company-list"] || [];
        setCompanyList(storedCompoanyList);
        setFilteredCompany(storedCompoanyList);
      });
    }
    fetchCompanyList();
  }, []);

  useEffect(() => {
    setFilteredCompany(filteredCompanyListWithWord(companyList, keyword));
  }, [keyword, companyList]);

  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const handleAddCompanyData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tempArray = [...companyList];
    tempArray.push({
      "id": companyId,
      "companyName": companyName,
      "companyNameKana": companyNameKana,
    });

    chrome.storage.local.set({ "company-list": tempArray }, () => {
      setCompanyList(tempArray);
      setCompanyId(0);
      setCompanyName("");
      setCompanyNameKana("");
    });

    console.log('handleAddCompanyData', chrome.storage.local.get('company-list'));
  };

  return (
    <>
      <form id="input_company_data" onSubmit={(e) => handleAddCompanyData(e)}>
        <input type="text" name="companyId" value={companyId} onChange={(e) => setCompanyId(Number(e.target.value))} placeholder="ID" />
        <input type="text" name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="会社名" />
        <input type="text" name="companyNameKana" value={companyNameKana} onChange={(e) => setCompanyNameKana(e.target.value)} placeholder="ｶｲｼｬﾒｲ(ｶﾅ)" />
        <input type="submit" value="追加" />
      </form>
      <input onChange={handleChangeKeyword} value={keyword} placeholder="🔍検索" autoFocus />
      {filteredCompany.length !== 0 &&
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>社名</th>
              <th>読み</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompany.map((company, index) => {
              return (
                <tr key={index}>
                  <td>{company.id}</td>
                  <td>{company.companyName}</td>
                  <td>{company.companyNameKana}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
    </>
  );
};

export default ListApp;
