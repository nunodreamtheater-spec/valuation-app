import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  Calculator, 
  BarChart3, 
  Info,
  Sparkles,
  PieChart,
  Layers,
  Activity,
  Sliders,
  Scale,
  Search,
  RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';

export default function App() {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'models' | 'comparison'
  const [selectedModelKey, setSelectedModelKey] = useState('dfcf_terminal');
  const [currency, setCurrency] = useState('$');

  // Ticker Search & Auto-Fetch State
  const [tickerQuery, setTickerQuery] = useState('AAPL');
  const [activeTicker, setActiveTicker] = useState('AAPL');
  const [companyName, setCompanyName] = useState('Apple Inc.');
  const [isSearching, setIsSearching] = useState(false);
  const [searchNotice, setSearchNotice] = useState(null);

  // Market & Margin of Safety
  const [marketPrice, setMarketPrice] = useState(175.0);
  const [marginOfSafety, setMarginOfSafety] = useState(20); // %

  // Shared Valuation Parameters
  const [wacc, setWacc] = useState(9.0); // Discount rate %
  const [aaaYield, setAaaYield] = useState(4.5); // AAA Corporate Bond Yield %

  // Financial Metrics per Share
  const [epsNoNRI, setEpsNoNRI] = useState(6.5); // EPS without Non-Recurring Items
  const [bookValuePerShare, setBookValuePerShare] = useState(4.8); // BVPS
  const [salesPerShare, setSalesPerShare] = useState(24.0); // Sales Per Share
  const [fcfPerShare, setFcfPerShare] = useState(6.8); // FCF Per Share
  const [netIncomePerShare, setNetIncomePerShare] = useState(6.4); // Net Income Per Share

  // Growth Rates (%)
  const [epsGrowthRate, setEpsGrowthRate] = useState(12.0); // EPS Growth
  const [fcfGrowthRate, setFcfGrowthRate] = useState(11.0); // FCF Growth
  const [salesGrowthRate, setSalesGrowthRate] = useState(10.0); // Sales Growth
  const [netIncomeGrowthRate, setNetIncomeGrowthRate] = useState(11.5); // Net Income Growth
  const [perpetualGrowth, setPerpetualGrowth] = useState(2.5); // Terminal Growth

  // Historical Multiples Means
  const [meanPE, setMeanPE] = useState(28.0);
  const [meanPB, setMeanPB] = useState(36.0);
  const [meanPS, setMeanPS] = useState(7.2);

  // Extended Ticker Database (Global & B3 stocks)
  const tickerDatabase = useMemo(() => ({
    AAPL: {
      name: 'Apple Inc.',
      currency: '$',
      marketPrice: 175.0,
      epsNoNRI: 6.5,
      bookValuePerShare: 4.8,
      salesPerShare: 24.0,
      fcfPerShare: 6.8,
      netIncomePerShare: 6.4,
      epsGrowthRate: 12.0,
      fcfGrowthRate: 11.0,
      salesGrowthRate: 10.0,
      netIncomeGrowthRate: 11.5,
      meanPE: 28.0,
      meanPB: 36.0,
      meanPS: 7.2,
      wacc: 9.0,
      perpetualGrowth: 2.5
    },
    MSFT: {
      name: 'Microsoft Corporation',
      currency: '$',
      marketPrice: 415.0,
      epsNoNRI: 11.8,
      bookValuePerShare: 34.0,
      salesPerShare: 31.5,
      fcfPerShare: 9.8,
      netIncomePerShare: 11.5,
      epsGrowthRate: 14.5,
      fcfGrowthRate: 13.0,
      salesGrowthRate: 12.5,
      netIncomeGrowthRate: 14.0,
      meanPE: 33.0,
      meanPB: 11.5,
      meanPS: 12.0,
      wacc: 8.5,
      perpetualGrowth: 2.5
    },
    NVDA: {
      name: 'NVIDIA Corporation',
      currency: '$',
      marketPrice: 130.0,
      epsNoNRI: 2.7,
      bookValuePerShare: 3.8,
      salesPerShare: 5.2,
      fcfPerShare: 2.5,
      netIncomePerShare: 2.6,
      epsGrowthRate: 28.0,
      fcfGrowthRate: 26.0,
      salesGrowthRate: 30.0,
      netIncomeGrowthRate: 27.5,
      meanPE: 45.0,
      meanPB: 32.0,
      meanPS: 22.0,
      wacc: 10.0,
      perpetualGrowth: 3.0
    },
    GOOGL: {
      name: 'Alphabet Inc.',
      currency: '$',
      marketPrice: 165.0,
      epsNoNRI: 6.8,
      bookValuePerShare: 23.5,
      salesPerShare: 24.8,
      fcfPerShare: 5.8,
      netIncomePerShare: 6.7,
      epsGrowthRate: 15.0,
      fcfGrowthRate: 13.5,
      salesGrowthRate: 12.0,
      netIncomeGrowthRate: 14.5,
      meanPE: 24.0,
      meanPB: 6.5,
      meanPS: 6.2,
      wacc: 9.0,
      perpetualGrowth: 2.5
    },
    AMZN: {
      name: 'Amazon.com, Inc.',
      currency: '$',
      marketPrice: 180.0,
      epsNoNRI: 3.9,
      bookValuePerShare: 20.2,
      salesPerShare: 56.0,
      fcfPerShare: 4.8,
      netIncomePerShare: 3.8,
      epsGrowthRate: 20.0,
      fcfGrowthRate: 22.0,
      salesGrowthRate: 12.0,
      netIncomeGrowthRate: 19.0,
      meanPE: 40.0,
      meanPB: 8.2,
      meanPS: 3.1,
      wacc: 9.5,
      perpetualGrowth: 2.5
    },
    TSLA: {
      name: 'Tesla, Inc.',
      currency: '$',
      marketPrice: 220.0,
      epsNoNRI: 3.1,
      bookValuePerShare: 19.5,
      salesPerShare: 29.0,
      fcfPerShare: 2.8,
      netIncomePerShare: 3.0,
      epsGrowthRate: 18.0,
      fcfGrowthRate: 16.0,
      salesGrowthRate: 17.0,
      netIncomeGrowthRate: 17.5,
      meanPE: 55.0,
      meanPB: 10.5,
      meanPS: 7.2,
      wacc: 11.0,
      perpetualGrowth: 2.5
    },
    KO: {
      name: 'The Coca-Cola Company',
      currency: '$',
      marketPrice: 68.0,
      epsNoNRI: 2.85,
      bookValuePerShare: 6.3,
      salesPerShare: 10.8,
  // Fetch / Search handler function (Live API + Local Fallback)
  const handleTickerSearch = async (e, overrideTicker = null) => {
    if (e) e.preventDefault();
    const rawTicker = overrideTicker || tickerQuery;
    const cleanTicker = rawTicker.trim().toUpperCase();
    if (!cleanTicker) return;

    setTickerQuery(cleanTicker);
    setIsSearching(true);
    setSearchNotice(null);

    const isB3 = /^[A-Z]{4}(3|4|5|6|11)$/.test(cleanTicker);
    const yahooSymbol = isB3 ? `${cleanTicker}.SA` : cleanTicker;

    try {
      // 1. Tentativa de busca real via API (Brapi para B3 ou Yahoo Finance)
      let livePrice = null;
      let liveName = null;
      let liveEps = null;
      let liveCurrency = isB3 ? 'R$' : '$';

      if (isB3) {
        // Brapi public endpoint (funciona direto no browser e no Windows)
        const res = await fetch(`https://brapi.dev/api/quote/${cleanTicker}?fundamental=true`);
        if (res.ok) {
          const data = await res.json();
          const quote = data.results?.[0];
          if (quote && quote.regularMarketPrice) {
            livePrice = quote.regularMarketPrice;
            liveName = quote.longName || quote.shortName || cleanTicker;
            liveEps = quote.earningsPerShare || null;
          }
        }
      } else {
        // Yahoo Finance endpoint (funciona nativamente no Windows/Tauri/Electron sem CORS)
        const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}`);
        if (res.ok) {
          const data = await res.json();
          const meta = data.chart?.result?.[0]?.meta;
          if (meta && meta.regularMarketPrice) {
            livePrice = meta.regularMarketPrice;
            liveName = meta.longName || meta.shortName || cleanTicker;
            liveCurrency = meta.currency === 'EUR' ? '€' : meta.currency === 'BRL' ? 'R$' : '$';
          }
        }
      }

      const cached = tickerDatabase[cleanTicker];

      if (livePrice !== null) {
        setActiveTicker(cleanTicker);
        setCompanyName(liveName || (cached ? cached.name : `${cleanTicker} Corp.`));
        setCurrency(liveCurrency);
        setMarketPrice(Number(livePrice.toFixed(2)));

        if (cached) {
          setEpsNoNRI(liveEps ? Number(liveEps.toFixed(2)) : cached.epsNoNRI);
          setBookValuePerShare(cached.bookValuePerShare);
          setSalesPerShare(cached.salesPerShare);
          setFcfPerShare(cached.fcfPerShare);
          setNetIncomePerShare(cached.netIncomePerShare);
          setEpsGrowthRate(cached.epsGrowthRate);
          setFcfGrowthRate(cached.fcfGrowthRate);
          setSalesGrowthRate(cached.salesGrowthRate);
          setNetIncomeGrowthRate(cached.netIncomeGrowthRate);
          setMeanPE(cached.meanPE);
          setMeanPB(cached.meanPB);
          setMeanPS(cached.meanPS);
          setWacc(cached.wacc);
          setPerpetualGrowth(cached.perpetualGrowth);
        } else {
          const estimatedEps = liveEps || Number((livePrice * 0.06).toFixed(2));
          setEpsNoNRI(Number(estimatedEps.toFixed(2)));
          setBookValuePerShare(Number((livePrice * 0.35).toFixed(2)));
          setSalesPerShare(Number((livePrice * 0.45).toFixed(2)));
          setFcfPerShare(Number((livePrice * 0.055).toFixed(2)));
          setNetIncomePerShare(Number((livePrice * 0.058).toFixed(2)));
          setEpsGrowthRate(10.0);
          setFcfGrowthRate(9.5);
          setSalesGrowthRate(8.5);
          setNetIncomeGrowthRate(9.0);
          setMeanPE(18.0);
          setMeanPB(3.0);
          setMeanPS(2.2);
          setWacc(isB3 ? 11.5 : 9.0);
          setPerpetualGrowth(2.5);
        }

        setSearchNotice({
          type: 'success',
          text: `Cotação em tempo real obtida para ${cleanTicker}: ${liveCurrency}${livePrice.toFixed(2)}`
        });
        setIsSearching(false);
        return;
      }
    } catch (err) {
      // Falha silenciosa (ex: bloqueio CORS no navegador) -> passa para o banco local
    }

    // 2. Fallback para Base Local ou Estimativa Automática
    const found = tickerDatabase[cleanTicker];

    if (found) {
      setActiveTicker(cleanTicker);
      setCompanyName(found.name);
      setCurrency(found.currency);
      setMarketPrice(found.marketPrice);
      setEpsNoNRI(found.epsNoNRI);
      setBookValuePerShare(found.bookValuePerShare);
      setSalesPerShare(found.salesPerShare);
      setFcfPerShare(found.fcfPerShare);
      setNetIncomePerShare(found.netIncomePerShare);
      setEpsGrowthRate(found.epsGrowthRate);
      setFcfGrowthRate(found.fcfGrowthRate);
      setSalesGrowthRate(found.salesGrowthRate);
      setNetIncomeGrowthRate(found.netIncomeGrowthRate);
      setMeanPE(found.meanPE);
      setMeanPB(found.meanPB);
      setMeanPS(found.meanPS);
      setWacc(found.wacc);
      setPerpetualGrowth(found.perpetualGrowth);
      setSearchNotice({
        type: 'success',
        text: `Dados base carregados para ${cleanTicker} (${found.name}). Na versão Windows (.exe), a cotação atualiza ao vivo.`
      });
    } else {
      const generatedCurrency = isB3 ? 'R$' : '$';
      const dummyBasePrice = isB3 ? 45.0 : 120.0;

      setActiveTicker(cleanTicker);
      setCompanyName(`${cleanTicker} Corporation (Estimativa)`);
      setCurrency(generatedCurrency);
      setMarketPrice(dummyBasePrice);
      setEpsNoNRI(Number((dummyBasePrice * 0.06).toFixed(2)));
      setBookValuePerShare(Number((dummyBasePrice * 0.35).toFixed(2)));
      setSalesPerShare(Number((dummyBasePrice * 0.45).toFixed(2)));
      setFcfPerShare(Number((dummyBasePrice * 0.055).toFixed(2)));
      setNetIncomePerShare(Number((dummyBasePrice * 0.058).toFixed(2)));
      setEpsGrowthRate(10.0);
      setFcfGrowthRate(9.5);
      setSalesGrowthRate(8.5);
      setNetIncomeGrowthRate(9.0);
      setMeanPE(18.0);
      setMeanPB(3.0);
      setMeanPS(2.2);
      setWacc(isB3 ? 11.5 : 9.0);
      setPerpetualGrowth(2.5);
      setSearchNotice({
        type: 'warning',
        text: `Ticker ${cleanTicker} não encontrado na API web (CORS). Estimativas padrão geradas — funciona ao vivo no Windows.`
      });
    }

    setIsSearching(false);
  };

  // Helper function for discounting cash flows over N years
  const calculateDiscountedStream = (initialValue, growthRate, discountRate, years) => {
    let sumPV = 0;
    let currentValue = initialValue;
    const r = discountRate / 100;
    const g = growthRate / 100;
    const yearlyDetails = [];

    for (let i = 1; i <= years; i++) {
      currentValue = currentValue * (1 + g);
      const pv = currentValue / Math.pow(1 + r, i);
      sumPV += pv;
      yearlyDetails.push({ year: i, projected: currentValue, pv });
    }

    return { totalPV: sumPV, yearlyDetails };
  };

  // --- COMPUTE THE 10 VALUATION MODELS ---
  const models = useMemo(() => {
    const discount = wacc / 100;

    // 1. PEG Ratio Without NRI Valuation
    const pegValuation = epsNoNRI * Math.max(0, epsGrowthRate);

    // 2. Mean Price to Book Ratio (P/B Historical Mean)
    const meanPBValuation = bookValuePerShare * meanPB;

    // 3. Mean Price to Earnings Ratio without NRI (P/E Historical Mean)
    const meanPEValuation = epsNoNRI * meanPE;

    // 4. Price to Sales Growth Ratio (PSG Ratio)
    const psgValuation = salesPerShare * Math.max(0, salesGrowthRate);

    // 5. Mean Price to Sales Ratio (P/S Historical Mean)
    const meanPSValuation = salesPerShare * meanPS;

    // 6. DFCF Terminal 20 Anos (sem perpetuidade)
    const dfcf20TerminalStream = calculateDiscountedStream(fcfPerShare, fcfGrowthRate, wacc, 20);
    const dfcfTerminalValuation = dfcf20TerminalStream.totalPV;

    // 7. DFCF 20 Anos (sem valor terminal)
    const dfcf20 = calculateDiscountedStream(fcfPerShare, fcfGrowthRate, wacc, 20);
    const dfcf20Valuation = dfcf20.totalPV;

    // 8. DCF 20 Yrs (Standard DCF 20 Yrs on Earnings/FCF Hybrid)
    const hybridBase = (epsNoNRI + fcfPerShare) / 2;
    const hybridGrowth = (epsGrowthRate + fcfGrowthRate) / 2;
    const dcf20 = calculateDiscountedStream(hybridBase, hybridGrowth, wacc, 20);
    const dcf20Valuation = dcf20.totalPV;

    // 9. Discounted Net Income 20 Yrs
    const dni20 = calculateDiscountedStream(netIncomePerShare, netIncomeGrowthRate, wacc, 20);
    const dni20Valuation = dni20.totalPV;

    // 10. Formula de Graham
    const grahamValuation = (epsNoNRI * (8.5 + 2 * epsGrowthRate) * 4.4) / (aaaYield || 1);

    const list = [
      {
        key: 'peg_no_nri',
        name: '1. PEG Ratio sem NRI',
        shortName: 'PEG sem NRI',
        category: 'Múltiplos / Crescimento',
        intrinsicValue: Math.max(0, pegValuation),
        description: 'Avaliação baseada no P/E igual à taxa de crescimento dos lucros sem itens não recorrentes (PEG = 1.0).',
        formula: 'LPA sem NRI × Taxa de Crescimento do Lucro (%)',
        details: `LPA: ${currency}${epsNoNRI.toFixed(2)} | Crescimento: ${epsGrowthRate}%`
      },
      {
        key: 'mean_pb',
        name: '2. Média Histórica P/B',
        shortName: 'Média P/B',
        category: 'Múltiplos Históricos',
        intrinsicValue: Math.max(0, meanPBValuation),
        description: 'Multiplica o Valor Contábil por Ação pela média histórica do múltiplo Preço/Valor Contábil.',
        formula: 'Valor Contábil por Ação × P/B Médio Histórico',
        details: `VPA: ${currency}${bookValuePerShare.toFixed(2)} | P/B Médio: ${meanPB}x`
      },
      {
        key: 'mean_pe_no_nri',
        name: '3. Média Histórica P/L sem NRI',
        shortName: 'Média P/L sem NRI',
        category: 'Múltiplos Históricos',
        intrinsicValue: Math.max(0, meanPEValuation),
        description: 'Avalia a ação aplicando a média histórica do P/L sobre o Lucro por Ação recorrente.',
        formula: 'LPA sem NRI × P/L Médio Histórico',
        details: `LPA sem NRI: ${currency}${epsNoNRI.toFixed(2)} | P/L Médio: ${meanPE}x`
      },
      {
        key: 'psg_ratio',
        name: '4. Price to Sales Growth (PSG)',
        shortName: 'PSG Ratio',
        category: 'Múltiplos / Crescimento',
        intrinsicValue: Math.max(0, psgValuation),
        description: 'Modelo de crescimento de vendas (PSG = 1.0), multiplicando as vendas por ação pela taxa de crescimento das vendas.',
        formula: 'Vendas por Ação × Taxa de Crescimento de Vendas (%)',
        details: `Vendas/Ação: ${currency}${salesPerShare.toFixed(2)} | Crescimento Vendas: ${salesGrowthRate}%`
      },
      {
        key: 'mean_ps',
        name: '5. Média Histórica P/S',
        shortName: 'Média P/S',
        category: 'Múltiplos Históricos',
        intrinsicValue: Math.max(0, meanPSValuation),
        description: 'Valoração baseada nas vendas por ação multiplicadas pelo múltiplo histórico Preço/Vendas.',
        formula: 'Vendas por Ação × P/S Médio Histórico',
        details: `Vendas/Ação: ${currency}${salesPerShare.toFixed(2)} | P/S Médio: ${meanPS}x`
      },
      {
        key: 'dfcf_terminal',
        name: '6. DFCF 20 Anos',
        shortName: 'DFCF 20 Anos',
        category: 'Fluxo de Caixa Descontado',
        intrinsicValue: Math.max(0, dfcfTerminalValuation),
        description: 'Fluxo de caixa livre projetado a 20 anos descontado ao WACC sem premissa de valor terminal perpétuo.',
        formula: 'Soma do VP de FCF projetado do Ano 1 ao Ano 20',
        details: `FCF Inicial: ${currency}${fcfPerShare.toFixed(2)} | WACC: ${wacc}% | Cresc. FCF: ${fcfGrowthRate}%`
      },
      {
        key: 'dfcf_20yrs',
        name: '7. DFCF 20 Anos (sem valor terminal)',
        shortName: 'DFCF 20 Anos',
        category: 'Fluxo de Caixa Descontado',
        intrinsicValue: Math.max(0, dfcf20Valuation),
        description: 'Projeção rigorosa de 20 anos de Fluxo de Caixa Livre Descontado sem dependência de valor terminal.',
        formula: 'Soma do VP de FCF projetado do Ano 1 ao Ano 20',
        details: `FCF Inicial: ${currency}${fcfPerShare.toFixed(2)} | Cresc. FCF: ${fcfGrowthRate}% | WACC: ${wacc}%`
      },
      {
        key: 'dcf_20yrs',
        name: '8. DCF 20 Anos Híbrido',
        shortName: 'DCF 20 Anos',
        category: 'Fluxo de Caixa Descontado',
        intrinsicValue: Math.max(0, dcf20Valuation),
        description: 'Modelo de desconto composto durante 20 anos combinando lucros e fluxo de caixa livre.',
        formula: 'Soma do VP da Média (Lucro + FCF) projetada por 20 anos',
        details: `Base Híbrida: ${currency}${hybridBase.toFixed(2)} | Cresc. Médio: ${hybridGrowth.toFixed(1)}%`
      },
      {
        key: 'dni_20yrs',
        name: '9. Discounted Net Income 20 Anos',
        shortName: 'Net Income 20A',
        category: 'Desconto de Lucros',
        intrinsicValue: Math.max(0, dni20Valuation),
        description: 'Desconto direto do Lucro Líquido por ação projetado ao longo de um horizonte de 20 anos.',
        formula: 'Soma do VP do Lucro Líquido por Ação projetado (Anos 1-20)',
        details: `Lucro Líq/Ação: ${currency}${netIncomePerShare.toFixed(2)} | Cresc. Lucro: ${netIncomeGrowthRate}%`
      },
      {
        key: 'graham_formula',
        name: '10. Fórmula de Benjamin Graham',
        shortName: 'Fórmula Graham',
        category: 'Value Investing',
        intrinsicValue: Math.max(0, grahamValuation),
        description: 'Fórmula clássica revisada de Graham ajustada pelo rendimento atual de títulos corporativos AAA.',
        formula: '[ LPA × (8.5 + 2g) × 4.4 ] / Yield AAA',
        details: `LPA: ${currency}${epsNoNRI.toFixed(2)} | g: ${epsGrowthRate}% | Yield AAA: ${aaaYield}%`
      }
    ];

    return list.map((m) => {
      const acceptablePrice = m.intrinsicValue * (1 - marginOfSafety / 100);
      const marginVsMarket = ((m.intrinsicValue - marketPrice) / marketPrice) * 100;
      const isUndervalued = marketPrice <= acceptablePrice;
      const isFair = marketPrice > acceptablePrice && marketPrice <= m.intrinsicValue;
      const isOvervalued = marketPrice > m.intrinsicValue;

      return {
        ...m,
        acceptablePrice,
        marginVsMarket,
        isUndervalued,
        isFair,
        isOvervalued
      };
    });
  }, [
    epsNoNRI,
    epsGrowthRate,
    bookValuePerShare,
    meanPB,
    meanPE,
    salesPerShare,
    salesGrowthRate,
    meanPS,
    fcfPerShare,
    fcfGrowthRate,
    wacc,
    perpetualGrowth,
    netIncomePerShare,
    netIncomeGrowthRate,
    aaaYield,
    marketPrice,
    marginOfSafety,
    currency
  ]);

  // Overall Statistics Across All 10 Models
  const overallStats = useMemo(() => {
    const values = models.map((m) => m.intrinsicValue).filter((v) => !isNaN(v) && v > 0);
    const avgIntrinsic = values.reduce((a, b) => a + b, 0) / (values.length || 1);
    const maxIntrinsic = Math.max(...values, 0);
    const minIntrinsic = Math.min(...values, 0);
    const avgAcceptable = avgIntrinsic * (1 - marginOfSafety / 100);
    const avgMarginVsMarket = ((avgIntrinsic - marketPrice) / marketPrice) * 100;

    const undervaluedCount = models.filter((m) => m.isUndervalued).length;
    const fairCount = models.filter((m) => m.isFair).length;
    const overvaluedCount = models.filter((m) => m.isOvervalued).length;

    return {
      avgIntrinsic,
      maxIntrinsic,
      minIntrinsic,
      avgAcceptable,
      avgMarginVsMarket,
      undervaluedCount,
      fairCount,
      overvaluedCount
    };
  }, [models, marketPrice, marginOfSafety]);

  // Selected single model details
  const currentModelObj = useMemo(() => {
    return models.find((m) => m.key === selectedModelKey) || models[0];
  }, [models, selectedModelKey]);

  // Chart Data formatters
  const chartDataBar = useMemo(() => {
    return models.map((m) => ({
      name: m.shortName,
      ValorJusto: Number(m.intrinsicValue.toFixed(2)),
      ComMargem: Number(m.acceptablePrice.toFixed(2))
    }));
  }, [models]);

  const radarData = useMemo(() => {
    return models.map((m) => ({
      model: m.shortName,
      Valor: Number(m.intrinsicValue.toFixed(2)),
      Preco: Number(marketPrice.toFixed(2))
    }));
  }, [models, marketPrice]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Bar Header with Ticker Search */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-cyan-500/20 text-white">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Valuation 10-Models Suite
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
                  {activeTicker}
                </span>
              </div>
              <p className="text-xs text-slate-400">{companyName}</p>
            </div>
          </div>

          {/* Ticker Search Form */}
          <form onSubmit={handleTickerSearch} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar Ticker (ex: AAPL, PETR4)..."
                value={tickerQuery}
                onChange={(e) => setTickerQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-white uppercase tracking-wider transition-all placeholder:normal-case placeholder:font-normal placeholder:text-slate-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50"
            >
              {isSearching ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Search className="w-3.5 h-3.5" />
              )}
              <span>Buscar</span>
            </button>

            {/* Currency Switcher */}
            <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
              {['$', '€', 'R$'].map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    currency === curr ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </form>
        </div>
      </header>

      {/* Search notification alert */}
      {searchNotice && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
            searchNotice.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}>
            <div className="flex items-center gap-2">
              {searchNotice.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{searchNotice.text}</span>
            </div>
            <button onClick={() => setSearchNotice(null)} className="text-slate-400 hover:text-white text-xs font-bold px-2">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Global Market Price & Presets Panel */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Preço de Mercado ({activeTicker})
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                  {currency}
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={marketPrice}
                  onChange={(e) => setMarketPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl pl-9 pr-4 py-3 text-2xl font-bold text-cyan-400 tracking-tight transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Margem de Segurança Solicitada (%)
              </label>
              <div className="flex items-center space-x-3 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3">
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={marginOfSafety}
                  onChange={(e) => setMarginOfSafety(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <span className="text-xl font-bold text-white min-w-[3rem] text-right">{marginOfSafety}%</span>
              </div>
            </div>

            {/* Quick Ticker Chips */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Atalhos Rápidos de Ações
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['AAPL', 'MSFT', 'NVDA', 'PETR4', 'VALE3', 'ITUB4', 'WEGE3', 'KO'].map((tkr) => (
                  <button
                    key={tkr}
                    type="button"
                    onClick={() => handleTickerSearch(null, tkr)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                      activeTicker === tkr 
                        ? 'bg-cyan-500 text-white border-cyan-400 font-bold' 
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                    }`}
                  >
                    <span>{tkr}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Inputs Dashboard Collapsible/Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" /> Parâmetros Financeiros de Entrada ({activeTicker})
            </h2>
            <span className="text-xs text-slate-500">Métricas auto-carregadas ou ajustáveis manualmente</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric Inputs Column 1 */}
            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">Métricas por Ação</span>
              <div>
                <label className="text-[11px] text-slate-400 block">LPA sem NRI ({currency})</label>
                <input
                  type="number"
                  step="0.1"
                  value={epsNoNRI}
                  onChange={(e) => setEpsNoNRI(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">Valor Contábil / Ação ({currency})</label>
                <input
                  type="number"
                  step="0.1"
                  value={bookValuePerShare}
                  onChange={(e) => setBookValuePerShare(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">Vendas / Ação ({currency})</label>
                <input
                  type="number"
                  step="0.1"
                  value={salesPerShare}
                  onChange={(e) => setSalesPerShare(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                />
              </div>
            </div>

            {/* Metric Inputs Column 2 */}
            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">Fluxo de Caixa & Lucro</span>
              <div>
                <label className="text-[11px] text-slate-400 block">FCF por Ação ({currency})</label>
                <input
                  type="number"
                  step="0.1"
                  value={fcfPerShare}
                  onChange={(e) => setFcfPerShare(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">Lucro Líquido por Ação ({currency})</label>
                <input
                  type="number"
                  step="0.1"
                  value={netIncomePerShare}
                  onChange={(e) => setNetIncomePerShare(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">Yield Obrigações AAA (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={aaaYield}
                  onChange={(e) => setAaaYield(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                />
              </div>
            </div>

            {/* Metric Inputs Column 3 */}
            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">Taxas de Crescimento (%)</span>
              <div>
                <label className="text-[11px] text-slate-400 block">Crescimento do Lucro / EPS (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={epsGrowthRate}
                  onChange={(e) => setEpsGrowthRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">Crescimento do FCF (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={fcfGrowthRate}
                  onChange={(e) => setFcfGrowthRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">Crescimento das Vendas (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={salesGrowthRate}
                  onChange={(e) => setSalesGrowthRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                />
              </div>
            </div>

            {/* Metric Inputs Column 4 */}
            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">Múltiplos Históricos & WACC</span>
              <div>
                <label className="text-[11px] text-slate-400 block">P/L Médio (P/E Mean)</label>
                <input
                  type="number"
                  step="0.5"
                  value={meanPE}
                  onChange={(e) => setMeanPE(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">P/B Médio (P/B Mean)</label>
                <input
                  type="number"
                  step="0.1"
                  value={meanPB}
                  onChange={(e) => setMeanPB(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">WACC / Desconto (%)</label>
                <input
                  type="number"
                  step="0.25"
                  value={wacc}
                  onChange={(e) => setWacc(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 space-x-8">
          <button
            onClick={() => setActiveTab('summary')}
            className={`pb-4 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'summary'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Visão Geral & Consenso</span>
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`pb-4 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'comparison'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Matriz Comparativa dos 10 Modelos</span>
          </button>

          <button
            onClick={() => setActiveTab('models')}
            className={`pb-4 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'models'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Detalhamento Modelo a Modelo</span>
          </button>
        </div>

        {/* TAB 1: SUMMARY & CONSENSUS DASHBOARD */}
        {activeTab === 'summary' && (
          <div className="space-y-8">
            {/* Top Cards Consensus Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs text-slate-400 font-semibold block uppercase">Média dos 10 Modelos</span>
                <div className="text-2xl font-bold text-cyan-400 mt-1">
                  {currency}{overallStats.avgIntrinsic.toFixed(2)}
                </div>
                <span className="text-[11px] text-slate-500">Valor Intrínseco Médio</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs text-slate-400 font-semibold block uppercase">Preço Alvo c/ Margem</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1">
                  {currency}{overallStats.avgAcceptable.toFixed(2)}
                </div>
                <span className="text-[11px] text-slate-500">Com margem de {marginOfSafety}%</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs text-slate-400 font-semibold block uppercase">Potencial Médio</span>
                <div className={`text-2xl font-bold mt-1 ${overallStats.avgMarginVsMarket >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {overallStats.avgMarginVsMarket >= 0 ? '+' : ''}{overallStats.avgMarginVsMarket.toFixed(1)}%
                </div>
                <span className="text-[11px] text-slate-500">vs Preço Atual ({currency}{marketPrice.toFixed(2)})</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs text-slate-400 font-semibold block uppercase">Consenso dos 10 Modelos</span>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    {overallStats.undervaluedCount} Sub
                  </span>
                  <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-bold">
                    {overallStats.fairCount} Justo
                  </span>
                  <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-400 text-xs font-bold">
                    {overallStats.overvaluedCount} Sobre
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bar Chart comparing 10 models */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-400" /> Comparativo dos Valor Intrínseco por Modelo ({currency})
                </h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartDataBar} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
                      <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" />
                      <YAxis stroke="#64748b" tickFormatter={(v) => `${currency}${v}`} tick={{ fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem' }}
                        formatter={(val) => [`${currency}${val}`, 'Valor']}
                      />
                      <Bar dataKey="ValorJusto" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Valor Intrínseco" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Radar Chart Dispersion */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-purple-400" /> Dispersão de Valor Intrínseco vs Preço Mercado
                </h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="model" stroke="#94a3b8" tick={{ fontSize: 9 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} stroke="#64748b" />
                      <Radar name="Valor Intrínseco" dataKey="Valor" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                      <Radar name="Preço de Mercado" dataKey="Preco" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FULL COMPARATIVE MATRIX */}
        {activeTab === 'comparison' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Matriz Comparativa dos 10 Modelos ({activeTicker})</h3>
                <p className="text-xs text-slate-400">Visão consolidada do valor calculado, preço com margem e status</p>
              </div>
              <span className="text-xs text-slate-400">Preço Mercado ({activeTicker}): <strong className="text-cyan-400">{currency}{marketPrice.toFixed(2)}</strong></span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Modelo</th>
                    <th className="px-4 py-3">Categoria</th>
                    <th className="px-4 py-3 text-right">Valor Intrínseco</th>
                    <th className="px-4 py-3 text-right">Preço c/ Margem ({marginOfSafety}%)</th>
                    <th className="px-4 py-3 text-right">Margem vs Mercado</th>
                    <th className="px-4 py-3 rounded-r-lg text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {models.map((m) => (
                    <tr key={m.key} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-slate-200">{m.name}</td>
                      <td className="px-4 py-3.5 text-slate-400">{m.category}</td>
                      <td className="px-4 py-3.5 text-right font-bold text-cyan-400">
                        {currency}{m.intrinsicValue.toFixed(2)}
                      </td>
                      <td className="px-4 py-3.5 text-right font-semibold text-emerald-400">
                        {currency}{m.acceptablePrice.toFixed(2)}
                      </td>
                      <td className={`px-4 py-3.5 text-right font-bold ${m.marginVsMarket >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {m.marginVsMarket >= 0 ? '+' : ''}{m.marginVsMarket.toFixed(1)}%
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {m.isUndervalued && (
                          <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[11px] border border-emerald-500/30">
                            Subavaliada
                          </span>
                        )}
                        {m.isFair && (
                          <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-bold text-[11px] border border-amber-500/30">
                            Preço Justo
                          </span>
                        )}
                        {m.isOvervalued && (
                          <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 font-bold text-[11px] border border-rose-500/30">
                            Sobreavaliada
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MODEL BY MODEL DETAILED VIEWS */}
        {activeTab === 'models' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Model Selector Sidebar */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                Selecione o Modelo
              </span>
              {models.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setSelectedModelKey(m.key)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                    selectedModelKey === m.key
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                  }`}
                >
                  <span className="truncate">{m.name}</span>
                  <span className="font-bold ml-2 text-slate-200">{currency}{m.intrinsicValue.toFixed(1)}</span>
                </button>
              ))}
            </div>

            {/* Active Model Detailed View */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">{currentModelObj.category}</span>
                    <h2 className="text-xl font-bold text-white mt-0.5">{currentModelObj.name}</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Valor Intrínseco ({activeTicker})</span>
                    <span className="text-2xl font-bold text-cyan-400">{currency}{currentModelObj.intrinsicValue.toFixed(2)}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentModelObj.description}
                </p>

                {/* Formula Breakdown Card */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Fórmula Matemática</span>
                  <div className="font-mono text-cyan-300 text-sm bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {currentModelObj.formula}
                  </div>
                  <div className="text-xs text-slate-400 pt-1">
                    <strong>Parâmetros Utilizados:</strong> {currentModelObj.details}
                  </div>
                </div>

                {/* Valuation Status comparison card */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">Preço Alvo c/ Margem ({marginOfSafety}%)</span>
                    <div className="text-xl font-bold text-emerald-400 mt-1">
                      {currency}{currentModelObj.acceptablePrice.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">Preço Mercado</span>
                    <div className="text-xl font-bold text-slate-200 mt-1">
                      {currency}{marketPrice.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">Margem vs Mercado</span>
                    <div className={`text-xl font-bold mt-1 ${currentModelObj.marginVsMarket >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {currentModelObj.marginVsMarket >= 0 ? '+' : ''}{currentModelObj.marginVsMarket.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}