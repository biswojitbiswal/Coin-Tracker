document.addEventListener("DOMContentLoaded", async() => {
    let coinData = [];
    coinData = await fetchCoinData();
    // console.log(coinData);
    displayCoinData(coinData);

    document.getElementById("search").addEventListener("input", () => {
        searchCoin(coinData);
    })

    document.getElementById("mkt-btn").addEventListener("click", () => {
        sortByMktCap(coinData);
    })

    document.getElementById("percentage-btn").addEventListener("click", () => {
        sortByPercentage(coinData);
    })
})

async function fetchCoinData(){
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
    
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.log(error);
    }
}

function displayCoinData(data){
    let tableBody = document.getElementById("table-body");

    tableBody.innerHTML = "";
    
    data.forEach((item) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td class="coin-name">
                    <img src=${item.image} alt="" class="coin-image">
                    <span>${item.name}</span>
            </td>
            <td>${item.symbol}</td>
            <td>${item.current_price}</td>
            <td>${item.total_volume}</td>
            <td class="${item.price_change_percentage_24h > 0 ? 'positive' : 'negative'}">${item.price_change_percentage_24h.toFixed(2)
            }%</td>
            <td>Mkr Cap: ${item.market_cap}</td>
        `;

        tableBody.appendChild(row);
    })
}

function searchCoin(data){
    let searchInput = document.getElementById("search").value;
    let searchData = data.filter((item) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase());
    })
    displayCoinData(searchData);
}

function sortByMktCap(data){
    let sortedArr = [...data].sort((a, b) => {
        return b.market_cap - a.market_cap;
    });

    displayCoinData(sortedArr);
}

function sortByPercentage(data){
    let sortedArr = [...data].sort((a,b) => {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
    });

    displayCoinData(sortedArr);
}