import React, { useState, useEffect, ChangeEvent } from "react";

interface CompanyList {
  id: number;
  companyName: string;
  companyNameKana: string;
}

// 仮値
const companyList = [
  {
    "id": 2403,
    "companyName": "PDCA",
    "companyNameKana": "ﾋﾟｰﾃﾞｨｰｼｰｴｰ",
  },
  {
    "id": 1218,
    "companyName": "ﾊﾟｯﾁｬｲﾔｯﾊﾟﾙ･ﾌﾟﾚｼｼﾞｮﾝ",
    "companyNameKana": "ﾊﾟｯﾁｬｲﾔｯﾊﾟﾙ･ﾌﾟﾚｼｼﾞｮﾝ",
  },
  {
    "id": 6102,
    "companyName": "御厨非鉄",
    "companyNameKana": "ﾐｸﾘﾔﾋﾃﾂ",
  },
];

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

const ListApp: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [filteredCompany, setFilteredCompany] = useState([] as CompanyList[]);

  useEffect(() => {
    setFilteredCompany(filteredCompanyListWithWord(companyList, keyword));
  }, [keyword]);

  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  return (
    <>
      <input onChange={handleChangeKeyword} value={keyword} />
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
