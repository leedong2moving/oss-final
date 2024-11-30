import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const App = () => {
  const [members, setMembers] = useState([]); // 전체 데이터를 저장
  const [filteredMembers, setFilteredMembers] = useState([]); // 필터링된 데이터를 저장
  const [filters, setFilters] = useState({
    name: "",
    party: "",
    committee: "",
    district: "",
    subDistrict: "", // 세부 지역 필터
    gender: "",
    ageRange: "", // 연령대 필터
    reelection: "",
    electionType: "",
  }); // 검색 조건 상태

  // 지역 및 세부 지역 데이터
  const regions = {
    서울: [
      "전체",
      "강남구갑",
      "강남구을",
      "강남구병",
      "강동구갑",
      "강동구을",
      "강서구갑",
      "강서구을",
      "강서구병",
      "광진구갑",
      "광진구을",
      "구로구갑",
      "구로구을",
      "금천구",
      "노원구갑",
      "노원구을",
      "도봉구갑",
      "도봉구을",
      "동대문구갑",
      "동대문구을",
      "동작구갑",
      "동작구을",
      "마포구갑",
      "마포구을",
      "서대문구갑",
      "서대문구을",
      "서초구갑",
      "서초구을",
      "성북구갑",
      "성북구을",
      "송파구갑",
      "송파구을",
      "송파구병",
      "양천구갑",
      "양천구을",
      "영등포구갑",
      "영등포구을",
      "용산구",
      "은평구갑",
      "은평구을",
      "종로구",
      "중구성동구갑",
      "중구성동구을",
      "중랑구갑",
      "중랑구을",
    ],
    부산: [
      "전체",
      "강서구",
      "금정구",
      "기장군",
      "남구",
      "동구",
      "동래구",
      "북구갑",
      "북구을",
      "사상구",
      "사하구갑",
      "사하구을",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구갑",
      "해운대구을",
    ],
    대구: ["전체", "동구갑", "동구을", "서구", "중구", "남구", "북구갑", "북구을", "달서구갑", "달서구을", "달성군"],
    광주: ["전체", "동구", "남구", "서구갑", "서구을", "북구갑", "북구을"],
    대전: ["전체", "중구", "동구", "서구갑", "서구을", "유성구갑", "유성구을"],
    울산: ["전체", "중구", "남구갑", "남구을", "동구", "북구", "울주군"],
    인천: ["전체", "계양구갑", "계양구을", "남동구갑", "남동구을", "동구미추홀구갑", "동구미추홀구을", "부평구갑", "부평구을", "서구갑", "서구을", "연수구갑", "연수구을", "중구강화군옹진군"],
    경기: [
      "전체",
      "가평군",
      "고양시갑",
      "고양시을",
      "고양시병",
      "고양시정",
      "과천시",
      "광명시갑",
      "광명시을",
      "광주시갑",
      "광주시을",
      "구리시",
      "군포시",
      "김포시갑",
      "김포시을",
      "남양주시갑",
      "남양주시을",
      "남양주시병",
      "동두천시",
      "부천시갑",
      "부천시을",
      "부천시병",
      "부천시정",
      "성남시갑",
      "성남시을",
      "성남시병",
      "수원시갑",
      "수원시을",
      "수원시병",
      "수원시정",
      "수원시무",
      "안산시갑",
      "안산시을",
      "안산시병",
      "안산시상",
      "안양시갑",
      "안양시을",
      "양주시",
      "여주시",
      "오산시",
      "용인시갑",
      "용인시을",
      "용인시병",
      "용인시정",
      "의왕시",
      "의정부시갑",
      "의정부시을",
      "이천시",
      "파주시갑",
      "파주시을",
      "평택시갑",
      "평택시을",
      "포천시",
      "하남시",
      "화성시갑",
      "화성시을",
      "화성시병",
      "화성시정",
    ],
    강원: [
      "전체",
      "춘천시갑",
      "춘천시을",
      "원주시갑",
      "원주시을",
      "강릉시",
      "동해시",
      "삼척시",
      "태백시",
      "정선군",
      "철원군",
      "화천군",
      "양구군",
      "고성군",
      "양양군",
    ],
    충북: ["전체", "청주시갑", "청주시을", "청주시병", "청주시정", "충주시", "제천시", "단양군"],
    충남: ["전체", "천안시갑", "천안시을", "천안시병", "공주시", "보령시", "서산시", "아산시갑", "아산시을", "논산시", "당진시"],
    전북: ["전체", "전주시갑", "전주시을", "전주시병", "군산시", "익산시갑", "익산시을"],
    전남: ["전체", "목포시", "여수시갑", "여수시을", "순천시", "광양시"],
    경북: ["전체", "포항시갑", "포항시을", "경주시", "구미시갑", "구미시을"],
    경남: ["전체", "창원시갑", "창원시을", "창원시병"],
    제주: ["전체", "제주시갑", "제주시을", "서귀포시"],
  };

  // API 데이터 불러오기
  const fetchApiData = async () => {
    try {
      const response = await axios.get(
        "https://open.assembly.go.kr/portal/openapi/nwvrqwxyaytdsfvhu",
        {
          params: {
            KEY: "7ad0870915b64a82a334a394151caee5",
            Type: "json",
            pIndex: 1,
            pSize: 300,
          },
        }
      );
      const data = response.data.nwvrqwxyaytdsfvhu[1].row;
      setMembers(data);
      setFilteredMembers(data);
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  // 필터 적용 함수
  const applyFilters = () => {
    const filtered = members.filter((member) => {
      const birthYear = parseInt(member.BTH_DATE.split("-")[0]);
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      return (
        (!filters.name || member.HG_NM.includes(filters.name)) &&
        (!filters.party || member.POLY_NM === filters.party) &&
        (!filters.committee || member.CMITS.includes(filters.committee)) &&
        (!filters.district || member.ORIG_NM.includes(filters.district)) &&
        (!filters.subDistrict || filters.subDistrict === "전체" || member.ORIG_NM.includes(filters.subDistrict)) &&
        (!filters.gender || member.SEX_GBN_NM === filters.gender) &&
        (!filters.ageRange ||
          (filters.ageRange === "30-39" && age >= 30 && age < 40) ||
          (filters.ageRange === "40-49" && age >= 40 && age < 50) ||
          (filters.ageRange === "50-59" && age >= 50 && age < 60) ||
          (filters.ageRange === "60-69" && age >= 60 && age < 70) ||
          (filters.ageRange === "70+" && age >= 70)) &&
        (!filters.reelection || member.REELE_GBN_NM === filters.reelection) &&
        (!filters.electionType || member.ELECT_GBN_NM === filters.electionType)
      );
    });
    setFilteredMembers(filtered);
  };

  // 필터 입력값 변경 시 호출
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // 그래프 데이터 설정
  const chartData = {
    labels: ["검색 결과", "기타"],
    datasets: [
      {
        data: [filteredMembers.length, members.length - filteredMembers.length],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div>
      <h1>국회의원 검색</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <select name="party" value={filters.party} onChange={handleFilterChange}>
          <option value="">정당 선택</option>
          <option value="더불어민주당">더불어민주당</option>
          <option value="국민의힘">국민의힘</option>
          <option value="조국혁신당">조국혁신당</option>
          <option value="개혁신당">개혁신당</option>
          <option value="진보당">진보당</option>
          <option value="기본소득당">기본소득당</option>
          <option value="사회민주당">사회민주당</option>
          <option value="무소속">무소속</option>
        </select>
        <select
          name="district"
          value={filters.district}
          onChange={(e) => {
            setFilters({ ...filters, district: e.target.value, subDistrict: "전체" });
          }}
        >
          <option value="">지역 선택</option>
          {Object.keys(regions).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        {filters.district && filters.district !== "전체" && (
          <select
            name="subDistrict"
            value={filters.subDistrict}
            onChange={handleFilterChange}
          >
            {regions[filters.district].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}
        <select
          name="committee"
          value={filters.committee}
          onChange={handleFilterChange}
        >
          <option value="">위원회 선택</option>
          <option value="국회운영위원회">국회운영위원회</option>
          <option value="법제사법위원회">법제사법위원회</option>
          <option value="정무위원회">정무위원회</option>
          <option value="기획재정위원회">기획재정위원회</option>
          <option value="교육위원회">교육위원회</option>
          <option value="과학기술정보방송통신위원회">과학기술정보방송통신위원회</option>
          <option value="외교통일위원회">외교통일위원회</option>
          <option value="국방위원회">국방위원회</option>
          <option value="행정안전위원회">행정안전위원회</option>
          <option value="문화체육관광위원회">문화체육관광위원회</option>
          <option value="농림축산식품해양수산위원회">농림축산식품해양수산위원회</option>
          <option value="산업통상자원중소벤처기업위원회">산업통상자원중소벤처기업위원회</option>
          <option value="보건복지위원회">보건복지위원회</option>
          <option value="환경노동위원회">환경노동위원회</option>
          <option value="국토교통위원회">국토교통위원회</option>
          <option value="정보위원회">정보위원회</option>
          <option value="여성가족위원회">여성가족위원회</option>
          <option value="예산결산특별위원회">예산결산특별위원회</option>
        </select>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
        >
          <option value="">성별 선택</option>
          <option value="남">남성</option>
          <option value="여">여성</option>
        </select>
        <select
          name="ageRange"
          value={filters.ageRange}
          onChange={handleFilterChange}
        >
          <option value="">연령대 선택</option>
          <option value="30-39">30대</option>
          <option value="40-49">40대</option>
          <option value="50-59">50대</option>
          <option value="60-69">60대</option>
          <option value="70+">70대 이상</option>
        </select>
        <select
          name="reelection"
          value={filters.reelection}
          onChange={handleFilterChange}
        >
          <option value="">당선 횟수 선택</option>
          <option value="초선">초선</option>
          <option value="재선">재선</option>
        </select>
        <select
          name="electionType"
          value={filters.electionType}
          onChange={handleFilterChange}
        >
          <option value="">당선 방법 선택</option>
          <option value="비례대표">비례대표</option>
          <option value="지역구">지역구</option>
        </select>
        <button onClick={applyFilters}>검색</button>
      </div>
      <div>
        <h2>검색 결과</h2>
        <p>
          총 {members.length}명 중 {filteredMembers.length}명이 검색 조건에 부합합니다.
        </p>
        <div style={{ width: "150px", height: "150px", margin: "auto" }}>
          <Pie data={chartData} />
        </div>
      </div>
      <table border="1" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>이름</th>
            <th>정당</th>
            <th>위원회</th>
            <th>선거구</th>
            <th>성별</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member, index) => (
              <tr key={index}>
                <td>{member.HG_NM}</td>
                <td>{member.POLY_NM}</td>
                <td>{member.CMITS}</td>
                <td>{member.ORIG_NM}</td>
                <td>{member.SEX_GBN_NM}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">조건에 해당하는 국회의원이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
