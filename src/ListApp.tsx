import React, { useState, useEffect, ChangeEvent } from "react";

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

const ListApp: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  // const [showLists, setShowLists] = useState(false);
  const [filteredCompany, setFilteredCompany] = useState(companyList);

  useEffect(() => {
  if (keyword === "") {
    setFilteredCompany(companyList);
    return;
  }

  const searchKeywords = keyword;
  //   .trim()
  //   .toLowerCase()
  //   .match(/[^\s]+/g);

  //入力されたキーワードが空白のみの場合
  if (searchKeywords === null) {
    setFilteredCompany(companyList);
    return;
  }

  const result = companyList.filter((company) => {
    const keywordRegexp = new RegExp(searchKeywords);
    return (
      keywordRegexp.test(String(company.id)) ||
      keywordRegexp.test(company.companyName) ||
      keywordRegexp.test(company.companyNameKana)
    );
  });

  setFilteredCompany(result);
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
