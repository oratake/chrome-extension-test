import React, { useState, useEffect, ChangeEvent } from "react";
import { getBucket } from "@extend-chrome/storage";

interface CompanyList {
  id: number;
  companyName: string;
  companyNameKana: string;
}

// // 仮値
// const testCompanyList = [
//   {
//     "id": 2403,
//     "companyName": "PDCA",
//     "companyNameKana": "ﾋﾟｰﾃﾞｨｰｼｰｴｰ",
//   },
//   {
//     "id": 1218,
//     "companyName": "ﾊﾟｯﾁｬｲﾔｯﾊﾟﾙ･ﾌﾟﾚｼｼﾞｮﾝ",
//     "companyNameKana": "ﾊﾟｯﾁｬｲﾔｯﾊﾟﾙ･ﾌﾟﾚｼｼﾞｮﾝ",
//   },
//   {
//     "id": 6102,
//     "companyName": "御厨非鉄",
//     "companyNameKana": "ﾐｸﾘﾔﾋﾃﾂ",
//   },
// ];

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
  const [filteredCompany, setFilteredCompany] = useState([] as CompanyList[]);

  const [companyId, setCompanyId] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [companyNameKana, setCompanyNameKana] = useState('');

  // 会社リストをfetch
  const companyListBucket = getBucket("company-list-bucket");
  async () => {
    const temp = await companyListBucket.get();
    setFilteredCompany(temp["company-list-bucket"]);
  }

  useEffect(() => {
    setFilteredCompany(filteredCompanyListWithWord(filteredCompany, keyword));
  }, [keyword, filteredCompany]);

  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const handleAddCompanyData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    const tempArray = [...filteredCompany];
    tempArray.push({
      "id": companyId,
      "companyName": companyName,
      "companyNameKana": companyNameKana,
    });
    setFilteredCompany(tempArray);
    companyListBucket.set(tempArray);

    setCompanyId(0);
    setCompanyName("");
    setCompanyNameKana("");
  };

  return (
    <>
      <form id="input_company_data" onSubmit={(e) => handleAddCompanyData(e)}>
        <input type="text" name="companyId" value={companyId} onChange={(e) => setCompanyId(Number(e.target.value))} placeholder="ID" />
        <input type="text" name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="会社名" />
        <input type="text" name="companyNameKana" value={companyNameKana} onChange={(e) => setCompanyNameKana(e.target.value)} placeholder="ｶｲｼｬﾒｲ(ｶﾅ)" />
        <input type="submit" value="追加" />
      </form>
      <input onChange={handleChangeKeyword} value={keyword} placeholder="🔍検索" />
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
