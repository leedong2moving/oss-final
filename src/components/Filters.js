import React from "react";
import "../App.css";

const Filters = ({ filters, handleFilterChange, regions, applyFilters }) => {
  return (
    <div className="filters-container">
      <input
        type="text"
        name="name"
        placeholder="이름"
        value={filters.name || ""}
        onChange={handleFilterChange}
        className="filter-input"
      />
      <select
        name="party"
        value={filters.party || ""}
        onChange={handleFilterChange}
        className="filter-select"
      >
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
        value={filters.district || ""}
        onChange={handleFilterChange}
        className="filter-select"
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
          value={filters.subDistrict || ""}
          onChange={handleFilterChange}
          className="filter-select"
        >
          {regions[filters.district]?.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      )}
      <select
        name="committee"
        value={filters.committee || ""}
        onChange={handleFilterChange}
        className="filter-select"
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
        value={filters.gender || ""}
        onChange={handleFilterChange}
        className="filter-select"
      >
        <option value="">성별 선택</option>
        <option value="남">남성</option>
        <option value="여">여성</option>
      </select>
      <select
        name="ageRange"
        value={filters.ageRange || ""}
        onChange={handleFilterChange}
        className="filter-select"
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
        value={filters.reelection || ""}
        onChange={handleFilterChange}
        className="filter-select"
      >
        <option value="">당선 횟수 선택</option>
        <option value="초선">초선</option>
        <option value="재선">재선</option>
        <option value="3선">3선</option>
        <option value="4선">4선</option>
        <option value="5선">5선</option>
        <option value="6선">6선</option>
      </select>
      <select
        name="electionType"
        value={filters.electionType || ""}
        onChange={handleFilterChange}
        className="filter-select"
      >
        <option value="">당선 방법 선택</option>
        <option value="비례대표">비례대표</option>
        <option value="지역구">지역구</option>
      </select>
      <button onClick={applyFilters} className="filter-button">검색</button>
    </div>
  );
};

export default Filters;