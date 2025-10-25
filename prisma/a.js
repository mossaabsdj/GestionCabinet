import { prisma } from "../lib/prisma";
async function main() {
  const meds = [
    {
      nom: "Avastin 400mg Injection",
    },
    {
      nom: "Augmentin 625 Duo Tablet",
    },
    {
      nom: "Azithral 500 Tablet",
    },
    {
      nom: "Ascoril LS Syrup",
    },
    {
      nom: "Aciloc 150 Tablet",
    },
    {
      nom: "Allegra 120mg Tablet",
    },
    {
      nom: "Avil 25 Tablet",
    },
    {
      nom: "Aricep 5 Tablet",
    },
    {
      nom: "Amoxyclav 625 Tablet",
    },
    {
      nom: "Atarax 25mg Tablet",
    },
    {
      nom: "Azee 500 Tablet",
    },
    {
      nom: "Anovate Cream",
    },
    {
      nom: "Allegra-M Tablet",
    },
    {
      nom: "Ascoril D Plus Syrup Sugar Free",
    },
    {
      nom: "Alex Syrup",
    },
    {
      nom: "Armotraz Tablet",
    },
    {
      nom: "Augmentin Duo Oral Suspension",
    },
    {
      nom: "Albendazole 400mg Tablet",
    },
    {
      nom: "Arkamin Tablet",
    },
    {
      nom: "Allegra 180mg Tablet",
    },
    {
      nom: "Altraday Capsule SR",
    },
    {
      nom: "Atarax 10mg Tablet",
    },
    {
      nom: "Aldigesic-SP Tablet",
    },
    {
      nom: "Aldactone Tablet",
    },
    {
      nom: "Aricep 10 Tablet",
    },
    {
      nom: "Aricep-M  Tablet",
    },
    {
      nom: "Andre I-Kul Eye Drop",
    },
    {
      nom: "Anafortan 25 mg/300 mg Tablet",
    },
    {
      nom: "Atarax Syrup",
    },
    {
      nom: "Ambrodil-S Syrup",
    },
    {
      nom: "Asthakind-DX Syrup Sugar Free",
    },
    {
      nom: "Aceclo Plus Tablet",
    },
    {
      nom: "Althrocin 500 Tablet",
    },
    {
      nom: "Asthalin Syrup",
    },
    {
      nom: "Axcer  90mg Tablet",
    },
    {
      nom: "Arachitol 6L Injection",
    },
    {
      nom: "Alfoo 10mg Tablet PR",
    },
    {
      nom: "Azithral 200 Liquid",
    },
    {
      nom: "Acemiz Plus Tablet",
    },
    {
      nom: "Allegra Suspension Raspberry &amp; Vanilla",
    },
    {
      nom: "Alex Junior Syrup",
    },
    {
      nom: "Azicip 500 Tablet",
    },
    {
      nom: "Avil Injection",
    },
    {
      nom: "Aquasol A Capsule",
    },
    {
      nom: "Anobliss Cream",
    },
    {
      nom: "Augmentin DDS Suspension",
    },
    {
      nom: "Almox 500 Capsule",
    },
    {
      nom: "AF Kit Tablet",
    },
    {
      nom: "Ascoril LS Junior Syrup",
    },
    {
      nom: "Asthalin 100mcg Inhaler",
    },
    {
      nom: "Aptimust Syrup",
    },
    {
      nom: "AB Phylline Capsule",
    },
    {
      nom: "Azee 200mg Dry Syrup",
    },
    {
      nom: "Adaferin Gel",
    },
    {
      nom: "Amitone 10mg Tablet",
    },
    {
      nom: "Ambrodil Syrup",
    },
    {
      nom: "AB-Flo-N Tablet",
    },
    {
      nom: "Ascoril LS Drops",
    },
    {
      nom: "Alex Cough Lozenges Lemon Ginger",
    },
    {
      nom: "Atorva 40 Tablet",
    },
    {
      nom: "Aziderm 20% Cream",
    },
    {
      nom: "Ascoril D Junior Cough Syrup",
    },
    {
      nom: "Acogut Tablet",
    },
    {
      nom: "Augmentin 1000 Duo Tablet",
    },
    {
      nom: "Ano Metrogyl Cream",
    },
    {
      nom: "Angispan - TR 2.5mg Capsule",
    },
    {
      nom: "Apdrops Eye Drop",
    },
    {
      nom: "Acivir 400 DT Tablet",
    },
    {
      nom: "Acivir Cream",
    },
    {
      nom: "Avil Injection",
    },
    {
      nom: "Azee 250 Tablet",
    },
    {
      nom: "Aldigesic P 100mg/325mg Tablet",
    },
    {
      nom: "Acitrom 2 Tablet",
    },
    {
      nom: "Alerid Syrup",
    },
    {
      nom: "Atorva Tablet",
    },
    {
      nom: "Azax 500 Tablet",
    },
    {
      nom: "Aztor 10 Tablet",
    },
    {
      nom: "Alciflox D Eye/Ear Drops",
    },
    {
      nom: "Amifru 40 Tablet",
    },
    {
      nom: "Aciloc 300 Tablet",
    },
    {
      nom: "Augmentin 1.2gm Injection",
    },
    {
      nom: "Asthakind Expectorant Sugar Free",
    },
    {
      nom: "Atorva 20 Tablet",
    },
    {
      nom: "AB Phylline SR 200 Tablet",
    },
    {
      nom: "Aricep-M  Forte Tablet",
    },
    {
      nom: "Amaryl 1mg Tablet",
    },
    {
      nom: "Add Tears Lubricant Eye Drop",
    },
    {
      nom: "Aceclo-MR Tablet",
    },
    {
      nom: "Atarax Drops",
    },
    {
      nom: "Ambrodil-LX Syrup",
    },
    {
      nom: "Asthakind-LS Expectorant Cola Sugar Free",
    },
    {
      nom: "Acton-OR Tablet SR",
    },
    {
      nom: "Avamys Nasal Spray",
    },
    {
      nom: "AB Phylline N Tablet",
    },
    {
      nom: "Acenac-P  Tablet",
    },
    {
      nom: "Aldactone 50 Tablet",
    },
    {
      nom: "Alerid Tablet",
    },
    {
      nom: "Aerocort Inhaler",
    },
    {
      nom: "Acemiz-S Tablet",
    },
    {
      nom: "Asthalin Respules",
    },
    {
      nom: "Azeflo Nasal Spray",
    },
    {
      nom: "Ace Proxyvon Tablet",
    },
    {
      nom: "Antiflu 75mg Capsule",
    },
    {
      nom: "Augmentin 375 Tablet",
    },
    {
      nom: "Admenta 5 Tablet",
    },
    {
      nom: "Azmarda 50mg Tablet",
    },
    {
      nom: "Alerid-D Tablet",
    },
    {
      nom: "Aldosmin 500mg Tablet",
    },
    {
      nom: "Allercet-DC Tablet",
    },
    {
      nom: "Amlip 5 Tablet",
    },
    {
      nom: "Acitrom 1 Tablet",
    },
    {
      nom: "AF 400 Tablet",
    },
    {
      nom: "Amlopres-AT Tablet",
    },
    {
      nom: "Aztolet  10 Tablet",
    },
    {
      nom: "Azikem 500mg Tablet",
    },
    {
      nom: "Amlovas 5 Tablet",
    },
    {
      nom: "Acenac-MR Tablet",
    },
    {
      nom: "AF 150 Tablet DT",
    },
    {
      nom: "Atorlip-F Tablet",
    },
    {
      nom: "A-Ret 0.1% Gel",
    },
    {
      nom: "Apdrops PD Eye Drop",
    },
    {
      nom: "AB-Flo Capsule",
    },
    {
      nom: "Amantrel Tablet",
    },
    {
      nom: "Azithral XL 200 Liquid",
    },
    {
      nom: "Aquazide 12.5 Tablet",
    },
    {
      nom: "A-Ret 0.05% Gel",
    },
    {
      nom: "Althrocin 250 Tablet",
    },
    {
      nom: "Alkasol Oral Solution Sugar Free",
    },
    {
      nom: "Ajaduo 25mg/5mg Tablet",
    },
    {
      nom: "Aldosmin 1000mg Tablet",
    },
    {
      nom: "Allegra Nasal Spray",
    },
    {
      nom: "Advent Forte 457mg Syrup Tangy Orange",
    },
    {
      nom: "Andial 2mg Tablet",
    },
    {
      nom: "Alkof DX Syrup",
    },
    {
      nom: "Anafortan Syrup",
    },
    {
      nom: "Amlodac 5 Tablet",
    },
    {
      nom: "Acivir 800 DT Tablet",
    },
    {
      nom: "Amaryl 2mg Tablet",
    },
    {
      nom: "Alaspan AM Tablet",
    },
    {
      nom: "Anabel Liquid Gel",
    },
    {
      nom: "Air-M Tablet",
    },
    {
      nom: "Aziderm 10% Cream",
    },
    {
      nom: "Ace-Proxyvon CR Tablet",
    },
    {
      nom: "Aten 50 Tablet",
    },
    {
      nom: "Asthalin 4 Tablet",
    },
    {
      nom: "Azithral Eye Ointment",
    },
    {
      nom: "Aziwok 500 Tablet",
    },
    {
      nom: "Ambrolite-S Expectorant",
    },
    {
      nom: "AB-Flo SR Tablet",
    },
    {
      nom: "Ambrodil-Plus RF Syrup",
    },
    {
      nom: "Asomex 2.5 Tablet",
    },
    {
      nom: "Amlosafe 3D Tablet",
    },
    {
      nom: "Alkof Syrup",
    },
    {
      nom: "Angiplat 2.5 Capsule TR",
    },
    {
      nom: "Aten 25 Tablet",
    },
    {
      nom: "Admenta 10 Tablet",
    },
    {
      nom: "Aztor 40 Tablet",
    },
    {
      nom: "Alkof Junior Syrup",
    },
    {
      nom: "Azithral 100 Liquid",
    },
    {
      nom: "Azibact 500 Tablet",
    },
    {
      nom: "Amrox-LS Syrup",
    },
    {
      nom: "Abzorb Antifungal Soap",
    },
    {
      nom: "Arip MT 5 Tablet",
    },
    {
      nom: "Axogurd-SR Tablet",
    },
    {
      nom: "Alfusin Tablet PR",
    },
    {
      nom: "ATM 500 Tablet",
    },
    {
      nom: "Alerfix Total Tablet SR",
    },
    {
      nom: "Advent 625 Tablet",
    },
    {
      nom: "Amlovas-AT Tablet",
    },
    {
      nom: "Aziderm 10% Gel",
    },
    {
      nom: "Avil 50mg Tablet",
    },
    {
      nom: "Alivher Tablet",
    },
    {
      nom: "Anafortan Injection",
    },
    {
      nom: "Aprezo 30mg Tablet",
    },
    {
      nom: "Acnesol Gel",
    },
    {
      nom: "Amlopres 5 Tablet",
    },
    {
      nom: "A-Ret 0.025% Gel",
    },
    {
      nom: "Actibile 300 Tablet",
    },
    {
      nom: "Alex Syrup Sugar Free",
    },
    {
      nom: "Azee 100mg Dry Syrup Peppermint",
    },
    {
      nom: "Alex-L Cough Syrup Mango",
    },
    {
      nom: "Amtas 5 Tablet",
    },
    {
      nom: "Amoxyclav 375 Tablet",
    },
    {
      nom: "Arbitel-Trio 50 Tablet ER",
    },
    {
      nom: "Almox 250 Capsule",
    },
    {
      nom: "Amlopres TL Tablet",
    },
    {
      nom: "Asthakind-P Drops",
    },
    {
      nom: "Aztor 20 Tablet",
    },
    {
      nom: "Azulix 1 MF Tablet PR",
    },
    {
      nom: "Aqualube Eye Drop",
    },
    {
      nom: "Ambrolite Syrup",
    },
    {
      nom: "Aztor Asp 75 Capsule",
    },
    {
      nom: "Acuclav 625 Tablet",
    },
    {
      nom: "Ascoril SF Expectorant",
    },
    {
      nom: "Acutret 20 Capsule",
    },
    {
      nom: "Adalene Nanogel Gel",
    },
    {
      nom: "Anorelief Cream",
    },
    {
      nom: "Atorfit CV 10 Capsule",
    },
    {
      nom: "Allercet Cold Tablet",
    },
    {
      nom: "AD 100mg Capsule",
    },
    {
      nom: "Actrapid HM 100IU/ml Penfill",
    },
    {
      nom: "Arpizol 5 Tablet",
    },
    {
      nom: "Alkacip Syrup 100ml for Kidney &amp; Gout Stone",
    },
    {
      nom: "Azulix 2 MF Tablet PR",
    },
    {
      nom: "Azilide 500 Tablet",
    },
    {
      nom: "Atorlip 10 Tablet",
    },
    {
      nom: "Augpen LB 625 Tablet",
    },
    {
      nom: "Aceclo Sera 100mg/325mg/15mg Tablet",
    },
    {
      nom: "Amaryl MV 2mg Tablet SR",
    },
    {
      nom: "Acivir 200 DT Tablet",
    },
    {
      nom: "Amlip AT Tablet",
    },
    {
      nom: "Axcer  90mg Tablet",
    },
    {
      nom: "Acitrom 3 Tablet",
    },
    {
      nom: "Avas 10 Tablet",
    },
    {
      nom: "Air 180 Tablet",
    },
    {
      nom: "Arcalion Tablet",
    },
    {
      nom: "Apigat 2.5 Tablet",
    },
    {
      nom: "Aquasurge  Eye Drop",
    },
    {
      nom: "Aceclo Spas Tablet",
    },
    {
      nom: "Apdrops KT 0.4 Eye Drops BAK Free",
    },
    {
      nom: "Aciloc Injection",
    },
    {
      nom: "Arcolane 2% Scalp Solution",
    },
    {
      nom: "Amnurite  10 Tablet SR",
    },
    {
      nom: "Augpen -DS Suspension",
    },
    {
      nom: "Asthalin Respirator Solution",
    },
    {
      nom: "Atchol-F Tablet",
    },
    {
      nom: "Asthalin AX Syrup",
    },
    {
      nom: "Alensol-D Tablet",
    },
    {
      nom: "Atorva 80 Tablet",
    },
    {
      nom: "Artificial Tears BP Eye Drop",
    },
    {
      nom: "Alciflox 500mg Tablet",
    },
    {
      nom: "Amitop 10 Tablet",
    },
    {
      nom: "Atonide Gel",
    },
    {
      nom: "Ambrodil-D Syrup",
    },
    {
      nom: "Allercet Tablet",
    },
    {
      nom: "Apidra 100IU Cartridge",
    },
    {
      nom: "Aquim PF Eye Drop",
    },
    {
      nom: "Andre Plus Eye Drops",
    },
    {
      nom: "Acamprol Tablet",
    },
    {
      nom: "Amitryn 10 Tablet",
    },
    {
      nom: "Acnesol A Nano Gel",
    },
    {
      nom: "Acular LS Ophthalmic Solution",
    },
    {
      nom: "Acupat Ophthalmic Solution",
    },
    {
      nom: "Adilip 135 Tablet DR",
    },
    {
      nom: "Augpen 625 BID Tablet",
    },
    {
      nom: "Allercet-M Tablet",
    },
    {
      nom: "Arip MT 2 Tablet",
    },
    {
      nom: "Aztolet  20 Tablet",
    },
    {
      nom: "Acceclowoc-P Tablet",
    },
    {
      nom: "Ascoril Plus Expectorant",
    },
    {
      nom: "Amaryl MV 1mg Tablet SR",
    },
    {
      nom: "Alfusin D Tablet ER",
    },
    {
      nom: "Altraz Tablet",
    },
    {
      nom: "Acivir Cream",
    },
    {
      nom: "Atropine 1% Eye Drop",
    },
    {
      nom: "Aquaviron Injection 1ml",
    },
    {
      nom: "Acera-D Capsule SR",
    },
    {
      nom: "Atormac CV10 Capsule",
    },
    {
      nom: "Alphadol 0.25mcg Capsule",
    },
    {
      nom: "Ajaduo 10mg/5mg Tablet",
    },
    {
      nom: "Apdrops DM Eye Drop",
    },
    {
      nom: "Arbitel-Trio 25 Tablet ER",
    },
    {
      nom: "Amicline Plus Tablet",
    },
    {
      nom: "Amlokind-L Tablet",
    },
    {
      nom: "Amrolstar Nail Lacquer",
    },
    {
      nom: "Amnurite  5 mg/1500 mcg Tablet",
    },
    {
      nom: "Acuvert Tablet",
    },
    {
      nom: "Ambrodil Drop",
    },
    {
      nom: "Azmarda 100mg Tablet",
    },
    {
      nom: "Alzil-M 5 Tablet",
    },
    {
      nom: "Amicon 10 Tablet",
    },
    {
      nom: "Asomex 5 Tablet",
    },
    {
      nom: "Althrocin Liquid",
    },
    {
      nom: "Albucel 20% Infusion",
    },
    {
      nom: "Apigat 5 Tablet",
    },
    {
      nom: "Amlong 2.5 Tablet",
    },
    {
      nom: "Anxiset 0.5 Tablet",
    },
    {
      nom: "All 9 NVP Tablet",
    },
    {
      nom: "Angiwell 2.6mg Tablet",
    },
    {
      nom: "Almefkem Spas 10mg/250mg Tablet",
    },
    {
      nom: "Azax 250 Tablet",
    },
    {
      nom: "Amlong-A Tablet",
    },
    {
      nom: "Aceclo Tablet",
    },
    {
      nom: "Acimol Forte 100mg/325mg/15mg Tablet",
    },
    {
      nom: "Acitrom 4 Tablet",
    },
    {
      nom: "Aprecap 125/80 Capsule",
    },
    {
      nom: "Anasure 5% Solution",
    },
    {
      nom: "Adaple-C Gel",
    },
    {
      nom: "Akilos-P Tablet",
    },
    {
      nom: "Azopt Opthalmic Suspension",
    },
    {
      nom: "Amrolstar Cream",
    },
    {
      nom: "Anosum Cream",
    },
    {
      nom: "AF 200 Tablet",
    },
    {
      nom: "Amlong 10 Tablet",
    },
    {
      nom: "Azee XL 200mg Dry Syrup Peppermint",
    },
    {
      nom: "Acenext P 100mg/325mg Tablet",
    },
    {
      nom: "Amlopin 5 Tablet",
    },
    {
      nom: "Amlogard 5mg Tablet",
    },
    {
      nom: "Arpizol 10 Tablet",
    },
    {
      nom: "Azibact LR 100 Readymix",
    },
    {
      nom: "Amicline Tablet",
    },
    {
      nom: "Arpizol 2mg Tablet",
    },
    {
      nom: "Acutret 10 Capsule",
    },
    {
      nom: "Amaryl M Forte 2mg Tablet PR",
    },
    {
      nom: "Ampilox DS Tablet",
    },
    {
      nom: "Alzil 5 Tablet",
    },
    {
      nom: "Azoran 25 Tablet",
    },
    {
      nom: "Angicam-Beta Tablet",
    },
    {
      nom: "Altonil 5 Tablet MD",
    },
    {
      nom: "Abd 400mg Tablet",
    },
    {
      nom: "Amlosafe TM 40 Tablet",
    },
    {
      nom: "Anxipan Capsule",
    },
    {
      nom: "Amtas-AT Tablet",
    },
    {
      nom: "Azimax 500 Tablet",
    },
    {
      nom: "Aztogold 20 Capsule",
    },
    {
      nom: "Aldactone 100 Tablet",
    },
    {
      nom: "Amitone 25mg Tablet",
    },
    {
      nom: "Acimol-SP Tablet",
    },
    {
      nom: "Afdura Tablet ER",
    },
    {
      nom: "Aceclo SR Tablet",
    },
    {
      nom: "Acrotac 25mg Capsule",
    },
    {
      nom: "Air 120 Tablet",
    },
    {
      nom: "Alight Plus Gel 15gm for Acne Treatment",
    },
    {
      nom: "Asthakind-DX Syrup Sugar Free",
    },
    {
      nom: "Avas CV 10 Capsule",
    },
    {
      nom: "AB Phylline Syrup",
    },
    {
      nom: "Amlokind-H Tablet",
    },
    {
      nom: "Amtas-M 50 Tablet PR",
    },
    {
      nom: "Aclind BP 2.5% Gel",
    },
    {
      nom: "Aprezo 10 Tablet",
    },
    {
      nom: "Arbitel-AM Tablet",
    },
    {
      nom: "Anabel-CT Gel",
    },
    {
      nom: "Anafortan-MF 50mg/250mg Tablet",
    },
    {
      nom: "Acnedap Gel",
    },
    {
      nom: "Aziderm 20% Gel",
    },
    {
      nom: "Asthakind-LS Junior Expectorant",
    },
    {
      nom: "Atonide Cream",
    },
    {
      nom: "Ampoxin 250 Capsule",
    },
    {
      nom: "Ascoril Flu Drops",
    },
    {
      nom: "Aerodil  Expectorant",
    },
    {
      nom: "Alevo 500 Tablet",
    },
    {
      nom: "Amaryl M Forte 1mg Tablet PR",
    },
    {
      nom: "Acimol MR 100mg/325mg/250mg Tablet",
    },
    {
      nom: "Anfoe 10000IU Injection",
    },
    {
      nom: "Acnovate Gel",
    },
    {
      nom: "Alcarex Eye Drop",
    },
    {
      nom: "Alex-L Cough Syrup Mango Sugar Free",
    },
    {
      nom: "Azifast 500 Tablet",
    },
    {
      nom: "Azivent 500 Tablet",
    },
    {
      nom: "Amlong-H Tablet",
    },
    {
      nom: "Ambrolite Levo Syrup",
    },
    {
      nom: "Anaflam TH  4  Tablet",
    },
    {
      nom: "Alex P Syrup",
    },
    {
      nom: "Amlopres AT 25 Tablet",
    },
    {
      nom: "AB-Next Gel",
    },
    {
      nom: "Airz Capsule",
    },
    {
      nom: "Amrox Syrup",
    },
    {
      nom: "Alkasol Oral Solution Sugar Free",
    },
    {
      nom: "Atchol-ASP Capsule",
    },
    {
      nom: "Amlovas-M 5/50 Tablet PR",
    },
    {
      nom: "Atchol 40 Tablet",
    },
    {
      nom: "Arflur 3D Tablet",
    },
    {
      nom: "Aerocort Forte Rotacap",
    },
    {
      nom: "Aginal-AT Tablet",
    },
    {
      nom: "Azibact 200 Readymix Oral Suspension",
    },
    {
      nom: "Asprito 2 Tablet",
    },
    {
      nom: "Altacef 500 Tablet",
    },
    {
      nom: "Airz-FF Capsule",
    },
    {
      nom: "Advent 228.5mg Dry Syrup Tangy Orange",
    },
    {
      nom: "Azithral-XL 100 Liquid",
    },
    {
      nom: "Amlong MT 50 Tablet PR",
    },
    {
      nom: "Actrapid 100 IU/ml Flexpen",
    },
    {
      nom: "Acamptas 333 Tablet",
    },
    {
      nom: "Acinil-O Oral Suspension",
    },
    {
      nom: "AF-K Lotion",
    },
    {
      nom: "Anafortan Drop",
    },
    {
      nom: "Anti-Thyrox 10 Tablet",
    },
    {
      nom: "Amyclox-LB Capsule",
    },
    {
      nom: "Alphagan Z Ophthalmic Solution",
    },
    {
      nom: "Azithral Eye Drop",
    },
    {
      nom: "Addphos Granules",
    },
    {
      nom: "Azulix 1 Tablet",
    },
    {
      nom: "Aricep 23 SR Tablet",
    },
    {
      nom: "Aceloflam Plus Tablet",
    },
    {
      nom: "Amantex Tablet",
    },
    {
      nom: "Altonil 5mg Tablet",
    },
    {
      nom: "AZR Tablet",
    },
    {
      nom: "Aquazide 25 Tablet",
    },
    {
      nom: "Asthalin Plus Expectorant",
    },
    {
      nom: "Axalin  Expectorant",
    },
    {
      nom: "Aquasurge  Max Eye Drop",
    },
    {
      nom: "Ambrodil-LX Drop",
    },
    {
      nom: "Aldonil Tablet",
    },
    {
      nom: "Alcros 100 Capsule",
    },
    {
      nom: "Aspisol 75 Tablet",
    },
    {
      nom: "Advent 228.5mg Dry Syrup",
    },
    {
      nom: "Atorfit CV 20 Capsule",
    },
    {
      nom: "Atchol 20 Tablet",
    },
    {
      nom: "Anafortan N 100 mg/50 mg Tablet",
    },
    {
      nom: "Amlovas H  Tablet",
    },
    {
      nom: "Axogurd NT Tablet SR",
    },
    {
      nom: "Azulix 2 MF Forte Tablet PR",
    },
    {
      nom: "Aztor 80 Tablet",
    },
    {
      nom: "Abel 40 Tablet",
    },
    {
      nom: "Ambrolite 2S Expectorant",
    },
    {
      nom: "Amlodac 2.5 Tablet",
    },
    {
      nom: "Amlokind 2.5 Tablet",
    },
    {
      nom: "ATM 200 Oral Suspension",
    },
    {
      nom: "Actibile 150 Tablet",
    },
    {
      nom: "Atorlip 20 Tablet",
    },
    {
      nom: "Aristogyl 400 Tablet",
    },
    {
      nom: "Aplazar Tablet",
    },
    {
      nom: "Avas 40 Tablet",
    },
    {
      nom: "Acemyoset Tablet SR",
    },
    {
      nom: "Amiject 500mg Injection",
    },
    {
      nom: "Amplinak Ophthalmic Suspension",
    },
    {
      nom: "Aziderm 15% Gel",
    },
    {
      nom: "Acnetor AD Gel",
    },
    {
      nom: "Acotibien 100mg Tablet",
    },
    {
      nom: "Arflur-P Tablet",
    },
    {
      nom: "Alfakit Tablet",
    },
    {
      nom: "Atocor-F Tablet",
    },
    {
      nom: "Amrosys Cream",
    },
    {
      nom: "AD 10mg Sachet",
    },
    {
      nom: "Aldonil OD Tablet",
    },
    {
      nom: "Anthocyn-TX Tablet",
    },
    {
      nom: "Alcoliv Tablet",
    },
    {
      nom: "Acenac Tablet",
    },
    {
      nom: "Acetik Ear Drop",
    },
    {
      nom: "Advent 91.4mg Drops Tangy Orange",
    },
    {
      nom: "Acnelak-CLZ Cream",
    },
    {
      nom: "ATM 100 Oral Suspension",
    },
    {
      nom: "Aprezo 20 Tablet",
    },
    {
      nom: "Arbitel-MT 50 Tablet ER",
    },
    {
      nom: "Ascovent -SR Tablet",
    },
    {
      nom: "Azulix 3 MF Tablet PR",
    },
    {
      nom: "Actoid 25mg Capsule",
    },
    {
      nom: "Atorva 5 Tablet",
    },
    {
      nom: "Amitax 500mg Injection",
    },
    {
      nom: "Amlovas 2.5 Tablet",
    },
    {
      nom: "Asomex-AT Tablet",
    },
    {
      nom: "Arvast 10 Tablet",
    },
    {
      nom: "Atocor 40 Tablet",
    },
    {
      nom: "Alcros 200 Capsule",
    },
    {
      nom: "Azapure Tablet",
    },
    {
      nom: "Amaryl 3mg Tablet",
    },
    {
      nom: "Allrite DC Tablet ER",
    },
    {
      nom: "Apraize 30 Tablet",
    },
    {
      nom: "Aravon Injection",
    },
    {
      nom: "Atorva Gold 20 Capsule",
    },
    {
      nom: "Asthakind-LS Drop",
    },
    {
      nom: "Alastin 10mg Tablet",
    },
    {
      nom: "Addkay Tablet PR",
    },
    {
      nom: "Aten-D Tablet",
    },
    {
      nom: "Acnicin Gel",
    },
    {
      nom: "Alkamed Syrup",
    },
    {
      nom: "Acnesol 1% solution",
    },
    {
      nom: "Astymin-SN Infusion",
    },
    {
      nom: "AF 300 Tablet",
    },
    {
      nom: "Acecloren Tablet",
    },
    {
      nom: "Atormac 10 Tablet",
    },
    {
      nom: "Ambrican 5 Tablet",
    },
    {
      nom: "Azeflo FT Nasal Spray",
    },
    {
      nom: "Arachitol 3L Injection",
    },
    {
      nom: "Acivir IV Injection",
    },
    {
      nom: "Asthalin 2 Tablet",
    },
    {
      nom: "Alex Cough Lozenges Sugar Free",
    },
    {
      nom: "Aziwok 250 Tablet",
    },
    {
      nom: "Azibest 500mg Tablet",
    },
    {
      nom: "Amifru Plus Tablet",
    },
    {
      nom: "Amcard-AT Tablet",
    },
    {
      nom: "Amcard 5 Tablet",
    },
    {
      nom: "Amlopin-M Tablet PR",
    },
    {
      nom: "Atorlip 40 Tablet",
    },
    {
      nom: "Atorva TG Tablet",
    },
    {
      nom: "Airz-F Capsule",
    },
    {
      nom: "Ageless Tablet",
    },
    {
      nom: "Ambrodil Tablet",
    },
    {
      nom: "Asthakind Tablet",
    },
    {
      nom: "Analiv 500 Tablet",
    },
    {
      nom: "Arbitel-H Tablet",
    },
    {
      nom: "Alcinac P 100mg/325mg Tablet",
    },
    {
      nom: "Amlodac AT Tablet",
    },
    {
      nom: "Albutamol Neo Syrup",
    },
    {
      nom: "Apgel",
    },
    {
      nom: "Albrim T Eye Drop",
    },
    {
      nom: "Amnurite Beta 10/40 ER Tablet",
    },
    {
      nom: "Aten AM Tablet",
    },
    {
      nom: "Anin 500mg Injection",
    },
    {
      nom: "Anozest Cream",
    },
    {
      nom: "Acidose 500mg Tablet",
    },
    {
      nom: "Alerid Cold Tablet",
    },
    {
      nom: "Altonil Syrup",
    },
    {
      nom: "Alex Plus Paediatric Oral Drops",
    },
    {
      nom: "Arifine 2.5 Tablet",
    },
    {
      nom: "Augpen HS 200 mg/28.5 mg Suspension",
    },
    {
      nom: "Adiff Gel",
    },
    {
      nom: "Apidra 100IU/ml Solution for Injection",
    },
    {
      nom: "Azulix 2 Tablet",
    },
    {
      nom: "Aztogold 10 Capsule",
    },
    {
      nom: "Atazis 25mg Tablet",
    },
    {
      nom: "Alerfix-M Tablet",
    },
    {
      nom: "Angispan-TR 6.5mg Capsule",
    },
    {
      nom: "Asthalin Rotacaps",
    },
    {
      nom: "Altiva 120mg Tablet",
    },
    {
      nom: "Assurans Tablet",
    },
    {
      nom: "Azulix 1 MF Forte Tablet PR",
    },
    {
      nom: "Acnesol-NC Gel",
    },
    {
      nom: "Alkazip Syrup",
    },
    {
      nom: "Atorva Gold 10 Capsule",
    },
    {
      nom: "Alides 5mg Tablet",
    },
    {
      nom: "Atormac Gold 20 Capsule",
    },
    {
      nom: "Azenam 1gm Injection",
    },
    {
      nom: "Alnitro 2.6 Tablet CR",
    },
    {
      nom: "Advanced LCF Kid Expectorant",
    },
    {
      nom: "Abhayrab-PF Vaccine",
    },
    {
      nom: "Absenz Syrup",
    },
    {
      nom: "Arbitel-MT 25 Tablet ER",
    },
    {
      nom: "Allercet-L Tablet",
    },
    {
      nom: "Aisa  Tablet",
    },
    {
      nom: "Acrotac 10mg Capsule",
    },
    {
      nom: "Amlosafe MT 50 Tablet PR",
    },
    {
      nom: "Apetamin Syrup",
    },
    {
      nom: "Aztor EZ Tablet",
    },
    {
      nom: "Amodep-TM Tablet",
    },
    {
      nom: "Axcer  60mg Tablet",
    },
    {
      nom: "Acnetoin Gel",
    },
    {
      nom: "Amlokind-Beta 50 Tablet PR",
    },
    {
      nom: "Atorlip Gold 20 Capsule",
    },
    {
      nom: "Amrolstar Cream",
    },
    {
      nom: "Avoprost D 8mg/0.5mg Capsule",
    },
    {
      nom: "Amlip 2.5 Tablet",
    },
    {
      nom: "Atocor-CV 10 Capsule",
    },
    {
      nom: "Anleo-DSR Capsule",
    },
    {
      nom: "Arigaba Ointment",
    },
    {
      nom: "Acetik-HC Ear Drop",
    },
    {
      nom: "Amnuring 10 Tablet SR",
    },
    {
      nom: "Arbitel-CT 40 Tablet",
    },
    {
      nom: "Arkamin H Tablet",
    },
    {
      nom: "Actapro Tablet",
    },
    {
      nom: "Amlopres 2.5 Tablet",
    },
    {
      nom: "Alphagan Eye Drop",
    },
    {
      nom: "Ara Eye Gel",
    },
    {
      nom: "A Ret HC Cream",
    },
    {
      nom: "Atrodex-C Eye Drop",
    },
    {
      nom: "Ark-AP Tablet",
    },
    {
      nom: "Avas CV 20 Capsule",
    },
    {
      nom: "Advastat 10 Tablet",
    },
    {
      nom: "Arbitel-AV Tablet",
    },
    {
      nom: "Amicin 500mg Injection",
    },
    {
      nom: "Alfalog Tablet",
    },
    {
      nom: "Afderm-MN + Cream",
    },
    {
      nom: "Abz 400mg Tablet",
    },
    {
      nom: "Ampilox CV 500 mg/125 mg Tablet",
    },
    {
      nom: "Asomex-TM Tablet",
    },
    {
      nom: "Amtas-M 25 Tablet PR",
    },
    {
      nom: "Adilip 45 Tablet DR",
    },
    {
      nom: "Amlip 10 Tablet",
    },
    {
      nom: "Anfoe 4000IU Injection",
    },
    {
      nom: "Ace Revelol 25/2.5 Tablet ER",
    },
    {
      nom: "Aldigesic-Rab Capsule SR",
    },
    {
      nom: "Agna 25000 Capsule DR",
    },
    {
      nom: "Amlong-TL 40 Tablet",
    },
    {
      nom: "Ambrodil-XP Syrup",
    },
    {
      nom: "Amclaid 625 Tablet",
    },
    {
      nom: "Anti-Thyrox 5 Tablet",
    },
    {
      nom: "Acnedap Plus Gel",
    },
    {
      nom: "Asklerol 3% Injection",
    },
    {
      nom: "Agna 10000 Capsule DR",
    },
    {
      nom: "Azee 250 Tablet",
    },
    {
      nom: "Angizem CD 90 Capsule ER",
    },
    {
      nom: "Amlong A-25 Tablet",
    },
    {
      nom: "Arzep Nasal Spray",
    },
    {
      nom: "Alrista SR Tablet",
    },
    {
      nom: "Allenza Tablet",
    },
    {
      nom: "Azithral 500mg Injection",
    },
    {
      nom: "Aloja 25 Tablet",
    },
    {
      nom: "Actiheal-D Tablet",
    },
    {
      nom: "Anin Tablet",
    },
    {
      nom: "Atormac Gold 10 Capsule",
    },
    {
      nom: "Advent 457mg Tablet DT",
    },
    {
      nom: "Alkepin Odt 12.5mg Tablet",
    },
    {
      nom: "Aceret 25 Capsule",
    },
    {
      nom: "Azelast Nasal Spray",
    },
    {
      nom: "Amlopin-AT Tablet",
    },
    {
      nom: "Alorti Tablet",
    },
    {
      nom: "Alkanil Syrup",
    },
    {
      nom: "Asthalin DX Syrup",
    },
    {
      nom: "Aziwok-XL 200 Liquid",
    },
    {
      nom: "Avapar Tablet",
    },
    {
      nom: "Atropine Sulphate 1% Eye Ointment",
    },
    {
      nom: "Amlopres L Tablet",
    },
    {
      nom: "Acutrol C 400 Tablet",
    },
    {
      nom: "Aldigesic Spas 80mg/100mg Tablet",
    },
    {
      nom: "Azmarda 200mg Tablet",
    },
    {
      nom: "Apresol Plus Tablet",
    },
    {
      nom: "Azee 1000 Tablet",
    },
    {
      nom: "Angistat 2.5 Capsule TR",
    },
    {
      nom: "ATR-F Tablet",
    },
    {
      nom: "Ambronac Tablet",
    },
    {
      nom: "Agoprex Tablet",
    },
    {
      nom: "Acton Prolongatum 60IU Injection",
    },
    {
      nom: "Alphagan P Eye Drop",
    },
    {
      nom: "Aggramed 5mg Infusion",
    },
    {
      nom: "Azulix 4 MF Tablet PR",
    },
    {
      nom: "Ara Eye Drop",
    },
    {
      nom: "Amlodac-D Tablet SR",
    },
    {
      nom: "Arophyll HD 10mg/120mg/200mg Tablet",
    },
    {
      nom: "Anfoe 6000IU Injection",
    },
    {
      nom: "Asthakind Expectorant Sugar Free",
    },
    {
      nom: "Atorfit 10 Tablet",
    },
    {
      nom: "Algest SR 200 Tablet",
    },
    {
      nom: "Atorbest 10 Tablet",
    },
    {
      nom: "Aciloc Only Oral Liquid",
    },
    {
      nom: "Amlokind 10mg Tablet",
    },
    {
      nom: "Atrest 25 Tablet",
    },
    {
      nom: "Alcaft Eye Drop",
    },
    {
      nom: "Atocor 80 Tablet",
    },
    {
      nom: "Acemiz 100mg Tablet",
    },
    {
      nom: "Alerfix Tablet",
    },
    {
      nom: "Aerodil-LS Expectorant",
    },
    {
      nom: "Airtec FB 400 Instacap",
    },
    {
      nom: "Anaero Gel",
    },
    {
      nom: "Asunra 400mg Tablet",
    },
    {
      nom: "Airtec FB 200 Instacap",
    },
    {
      nom: "AF 50 Tablet DT",
    },
    {
      nom: "Ancool  SF Suspension",
    },
    {
      nom: "Azicip 250 Tablet",
    },
    {
      nom: "Apidra Solostar 100IU/ml Injection",
    },
    {
      nom: "Advent Forte 457mg Syrup Tangy Orange",
    },
    {
      nom: "Amipride 50 Tablet",
    },
    {
      nom: "Addwet Eye Drop",
    },
    {
      nom: "Alastin AM Tablet",
    },
    {
      nom: "Amide 25 Tablet",
    },
    {
      nom: "Alfugress Tablet PR",
    },
    {
      nom: "Azulix MV 2/0.2 Tablet SR",
    },
    {
      nom: "Aceron TC Tablet",
    },
    {
      nom: "Aldonil Plus Tablet SR",
    },
    {
      nom: "Amtas-AT 25 Tablet",
    },
    {
      nom: "Ace-Proxyvon SP Tablet",
    },
    {
      nom: "Amlopres Trio Tablet",
    },
    {
      nom: "Anthocyn-TX Cream",
    },
    {
      nom: "Axinerve-P Tablet SR",
    },
    {
      nom: "Apraize 10 Tablet",
    },
    {
      nom: "Altacef Suspension",
    },
    {
      nom: "Acutret 5 Capsule",
    },
    {
      nom: "Anglit 2.6 Tablet CR",
    },
    {
      nom: "Amiodar 200 Tablet",
    },
    {
      nom: "Atorsave 10 Tablet",
    },
    {
      nom: "Acitrom 0.5 Tablet",
    },
    {
      nom: "Amortas Cream",
    },
    {
      nom: "Astin CV 10 Capsule",
    },
    {
      nom: "Amlovas-AT 25 Tablet",
    },
    {
      nom: "Asomex-D Tablet",
    },
    {
      nom: "Azulix MV 2mg/500mg/0.3mg Tablet SR",
    },
    {
      nom: "Azibact 100 Readymix Oral Suspension",
    },
    {
      nom: "Auradex 4mg Tablet",
    },
    {
      nom: "Alrista Plus Tablet SR",
    },
    {
      nom: "Aciloc-S Suspension Sugar Free",
    },
    {
      nom: "Amlodac 10 Tablet",
    },
    {
      nom: "Azifast Gel",
    },
    {
      nom: "Allerkast LC Tablet",
    },
    {
      nom: "Aquaray Plus  Eye Drop",
    },
    {
      nom: "Amrobrut Cream",
    },
    {
      nom: "Aerodil-DX Syrup Raspberry Sugar Free",
    },
    {
      nom: "Arpizol 15 Tablet",
    },
    {
      nom: "Amfy V  Vaginal gel",
    },
    {
      nom: "Ace Proxyvon TH 4 Tablet",
    },
    {
      nom: "Aim7 60 XR Tablet",
    },
    {
      nom: "Atorlip-ASP 10 Capsule",
    },
    {
      nom: "Acocontin Tablet CR",
    },
    {
      nom: "Abirapro 250mg Tablet",
    },
    {
      nom: "Alpostin 500mcg Injection",
    },
    {
      nom: "Atorfit CV 40 Capsule",
    },
    {
      nom: "Advastat F 160mg/10mg Tablet",
    },
    {
      nom: "Arvast-CF 10 Capsule DR",
    },
    {
      nom: "Arip MT 15 Tablet",
    },
    {
      nom: "Amorfine Cream",
    },
    {
      nom: "Atocor 10 Tablet",
    },
    {
      nom: "Amloz AT Tablet",
    },
    {
      nom: "Azifast 250 Tablet",
    },
    {
      nom: "Acotrust  Tablet",
    },
    {
      nom: "Anabrez Tablet",
    },
    {
      nom: "Amfy Gel",
    },
    {
      nom: "Amlodac T 40 mg/5 mg Tablet",
    },
    {
      nom: "Almotan 6.25 Tablet",
    },
    {
      nom: "Arpimune ME 100mg Capsule",
    },
    {
      nom: "Ampilox-LB Capsule",
    },
    {
      nom: "Adgaba Gel",
    },
    {
      nom: "Atorlip-ASP 20 Capsule",
    },
    {
      nom: "Ampoxin-CV 500mg/125mg Tablet",
    },
    {
      nom: "Ambrolite Cold Syrup",
    },
    {
      nom: "Azildac 40 Tablet",
    },
    {
      nom: "Atorlip CV Capsule",
    },
    {
      nom: "Amtas 2.5 Tablet",
    },
    {
      nom: "Abendol Plus 12mg/400mg Tablet",
    },
    {
      nom: "Azithral XL 200 Liquid",
    },
    {
      nom: "Angiplat 6.5 Capsule TR",
    },
    {
      nom: "Amace Tablet",
    },
    {
      nom: "Alkazar Liquid",
    },
    {
      nom: "Anti-Thyrox 20 Tablet",
    },
    {
      nom: "Actoid 10 Capsule",
    },
    {
      nom: "Acera 20 Capsule",
    },
    {
      nom: "Advan-THF Cream",
    },
    {
      nom: "Axogurd  Capsule",
    },
    {
      nom: "Amlodac M Tablet PR",
    },
    {
      nom: "Amtas 10 Tablet",
    },
    {
      nom: "Alenix 5 Tablet",
    },
    {
      nom: "Arigaba NT 100 Tablet",
    },
    {
      nom: "Adilin 40mg Tablet SR",
    },
    {
      nom: "Amlopres 10 Tablet",
    },
    {
      nom: "Aplevant 0.75mg Pre-filled Pen",
    },
    {
      nom: "Arzu 10 Tablet",
    },
    {
      nom: "Acemyoset P Tablet",
    },
    {
      nom: "Alcinac MR Tablet",
    },
    {
      nom: "Abpress Eye Drop",
    },
    {
      nom: "Acnewar Plus Gel",
    },
    {
      nom: "Altacef 250mg Tablet",
    },
    {
      nom: "Azee 100mg Tablet DT",
    },
    {
      nom: "Amdepin 5 Tablet",
    },
    {
      nom: "Auxisoda Tablet",
    },
    {
      nom: "Asolt-AT Tablet",
    },
    {
      nom: "Averzine 25mg Tablet",
    },
    {
      nom: "Amonext Cream",
    },
    {
      nom: "Amnurite  25 Tablet SR",
    },
    {
      nom: "Aceloflam Plus Tablet",
    },
    {
      nom: "Afogatran 110 Capsule",
    },
    {
      nom: "Atrest 12.5 Tablet",
    },
    {
      nom: "Amlodac CH Tablet",
    },
    {
      nom: "Arkapres 100 Tablet",
    },
    {
      nom: "Acnewar Gel",
    },
    {
      nom: "Atorsave CV 10 Capsule",
    },
    {
      nom: "Atorec 10 Tablet",
    },
    {
      nom: "Azee XL 100mg Dry Syrup Peppermint",
    },
    {
      nom: "Advent 1.2gm  Injection",
    },
    {
      nom: "Adine-Plus Tablet",
    },
    {
      nom: "Arigaba NT Tablet",
    },
    {
      nom: "Apraize 20 Tablet",
    },
    {
      nom: "Arbitel-AMH Tablet",
    },
    {
      nom: "Acemiz 200 SR Tablet",
    },
    {
      nom: "Amisant 200 Tablet",
    },
    {
      nom: "Arvast F 10 Tablet",
    },
    {
      nom: "Abmac Tablet",
    },
    {
      nom: "Acendol-R Capsule SR",
    },
    {
      nom: "Asar 40 Tablet",
    },
    {
      nom: "Acutret 30 Capsule",
    },
    {
      nom: "Azimax 250 Tablet",
    },
    {
      nom: "Amlosafe H Tablet",
    },
    {
      nom: "Acera-L Capsule SR",
    },
    {
      nom: "Anaflam XP 100mg/325mg Tablet",
    },
    {
      nom: "Amluck Cream",
    },
    {
      nom: "Amlogard 10mg Tablet",
    },
    {
      nom: "Azithral KidTab",
    },
    {
      nom: "Atorec-F Tablet",
    },
    {
      nom: "Amlovas-L Tablet",
    },
    {
      nom: "Acnex 20 Capsule",
    },
    {
      nom: "Amlogard 2.5mg Tablet",
    },
    {
      nom: "Amlopin-M 5mg/25mg Tablet",
    },
    {
      nom: "Aquaray Eye Drop",
    },
    {
      nom: "Amazeo 50 Tablet",
    },
    {
      nom: "Atorsave F Tablet",
    },
    {
      nom: "Atorsave D 10 Tablet",
    },
    {
      nom: "Asert D Tablet ER",
    },
    {
      nom: "Amazeo 100 Tablet",
    },
    {
      nom: "Alcarex KT Eye Drop",
    },
    {
      nom: "Amiwel 10 Tablet",
    },
    {
      nom: "Arifine 5mg Tablet",
    },
    {
      nom: "Aztric 40 Tablet",
    },
    {
      nom: "Aretha Tablet",
    },
    {
      nom: "Ace Revelol 50/5 Tablet ER",
    },
    {
      nom: "Azulix 4 MF Forte Tablet PR",
    },
    {
      nom: "Apxenta 30mg Tablet",
    },
    {
      nom: "Amodep-TMH Tablet",
    },
    {
      nom: "Acipsor 25mg Capsule",
    },
    {
      nom: "Aceloflam XP 100 mg/325 mg Tablet",
    },
    {
      nom: "Azobril Cream",
    },
    {
      nom: "Ampoxin 1gm Injection",
    },
    {
      nom: "Angizaar 50 Tablet",
    },
    {
      nom: "Ambrolite 30 Tablet",
    },
    {
      nom: "Aristogyl-F Oral Suspension",
    },
    {
      nom: "Aristogyl-F Oral Suspension",
    },
    {
      nom: "Azom 1gm Injection",
    },
    {
      nom: "Abitol Tablet",
    },
    {
      nom: "Alerid Syrup",
    },
    {
      nom: "Aqualube Liquigel",
    },
    {
      nom: "Aditop C Gel",
    },
    {
      nom: "Amnurite Beta 5/20 ER Tablet",
    },
    {
      nom: "Amigold 100 Tablet",
    },
    {
      nom: "Abvida 50mg Tablet",
    },
    {
      nom: "Aclind BP 5% Gel",
    },
    {
      nom: "Axinerve-NP Tablet",
    },
    {
      nom: "Aquanac Eye Drop",
    },
    {
      nom: "Amigold 50 Tablet",
    },
    {
      nom: "Augxetil CV 500 Tablet",
    },
    {
      nom: "Addwet Gel Eye Drop",
    },
    {
      nom: "Adnurve SR Tablet",
    },
    {
      nom: "Aspisol 150 Tablet",
    },
    {
      nom: "Amicon 25mg Tablet",
    },
    {
      nom: "Amipride 100 Tablet",
    },
    {
      nom: "Amlopin 2.5 Tablet",
    },
    {
      nom: "Arflur CR  Tablet",
    },
    {
      nom: "Akynzeo 300mg/0.5mg Capsule",
    },
    {
      nom: "Amlosafe TM 80 Tablet",
    },
    {
      nom: "Almotan 12.5 Tablet",
    },
    {
      nom: "Angicam-M Tablet PR",
    },
    {
      nom: "ATM XL 100mg/5ml Syrup",
    },
    {
      nom: "Ampoxin 500mg Injection",
    },
    {
      nom: "Azobril Forte 20% Cream",
    },
    {
      nom: "Amnurite P 10mg/75mg Tablet",
    },
    {
      nom: "Amrolmac Cream",
    },
    {
      nom: "Act Nvp Tablet",
    },
    {
      nom: "Azulix 0.5 MF Tablet PR",
    },
    {
      nom: "Amoron Cream",
    },
    {
      nom: "Aminogen Eye Drop",
    },
    {
      nom: "Arreno Capsule ER",
    },
    {
      nom: "Arip MT 20 Tablet",
    },
    {
      nom: "Asomex-TM 5 Tablet",
    },
    {
      nom: "Acenac SP 100mg/325mg/15mg Tablet",
    },
    {
      nom: "Aciban 40 Tablet",
    },
    {
      nom: "Atorlip Gold 10 Capsule",
    },
    {
      nom: "Arip MT 10 Tablet",
    },
    {
      nom: "Amrox-LS Syrup",
    },
    {
      nom: "Alex P Paed Drop",
    },
    {
      nom: "Altoran 40 Tablet",
    },
    {
      nom: "Admol Junior 125mg Tablet",
    },
    {
      nom: "Atorsave 40 Tablet",
    },
    {
      nom: "Alday Duo 5mg/10mg Tablet",
    },
    {
      nom: "Asomex-LT Tablet",
    },
    {
      nom: "Aziwin 500 Tablet",
    },
    {
      nom: "Atecard D Tablet",
    },
    {
      nom: "Aerotrop-F Inhaler",
    },
    {
      nom: "Althrocin Kid 125mg Tablet",
    },
    {
      nom: "Azee 500 Tablet",
    },
    {
      nom: "Allerde 5mg Tablet",
    },
    {
      nom: "Adapero Gel",
    },
    {
      nom: "Alsartan-H Tablet",
    },
    {
      nom: "Alizap 30mg Tablet",
    },
    {
      nom: "Angizaar-H Tablet",
    },
    {
      nom: "Alfugress-D  Tablet SR",
    },
    {
      nom: "Aprenext 30mg Tablet",
    },
    {
      nom: "Azimax 200 Dry Syrup",
    },
    {
      nom: "Amlace Tablet",
    },
    {
      nom: "Acutrol 400 Tablet",
    },
    {
      nom: "Azax 200 Suspension",
    },
    {
      nom: "Amloz AT 25 Tablet",
    },
    {
      nom: "Azuvas 10 Tablet",
    },
    {
      nom: "Amicet Syrup",
    },
    {
      nom: "Acecloren P  Tablet 100mg/325mg",
    },
    {
      nom: "Alkepin Odt 50mg Tablet",
    },
    {
      nom: "Astin 10 Tablet",
    },
    {
      nom: "Algina 650 Tablet",
    },
    {
      nom: "Arvast 40 Tablet",
    },
    {
      nom: "Allrite Tablet",
    },
    {
      nom: "Amrolstar Cream",
    },
    {
      nom: "Acimol 200mg Tablet SR",
    },
    {
      nom: "Alerchek Ophthalmic Solution",
    },
    {
      nom: "Arvast 5 Tablet",
    },
    {
      nom: "Augpen LB 1G Bid Tablet",
    },
    {
      nom: "Amazeo OD 200 Tablet SR",
    },
    {
      nom: "Alrista Forte Tablet",
    },
    {
      nom: "Amigaba 300 mg/10 mg Tablet",
    },
    {
      nom: "Amtas-E Tablet",
    },
    {
      nom: "Amlosafe-LS 5/5 Tablet",
    },
    {
      nom: "Arpizol 20 Tablet",
    },
    {
      nom: "Akostol Tablet",
    },
    {
      nom: "Acnay Gel",
    },
    {
      nom: "Airtec SF 250 Instacap",
    },
    {
      nom: "Asar-CT 40/12.5 Tablet",
    },
    {
      nom: "Amucoe Nac Tablet",
    },
    {
      nom: "Arifine 10mg Tablet",
    },
    {
      nom: "Amrobrut Cream",
    },
    {
      nom: "Alpicno 5mg/5ml Syrup",
    },
    {
      nom: "Alphadol 0.5mcg Soft Gelatin Capsule",
    },
    {
      nom: "Amfocin Cream",
    },
    {
      nom: "Ampoxin-CV Forte Dry Syrup",
    },
    {
      nom: "Anxiset 1 Tablet",
    },
    {
      nom: "A-CN Gel",
    },
    {
      nom: "Azilide -XL Redimed",
    },
    {
      nom: "A Doxid 100mg Capsule",
    },
    {
      nom: "Atocor 5 Tablet",
    },
    {
      nom: "Alcid Tablet",
    },
    {
      nom: "Amortive Cream",
    },
    {
      nom: "Azerva 10 Tablet",
    },
    {
      nom: "Atormac 40 Tablet",
    },
    {
      nom: "Adlene 0.1% Gel",
    },
    {
      nom: "Aldopam 500mg Injection",
    },
    {
      nom: "Azulix 3 Tablet",
    },
    {
      nom: "Azulix MV 1mg/500mg/0.3mg Tablet SR",
    },
    {
      nom: "Aloja 12.5 Tablet",
    },
    {
      nom: "Amlovas-M 2.5/25 Tablet PR",
    },
    {
      nom: "Abrozac 100mg/600mg Tablet",
    },
    {
      nom: "Algest SR 300 Tablet",
    },
    {
      nom: "Arimidex 1mg Tablet",
    },
    {
      nom: "Afogatran 150 Capsule",
    },
    {
      nom: "Aziwok 600 Tablet",
    },
    {
      nom: "Atorsave 20 Tablet",
    },
    {
      nom: "AF-K Lotion",
    },
    {
      nom: "Amrosys Cream",
    },
    {
      nom: "Arip MT 15 Tablet",
    },
    {
      nom: "Alcoxia-MR Tablet",
    },
    {
      nom: "Abel-CT 40mg/12.5mg Tablet",
    },
    {
      nom: "Angizaar 25 Tablet",
    },
    {
      nom: "Anoscha Forte Tablet",
    },
    {
      nom: "Aquaray Gel",
    },
    {
      nom: "Alsartan AM Tablet",
    },
    {
      nom: "Ascovent 100mg Capsule",
    },
    {
      nom: "Afenak Plus S 100mg/325mg/10mg Tablet",
    },
    {
      nom: "Adapure Gel",
    },
    {
      nom: "Amisant 100 Tablet",
    },
    {
      nom: "Amcard 2.5 Tablet",
    },
    {
      nom: "Atorec CV 10 Capsule",
    },
    {
      nom: "Atorfen 10 Tablet",
    },
    {
      nom: "Aroxyl Syrup",
    },
    {
      nom: "Angicam LT 50 mg/5 mg Tablet",
    },
    {
      nom: "Alsartan 50 Tablet",
    },
    {
      nom: "Amtas HT Tablet",
    },
    {
      nom: "Acnovate-Trio Gel",
    },
    {
      nom: "Asomex-AT 5 Tablet",
    },
    {
      nom: "AC Para 100mg/325mg Tablet",
    },
    {
      nom: "Asomex-D 5 Tablet",
    },
    {
      nom: "A-Ret 0.5% Cream",
    },
    {
      nom: "Arbitel 80 Tablet",
    },
    {
      nom: "Astin 40 Tablet",
    },
    {
      nom: "Androanagen Solution",
    },
    {
      nom: "Avessa 250 Inhaler",
    },
    {
      nom: "Adbrom Free Eye Drop",
    },
    {
      nom: "Ambilon 50mg Injection",
    },
    {
      nom: "Azulix 4 Tablet",
    },
    {
      nom: "Arflur-MR Tablet",
    },
    {
      nom: "Aclind Gel",
    },
    {
      nom: "Atorlip 80 Tablet",
    },
    {
      nom: "Arvast CV 10 Capsule",
    },
    {
      nom: "Ansuper-Plus Capsule SR",
    },
    {
      nom: "Angiwell 6.4mg Tablet",
    },
    {
      nom: "Acnilite Gel",
    },
    {
      nom: "Aten-H 12.5 Tablet",
    },
    {
      nom: "Aziclass 200mg Syrup",
    },
    {
      nom: "Am-Exidil 5 Topical Solution",
    },
    {
      nom: "Alocet 5mg Tablet",
    },
    {
      nom: "Azep Nasal Spray",
    },
    {
      nom: "Alciflox 250mg Tablet",
    },
    {
      nom: "Alorti-M Tablet",
    },
    {
      nom: "Aciban DSR Capsule",
    },
    {
      nom: "Amazeo OD 400 Tablet",
    },
    {
      nom: "Argifizz 1500mg Tablet",
    },
    {
      nom: "Arorab LS Capsule",
    },
    {
      nom: "Adp 5mg Tablet",
    },
    {
      nom: "Abrophyll-DM Tablet",
    },
    {
      nom: "Axunil Nasal Spray",
    },
    {
      nom: "Amlopin 10 Tablet",
    },
    {
      nom: "Asprito 20 Tablet",
    },
    {
      nom: "Actame 20mg Tablet",
    },
    {
      nom: "Atorsave Gold 20 Capsule",
    },
    {
      nom: "Alnacet M 5mg/10mg Tablet",
    },
    {
      nom: "Afineday Tablet",
    },
    {
      nom: "Apexitra 200 Capsule",
    },
    {
      nom: "Apexitra 200 Capsule",
    },
    {
      nom: "Asthagrip DM Tablet",
    },
    {
      nom: "Ariday 2.5 Tablet",
    },
    {
      nom: "Aldryl Soft Gelatin Capsule",
    },
    {
      nom: "Asprito 15 Tablet",
    },
    {
      nom: "Azitus XL 100 Suspension",
    },
    {
      nom: "Arvast-CF Capsule DR",
    },
    {
      nom: "Amoreal Cream",
    },
    {
      nom: "Actiblok IPR 25 Tablet",
    },
    {
      nom: "Azildac 80 Tablet",
    },
    {
      nom: "Altraflam-P Tablet",
    },
    {
      nom: "Avonza Tablet",
    },
    {
      nom: "Atorec EZ Tablet",
    },
    {
      nom: "Avas-EZ Tablet",
    },
    {
      nom: "Abel 80 Tablet",
    },
    {
      nom: "Alcipro 2mg/ml Infusion",
    },
    {
      nom: "Aristogyl-F Tablet",
    },
    {
      nom: "Artiflo 2 Tablet",
    },
    {
      nom: "Advog 0.3 Tablet",
    },
    {
      nom: "Asmita Tablet",
    },
    {
      nom: "Atorsave 80 Tablet",
    },
    {
      nom: "Azilura 40 Tablet",
    },
    {
      nom: "Alfa GPC Pastilles",
    },
    {
      nom: "Altonil Tablet MD",
    },
    {
      nom: "Arbitel-80 AM Tablet",
    },
    {
      nom: "Anthocyn-TX Cream",
    },
    {
      nom: "Amide 100 Tablet",
    },
    {
      nom: "Amigold 200 Tablet",
    },
    {
      nom: "Amortas Cream",
    },
    {
      nom: "Atorlip 5 Tablet",
    },
    {
      nom: "Atorsave D 20 Tablet",
    },
    {
      nom: "Altispor 200 Capsule",
    },
    {
      nom: "Albekem 400mg Tablet",
    },
    {
      nom: "Amazeo 200 Tablet",
    },
    {
      nom: "Atecard 50 Tablet",
    },
    {
      nom: "Amcrylate Bio-Adhesive",
    },
    {
      nom: "Adoclear HQ Cream",
    },
    {
      nom: "Adilan 10 Tablet",
    },
    {
      nom: "Amitone 75mg Tablet",
    },
    {
      nom: "Amide 50mg Tablet",
    },
    {
      nom: "Angicam 2.5mg Tablet",
    },
    {
      nom: "Acnesol CL Gel",
    },
    {
      nom: "Aflox Eye Drop",
    },
    {
      nom: "Anbid 500 Tablet",
    },
    {
      nom: "Artilage  Tablet",
    },
    {
      nom: "Abzorb Syndet Bar",
    },
    {
      nom: "Aumento Injection",
    },
    {
      nom: "Amdepin 2.5 Tablet",
    },
    {
      nom: "Amlokem AT 5 mg/50 mg Tablet",
    },
    {
      nom: "Aeocal Max Softgel Capsule",
    },
    {
      nom: "Amnac Opthalmic Suspension",
    },
    {
      nom: "Alinfec 500mg Injection",
    },
    {
      nom: "Alphadol 1mcg Soft Gelatin Capsule",
    },
    {
      nom: "Angizem DP 90 Capsule MR",
    },
    {
      nom: "Amcard-LP Tablet",
    },
    {
      nom: "Aztric CT 12.5 Tablet",
    },
    {
      nom: "AA 5 Tablet",
    },
    {
      nom: "Arvast F 5 Tablet",
    },
    {
      nom: "Arophyll-SR 200 Tablet",
    },
    {
      nom: "Atpark 25 Tablet",
    },
    {
      nom: "Axunil Nasal Spray",
    },
    {
      nom: "Aerotrop Inhalation",
    },
    {
      nom: "Af-ter Lotion",
    },
    {
      nom: "Allyzole Shampoo",
    },
    {
      nom: "Atpark 50 Tablet",
    },
    {
      nom: "Atorsave CV 20 Capsule",
    },
    {
      nom: "Ark 100mg Tablet SR",
    },
    {
      nom: "Alkepin Odt 200 Tablet",
    },
    {
      nom: "Alz Plus  Tablet",
    },
    {
      nom: "Atenex 25mg Tablet",
    },
    {
      nom: "Angicam-H 5mg/12.5mg Tablet",
    },
    {
      nom: "Allerfex 120mg Tablet",
    },
    {
      nom: "Acelera-P Tablet",
    },
    {
      nom: "Amluck Cream",
    },
    {
      nom: "Athzol-DSR Capsule",
    },
    {
      nom: "Admont-LC Tablet",
    },
    {
      nom: "Advacan 0.25mg Tablet",
    },
    {
      nom: "Aztric 80 Tablet",
    },
    {
      nom: "Arophyll-M Tablet SR",
    },
    {
      nom: "Alersin-Total Tablet SR",
    },
    {
      nom: "Afitra 200 Capsule",
    },
    {
      nom: "Atornet F 10mg/145mg Tablet",
    },
    {
      nom: "Ark 75mg Tablet",
    },
    {
      nom: "Acmeglim-MV 2 Tablet SR",
    },
    {
      nom: "Altapan-DSR Capsule",
    },
    {
      nom: "Alatro Tablet",
    },
    {
      nom: "Alfakim 500mg Injection",
    },
    {
      nom: "Arixib 90 Tablet",
    },
    {
      nom: "Azivent-XL 100mg Rediuse Oral Suspension",
    },
    {
      nom: "Atorin 20 Tablet",
    },
    {
      nom: "Amlobet Tablet",
    },
    {
      nom: "Albutas 20% Injection",
    },
    {
      nom: "Arip MT 20 Tablet",
    },
    {
      nom: "Arvast 15 Tablet",
    },
    {
      nom: "Amide 200mg Tablet",
    },
    {
      nom: "Altoran 80 Tablet",
    },
    {
      nom: "Acenac-N Tablet PR",
    },
    {
      nom: "Azukon Tablet",
    },
    {
      nom: "Accare Gel",
    },
    {
      nom: "Advog 0.2 Tablet",
    },
    {
      nom: "Advog M 0.3 Plus Tablet",
    },
    {
      nom: "Acelera-TH Tablet",
    },
    {
      nom: "Arvast 30 Tablet",
    },
    {
      nom: "Anti Druf Lotion",
    },
    {
      nom: "Asomex-OH Tablet",
    },
    {
      nom: "Atorica F Tablet",
    },
    {
      nom: "Azimax 500 Tablet",
    },
    {
      nom: "AGA Lotion",
    },
    {
      nom: "Adclin Gel",
    },
    {
      nom: "Arbazeal-ES 40 Tablet",
    },
    {
      nom: "Arthocerin-A Tablet",
    },
    {
      nom: "Amocop Cream",
    },
    {
      nom: "Abvida-M 50mg/1000mg Eazy Glide Tablet",
    },
    {
      nom: "Azmet-VG 1 Tablet SR",
    },
    {
      nom: "Alphadopa L Tablet",
    },
    {
      nom: "Apxenta 10 Tablet",
    },
    {
      nom: "Alphadopa 500 Tablet",
    },
    {
      nom: "Amdepin-AT Tablet",
    },
    {
      nom: "Anort 30 Tablet",
    },
    {
      nom: "Aceclan-TH Tablet",
    },
    {
      nom: "Asmygaba-NT Tablet",
    },
    {
      nom: "Amazeo 300 Tablet",
    },
    {
      nom: "Ancer LM Syrup",
    },
    {
      nom: "Amcard 10 Tablet",
    },
    {
      nom: "Asprito 30 Tablet",
    },
    {
      nom: "Angiotec Tablet ER",
    },
    {
      nom: "Albavir Tablet",
    },
    {
      nom: "Airtec SF 500 Instacap",
    },
    {
      nom: "Acneclin Gel",
    },
    {
      nom: "Antab Tablet",
    },
    {
      nom: "Apriglim-MV 103 Tablet SR",
    },
    {
      nom: "Atol AM Tablet",
    },
    {
      nom: "Acuclav 1000mg Tablet",
    },
    {
      nom: "Agiclob NM Cream",
    },
    {
      nom: "Acrobenz A Gel",
    },
    {
      nom: "Acmerose-F Tablet",
    },
    {
      nom: "Acvaketo Soap",
    },
    {
      nom: "Atazor-R 300mg/100mg Tablet",
    },
    {
      nom: "Acmetel 40 Tablet",
    },
    {
      nom: "Amfy Gel",
    },
    {
      nom: "Airkast-FX Tablet",
    },
    {
      nom: "Amchek 5 Tablet",
    },
    {
      nom: "Acnecap Gel",
    },
    {
      nom: "Azam 200 Oral Suspension",
    },
    {
      nom: "Ankon 90 Tablet",
    },
    {
      nom: "Accept-XL Tablet",
    },
    {
      nom: "Averzine 25mg Syrup",
    },
    {
      nom: "Acv-LB Tablet",
    },
    {
      nom: "Acnetreat 0.05% Cream",
    },
    {
      nom: "Acnox Soap",
    },
    {
      nom: "Amchek-AT Tablet",
    },
    {
      nom: "Atlura 80 Tablet",
    },
    {
      nom: "Adglim MP 2mg/500mg/15mg Tablet",
    },
    {
      nom: "Alkel Liquid",
    },
    {
      nom: "Arip MT 30 Tablet",
    },
    {
      nom: "Apriglim 2 Tablet",
    },
    {
      nom: "Amipace 200 Tablet",
    },
    {
      nom: "Aziquest 500mg Tablet",
    },
    {
      nom: "Asvoxia-P Tablet",
    },
    {
      nom: "Amlokem M 5/50 Tablet",
    },
    {
      nom: "Avigan 200mg Tablet",
    },
    {
      nom: "Amortive Cream",
    },
    {
      nom: "Atenova 50mg Tablet",
    },
    {
      nom: "Akubliss Tablet",
    },
    {
      nom: "Amyclox-LB-DS Capsule",
    },
    {
      nom: "Amyclox-LB-DS Capsule",
    },
    {
      nom: "Aripiren 10mg Tablet",
    },
    {
      nom: "Adhair 2% Solution",
    },
    {
      nom: "Allermax Plus Tablet",
    },
    {
      nom: "Amigold 400mg Tablet",
    },
    {
      nom: "Af-ter Cream",
    },
    {
      nom: "Acf 500 Tablet",
    },
    {
      nom: "Afitra 100 Capsule",
    },
    {
      nom: "Amdepin 10 Tablet",
    },
    {
      nom: "Adcox-P Tablet",
    },
    {
      nom: "Azolbest-KT Shampoo",
    },
    {
      nom: "Atret 0.05% Cream",
    },
    {
      nom: "Asenapt 10 Sublingual tablet",
    },
    {
      nom: "Albimol 650mg Tablet",
    },
    {
      nom: "Alecloz 180 Tablet",
    },
    {
      nom: "Allyte Gel",
    },
    {
      nom: "Atecard-AM Tablet",
    },
    {
      nom: "Afitra Cream",
    },
    {
      nom: "Arthocerin-DG Tablet",
    },
    {
      nom: "Arthocerin-DG Tablet",
    },
    {
      nom: "Afitra-L Cream",
    },
    {
      nom: "Actiflox T 4 Tablet",
    },
    {
      nom: "Ariphrenz 5mg Tablet",
    },
    {
      nom: "Angizaar AT Tablet",
    },
    {
      nom: "Avril AF Syrup",
    },
    {
      nom: "Amphy IBL 1000 Tablet",
    },
    {
      nom: "Almefkem 250mg Tablet",
    },
    {
      nom: "Avicaine Oral Topical Solution",
    },
    {
      nom: "Avicaine Oral Topical Solution",
    },
    {
      nom: "Amvibast 20mg Tablet",
    },
    {
      nom: "Alitra 100 Capsule",
    },
    {
      nom: "All Klear Granules",
    },
    {
      nom: "Anclazide-M Tablet",
    },
    {
      nom: "Amfocin Cream",
    },
    {
      nom: "Asmygaba-M Tablet",
    },
    {
      nom: "Betnesol-N Eye/Ear Drops",
    },
    {
      nom: "Betnesol Tablet",
    },
    {
      nom: "Budecort 0.5mg Respules 2ml",
    },
    {
      nom: "Benadryl Syrup",
    },
    {
      nom: "Bandy-Plus Chewable Tablet",
    },
    {
      nom: "Brufen 400 Tablet",
    },
    {
      nom: "Brilinta 90mg Tablet",
    },
    {
      nom: "Bilypsa Tablet",
    },
    {
      nom: "Betadine 10% Solution",
    },
    {
      nom: "Betnovate Cream",
    },
    {
      nom: "Betnovate-GM Cream",
    },
    {
      nom: "Betacap TR 40 Capsule",
    },
    {
      nom: "Bandy-Plus Suspension",
    },
    {
      nom: "Bactrim DS Tablet",
    },
    {
      nom: "Baclof 10 Tablet",
    },
    {
      nom: "Betadine 10% Ointment",
    },
    {
      nom: "Betadine 2% Gargle Mint",
    },
    {
      nom: "Bandy Suspension",
    },
    {
      nom: "Brozeet-LS Syrup",
    },
    {
      nom: "Brutaflam-MR 4 Tablet",
    },
    {
      nom: "Bilasure 20 Tablet",
    },
    {
      nom: "Brevipil 50 Tablet",
    },
    {
      nom: "Broclear Tablet",
    },
    {
      nom: "Bilazest 20mg Tablet",
    },
    {
      nom: "Budecort 200 Inhaler",
    },
    {
      nom: "Budamate 200 Transhaler",
    },
    {
      nom: "Betnesol Oral Drops",
    },
    {
      nom: "Betaloc 25mg Tablet",
    },
    {
      nom: "Betadine Powder",
    },
    {
      nom: "Benalgis Tablet",
    },
    {
      nom: "Benadryl DR Syrup",
    },
    {
      nom: "Burnheal Cream",
    },
    {
      nom: "Betacap TR 20 Capsule",
    },
    {
      nom: "Bonista Cartridge",
    },
    {
      nom: "Bilashine Tablet",
    },
    {
      nom: "Betacap Plus 10 Capsule SR",
    },
    {
      nom: "Boostrix Vaccine",
    },
    {
      nom: "Bisoheart 2.5 Tablet",
    },
    {
      nom: "Bupron XL 150 Tablet",
    },
    {
      nom: "Basalog 100IU/ml Injection",
    },
    {
      nom: "Betadine 2% Gargle Mint",
    },
    {
      nom: "Bactoclav 625 Tablet",
    },
    {
      nom: "Bilagra M 20mg/10mg Tablet",
    },
    {
      nom: "Betavert 16 Tablet",
    },
    {
      nom: "Brutaflam 90mg Tablet",
    },
    {
      nom: "Betacap 20 Tablet",
    },
    {
      nom: "Budamate 400 Transcaps",
    },
    {
      nom: "Benzonix Gel Wash",
    },
    {
      nom: "B Bact Ointment",
    },
    {
      nom: "Brufen 200 Tablet",
    },
    {
      nom: "Baralgan NU Tablet",
    },
    {
      nom: "Bharglob 16.5% Injection",
    },
    {
      nom: "Bilazest M Tablet",
    },
    {
      nom: "Brite Cream",
    },
    {
      nom: "Bisoheart 5mg Tablet",
    },
    {
      nom: "Buta Proxyvon Capsule",
    },
    {
      nom: "Bandy-Plus 12 Chewable Tablet",
    },
    {
      nom: "Bendex 400 Tablet",
    },
    {
      nom: "Bonmax PTH 750mcg Solution for Injection",
    },
    {
      nom: "Budamate 200 Transcaps",
    },
    {
      nom: "Betadine Vaginal Pessaries",
    },
    {
      nom: "Bupron SR 150 Tablet",
    },
    {
      nom: "Bro-Zedex LS Syrup",
    },
    {
      nom: "Bactafuz Cream",
    },
    {
      nom: "Bexol Tablet",
    },
    {
      nom: "Betnovate-S Ointment",
    },
    {
      nom: "Beipos Eye Drop",
    },
    {
      nom: "Brutaflam-Plus Tablet",
    },
    {
      nom: "Bilanix Tablet",
    },
    {
      nom: "Budez CR Capsule",
    },
    {
      nom: "Betheran 25mg Tablet",
    },
    {
      nom: "Buscogast 20mg Injection",
    },
    {
      nom: "Brufen 600 Tablet",
    },
    {
      nom: "Brimolol Eye Drop",
    },
    {
      nom: "Budetrol 200 Inhaler",
    },
    {
      nom: "Benalgis Forte Soft Gelatin Capsule",
    },
    {
      nom: "Budecort 100 Inhaler",
    },
    {
      nom: "Betaloc 50mg Tablet",
    },
    {
      nom: "Basugine 100IU/ml Injection",
    },
    {
      nom: "Bromhexine Hydrochloride 8mg Tablet",
    },
    {
      nom: "Bacstol Tablet",
    },
    {
      nom: "Babygesic Drops Orange",
    },
    {
      nom: "Bro-Zedex LS Kid Expectorant Raspberry",
    },
    {
      nom: "Bactrim Syrup",
    },
    {
      nom: "Betasalic Ointment",
    },
    {
      nom: "Basaglar 100 Units/ml Cartridge",
    },
    {
      nom: "Bactomin 375 Tablet",
    },
    {
      nom: "Bladmir 50mg Tablet",
    },
    {
      nom: "Baclof OD 20 Tablet ER",
    },
    {
      nom: "Bilagra Tablet",
    },
    {
      nom: "Budecort 1mg Respules 2 ml",
    },
    {
      nom: "Bilazap Tablet",
    },
    {
      nom: "Biovac A Vaccine",
    },
    {
      nom: "Budamate 400 Transhaler",
    },
    {
      nom: "Bispec 5 Tablet",
    },
    {
      nom: "Betadine 5% Ointment",
    },
    {
      nom: "Betacap 10 Tablet",
    },
    {
      nom: "Betacap Plus 5 Capsule SR",
    },
    {
      nom: "Benxop Face Wash",
    },
    {
      nom: "Bladmir 25 Tablet ER",
    },
    {
      nom: "Basalog 100IU/ml Refill Cartridge",
    },
    {
      nom: "Briviact 50mg Tablet",
    },
    {
      nom: "Bigspas-P Tablet",
    },
    {
      nom: "Budamate Neb 0.5mg Respules 2ml",
    },
    {
      nom: "Budate Transpules",
    },
    {
      nom: "Biocof BR Syrup",
    },
    {
      nom: "Bigomet SR 500 Tablet",
    },
    {
      nom: "Bacstol 200 Tablet",
    },
    {
      nom: "Bosentas 62.5 Tablet",
    },
    {
      nom: "Betavert OD 24 Tablet CR",
    },
    {
      nom: "Bidin T  Eye Drop",
    },
    {
      nom: "Brozeet-LS Drops",
    },
    {
      nom: "Betavert 24 Tablet",
    },
    {
      nom: "Bromhexine Elixir",
    },
    {
      nom: "Byloza Tablet",
    },
    {
      nom: "Brimocom Eye Drop",
    },
    {
      nom: "Bidin LS Eye Drop",
    },
    {
      nom: "Bactoclav DS 457 Dry Syrup",
    },
    {
      nom: "Bisotab 2.5 Tablet",
    },
    {
      nom: "Betagel",
    },
    {
      nom: "Brinzox Ophthalmic Suspension",
    },
    {
      nom: "Bandrone 150 Tablet",
    },
    {
      nom: "Bexol DT Tablet",
    },
    {
      nom: "Brilinta 90mg Tablet",
    },
    {
      nom: "Brigrel Tablet",
    },
    {
      nom: "Bilacad M Tablet",
    },
    {
      nom: "Bimat LS Eye Drop",
    },
    {
      nom: "Bactogard 200mg Tablet",
    },
    {
      nom: "Benadryl Syrup",
    },
    {
      nom: "Bilahist 20mg Tablet",
    },
    {
      nom: "Bactoclav Dry Syrup",
    },
    {
      nom: "Beltas Tablet",
    },
    {
      nom: "Bactomin 750 Tablet",
    },
    {
      nom: "Betakind Gargle",
    },
    {
      nom: "Budesal 1mg Respule 2ml",
    },
    {
      nom: "Brimodin Eye Drop",
    },
    {
      nom: "Broncorex Expectorant",
    },
    {
      nom: "Basalog One 100IU/ml Injection",
    },
    {
      nom: "Benadryl Syrup",
    },
    {
      nom: "Biosuganril 10 Tablet",
    },
    {
      nom: "Bepodrops Ophthalmic Solution",
    },
    {
      nom: "Bendex 200mg Suspension",
    },
    {
      nom: "Budetrol 200 Rotacap",
    },
    {
      nom: "Brophyle-N Tablet",
    },
    {
      nom: "Bilambic 20mg Tablet",
    },
    {
      nom: "Benadryl DR Kids Syrup Mixed fruit flavour Alcohol Free",
    },
    {
      nom: "Betadine 10% Solution",
    },
    {
      nom: "Bupron XL 300 Tablet",
    },
    {
      nom: "Brinzox-T Eye Drop",
    },
    {
      nom: "Bisgram Tablet",
    },
    {
      nom: "Budamate Neb 1mg Respules (2ml Each)",
    },
    {
      nom: "Bravia-DSR Capsule",
    },
    {
      nom: "Bigfun 36 Tablet",
    },
    {
      nom: "Bett Vaccine (Each 0.5ml)",
    },
    {
      nom: "Bimat Eye Drop",
    },
    {
      nom: "Bilanta Tablet",
    },
    {
      nom: "Benadryl DR Syrup",
    },
    {
      nom: "Budenase AQ Nasal Spray",
    },
    {
      nom: "Betavert OD 48 Tablet CR",
    },
    {
      nom: "Bengel AC 2.5% Gel",
    },
    {
      nom: "Bromvue Eye Drops",
    },
    {
      nom: "Biselect 5 Tablet",
    },
    {
      nom: "Biopron Syrup",
    },
    {
      nom: "Bigfun Jelly Mint Cool",
    },
    {
      nom: "Breaze-L Tablet",
    },
    {
      nom: "Bicef 500 DT Tablet",
    },
    {
      nom: "Betadine 5% Ointment",
    },
    {
      nom: "Biofil-AB Particles",
    },
    {
      nom: "Bionect Ointment",
    },
    {
      nom: "Budetrol 400 Inhaler",
    },
    {
      nom: "Basaglar 100IU/ml Kwikpen",
    },
    {
      nom: "Bencid Tablet",
    },
    {
      nom: "Broadiclox Novo 500 mg Capsule",
    },
    {
      nom: "Biorex DX Syrup",
    },
    {
      nom: "Biselect 2.5 Tablet",
    },
    {
      nom: "Berirab P Injection",
    },
    {
      nom: "Bro-Zedex LS Drops",
    },
    {
      nom: "Biovorin 15 Tablet",
    },
    {
      nom: "Biodoxi-LB Capsule",
    },
    {
      nom: "Beta-Nicardia Capsule SR",
    },
    {
      nom: "Brom 2.5mg Tablet",
    },
    {
      nom: "Bacfen 10 Tablet",
    },
    {
      nom: "Bioclar 250mg Tablet",
    },
    {
      nom: "Betabrim Eye Drop",
    },
    {
      nom: "Biospas Plus 10mg/250mg Tablet",
    },
    {
      nom: "Bilazo Tablet",
    },
    {
      nom: "Biochemdryl Syrup",
    },
    {
      nom: "Bilefix 300 Tablet",
    },
    {
      nom: "Baclof OD 30 Tablet ER",
    },
    {
      nom: "Betacap TR 80 Capsule",
    },
    {
      nom: "Bigomet 500 Tablet",
    },
    {
      nom: "Betadine 7.5% Surgical Scrub",
    },
    {
      nom: "Blisto 2 MF Tablet PR",
    },
    {
      nom: "Budamate 100 Transhaler",
    },
    {
      nom: "Bdiff A Gel",
    },
    {
      nom: "Budamate 100 Transcaps",
    },
    {
      nom: "Bilachek Syrup",
    },
    {
      nom: "Bromostar-T Eye Drop",
    },
    {
      nom: "Brintop 5% Solution",
    },
    {
      nom: "Budate 200 Transhaler",
    },
    {
      nom: "Biopron 4mg Tablet",
    },
    {
      nom: "Brite Eye Drop",
    },
    {
      nom: "Billargic M Tablet",
    },
    {
      nom: "B-Stil 16 Tablet",
    },
    {
      nom: "Betacard 25 Tablet",
    },
    {
      nom: "Biopress AM Tablet",
    },
    {
      nom: "Bilasure Oral Solution",
    },
    {
      nom: "Blumox 250mg Tablet DT",
    },
    {
      nom: "Bactogard-CV 200 Tablet",
    },
    {
      nom: "Betamine Forte Tablet",
    },
    {
      nom: "Bisosafe 2.5 Tablet",
    },
    {
      nom: "Biosore Gel",
    },
    {
      nom: "Bepozal Tablet",
    },
    {
      nom: "Bevac Adult Vaccine",
    },
    {
      nom: "Biotrexate 50mg Injection",
    },
    {
      nom: "Bengreat 8 Tablet",
    },
    {
      nom: "Brintop Diva 5% Topical Solution",
    },
    {
      nom: "Brupal 300mg/325mg Tablet",
    },
    {
      nom: "Beta 50mg Tablet",
    },
    {
      nom: "Betacap TR 60 Capsule",
    },
    {
      nom: "Baclof 25 Tablet",
    },
    {
      nom: "Baga 100 Capsule",
    },
    {
      nom: "Bionesp 40 Injection",
    },
    {
      nom: "Bisosafe 5 Tablet",
    },
    {
      nom: "Bacfen 5 Tablet",
    },
    {
      nom: "Beteala 20mg Tablet",
    },
    {
      nom: "Bignac P Tablet",
    },
    {
      nom: "Buscogast 20mg Injection",
    },
    {
      nom: "Brimotas T Eye Drop",
    },
    {
      nom: "Bimat-T Eye Drops",
    },
    {
      nom: "Betabest XL 50 Tablet",
    },
    {
      nom: "Bromifax Eye Drop",
    },
    {
      nom: "Bvert OD 24mg Tablet CR",
    },
    {
      nom: "Bosentas 125 Tablet",
    },
    {
      nom: "Beniduce 8mg Tablet",
    },
    {
      nom: "Briviact 100mg Tablet",
    },
    {
      nom: "Betaone-XL 50 Tablet",
    },
    {
      nom: "Bimat LS TM Eye Drop",
    },
    {
      nom: "Baga-M Capsule",
    },
    {
      nom: "Biomyf-S 360 Tablet",
    },
    {
      nom: "Betadine Surgical Scrub 7.5% Solution",
    },
    {
      nom: "Brezvent-LS Cough Syrup",
    },
    {
      nom: "Belina Gel",
    },
    {
      nom: "Bariderm-S Ointment",
    },
    {
      nom: "Bravia-LS Capsule SR",
    },
    {
      nom: "Biodib 15 Tablet",
    },
    {
      nom: "Biodens Hair Lotion",
    },
    {
      nom: "Bisoder 5mg Tablet",
    },
    {
      nom: "Beclate 200 Rotacaps",
    },
    {
      nom: "Babygesic 125 Oral Suspension",
    },
    {
      nom: "Betaloc 100mg Tablet",
    },
    {
      nom: "Bett Vaccine",
    },
    {
      nom: "Bymet 500mg Tablet",
    },
    {
      nom: "Brintop Diva 2% Topical Solution",
    },
    {
      nom: "Budeste 0.5mg Respules 2ml",
    },
    {
      nom: "Biovac V Vaccine",
    },
    {
      nom: "Biojoynt Tablet",
    },
    {
      nom: "Belclin A Gel",
    },
    {
      nom: "Benad Gel",
    },
    {
      nom: "BlackCrown Forte 5% Solution",
    },
    {
      nom: "Bromin Tablet",
    },
    {
      nom: "Bigomet M  Tablet SR",
    },
    {
      nom: "Bactoclav Drops",
    },
    {
      nom: "Bigomet 850 Tablet",
    },
    {
      nom: "Brufamol Tablet",
    },
    {
      nom: "Bromutrip Tablet",
    },
    {
      nom: "Basalog 100IU/ml Injection",
    },
    {
      nom: "Biospor 1% Cream",
    },
    {
      nom: "B Bact Ointment",
    },
    {
      nom: "Bkosa-F Tablet",
    },
    {
      nom: "Bymet 1000 Tablet PR",
    },
    {
      nom: "Crocin Advance 500mg Tablet",
    },
    {
      nom: "Citralka Liquid",
    },
    {
      nom: "Colospa Retard Capsule",
    },
    {
      nom: "Cardace 2.5 Tablet",
    },
    {
      nom: "Corbis 5 Tablet",
    },
    {
      nom: "Claribid 250 Tablet",
    },
    {
      nom: "Chymoflam Tablet",
    },
    {
      nom: "Cartigen Duo Tablet",
    },
    {
      nom: "Clopitorva 10 Capsule",
    },
    {
      nom: "Critizyme Tablet",
    },
    {
      nom: "Cyblex 60 XR Tablet",
    },
    {
      nom: "Canazole Cream",
    },
    {
      nom: "Duvadilan Tablet",
    },
    {
      nom: "Duvadilan Retard Capsule SR",
    },
    {
      nom: "Dytor Plus LS 10 Tablet",
    },
    {
      nom: "Depo-Provera Injection",
    },
    {
      nom: "Dutas T Plus Capsule PR",
    },
    {
      nom: "Dicloran A Tablet",
    },
    {
      nom: "Diamicron MR 30 Tablet",
    },
    {
      nom: "Dabigo 110mg Capsule",
    },
    {
      nom: "Diapride M2 Tablet PR",
    },
    {
      nom: "Dompan SR Tablet",
    },
    {
      nom: "Diziron Tablet",
    },
    {
      nom: "Danclear  Shampoo",
    },
    {
      nom: "Doxiflo-M Tablet SR",
    },
    {
      nom: "Debistal-GM 2 Tablet ER",
    },
    {
      nom: "Doxinate -G Tablet",
    },
    {
      nom: "Doloneuron NT Tablet",
    },
    {
      nom: "Dolo Drops",
    },
    {
      nom: "Drotikind 80mg Tablet",
    },
    {
      nom: "D-Veniz 100 Tablet ER",
    },
    {
      nom: "Dexcin-M Eye Drop",
    },
    {
      nom: "Deca-Durabolin 100 Injection",
    },
    {
      nom: "Darilong 7.5 Tablet PR",
    },
    {
      nom: "Dariten OD 7.5mg Tablet PR",
    },
    {
      nom: "Duvanta 30 Tablet",
    },
    {
      nom: "Dulane 30 Capsule DR",
    },
    {
      nom: "Dezlorid 5mg Tablet",
    },
    {
      nom: "Divacon Tablet",
    },
    {
      nom: "Diprobate RD Cream",
    },
    {
      nom: "Darba 40mcg Injection",
    },
    {
      nom: "Dosetil Lotion",
    },
    {
      nom: "Desirox 500 Tablet",
    },
    {
      nom: "Duloren 20 Tablet",
    },
    {
      nom: "Deriphyllin OD 300 Tablet PR",
    },
    {
      nom: "Dimol 40 Tablet",
    },
    {
      nom: "Durabolin 25 Injection",
    },
    {
      nom: "Dabigo 150mg Capsule",
    },
    {
      nom: "Dilnip-Trio Tablet",
    },
    {
      nom: "Doloneuron 100 Tablet",
    },
    {
      nom: "Damoxy Tablet",
    },
    {
      nom: "Dilo-LS Syrup",
    },
    {
      nom: "Doris Tablet",
    },
    {
      nom: "Diziron D Tablet MD",
    },
    {
      nom: "Dayo  OD 500 Tablet PR",
    },
    {
      nom: "Donep 10 Tablet",
    },
    {
      nom: "Duphalac Enema Solution",
    },
    {
      nom: "Desveren 50 Tablet ER",
    },
    {
      nom: "Dulotin 20mg Tablet",
    },
    {
      nom: "Dalacin C 150mg Capsule",
    },
    {
      nom: "Daxid 100mg Tablet",
    },
    {
      nom: "Domin Injection",
    },
    {
      nom: "Dicaris  Adults Tablet",
    },
    {
      nom: "DMR Syrup",
    },
    {
      nom: "Dinofirst Tablet",
    },
    {
      nom: "Dorsun T Eye Drop",
    },
    {
      nom: "Ducira Gel",
    },
    {
      nom: "Dirifa 400 Tablet",
    },
    {
      nom: "Duprost Capsule",
    },
    {
      nom: "Digihaler FB 200 Inhaler",
    },
    {
      nom: "Doxinate OD Tablet",
    },
    {
      nom: "Digecaine Oral Gel Fruit Punch Sugar Free",
    },
    {
      nom: "Duotrol Tablet",
    },
    {
      nom: "Dolocaine Cream",
    },
    {
      nom: "Dulane M 20 Capsule DR",
    },
    {
      nom: "Drez Powder",
    },
    {
      nom: "Divaa -OD 750 Tablet ER",
    },
    {
      nom: "Dortas-T Eye Drop",
    },
    {
      nom: "Domways 10mg Oral Drops",
    },
    {
      nom: "Diabetrol Tablet",
    },
    {
      nom: "Duvanta NP 20 Tablet",
    },
    {
      nom: "Dericip Retard 150 Tablet PR",
    },
    {
      nom: "D Cort 40mg Injection",
    },
    {
      nom: "Depaxil CR 12.5 Tablet",
    },
    {
      nom: "Daztor 10 Tablet",
    },
    {
      nom: "Dobest Capsule",
    },
    {
      nom: "Diprolite Cream",
    },
    {
      nom: "Draminate 50mg Tablet",
    },
    {
      nom: "Diof  Oral Suspension",
    },
    {
      nom: "Diplomax Lotion",
    },
    {
      nom: "Depo-Medrol 40mg Injection",
    },
    {
      nom: "Dicorate ER 750 Tablet",
    },
    {
      nom: "Depakote 250 Tablet",
    },
    {
      nom: "Defcort 18 Tablet",
    },
    {
      nom: "Diprobate S Plus Ointment",
    },
    {
      nom: "Dirifa 550 Tablet",
    },
    {
      nom: "Depranex 5 Tablet",
    },
    {
      nom: "Digihaler FB 400 Inhaler",
    },
    {
      nom: "Duvadilan IM/IV 5mg Injection",
    },
    {
      nom: "Doxoril 650 Tablet SR",
    },
    {
      nom: "Dianorm-OD 30 Tablet MR",
    },
    {
      nom: "Diclowin Plus PR Tablet",
    },
    {
      nom: "Diclotal 25mg Injection",
    },
    {
      nom: "Depotex 4mg Tablet",
    },
    {
      nom: "Dablexa 110 Capsule",
    },
    {
      nom: "Dixin Paed Oral Solution",
    },
    {
      nom: "Dolowin-SR Tablet",
    },
    {
      nom: "Dipsalic F Ointment",
    },
    {
      nom: "Dresin Mouthwash &amp; Gargle",
    },
    {
      nom: "Dentogel Liquid",
    },
    {
      nom: "Duvanta 40 Tablet",
    },
    {
      nom: "Dezacor Oral Suspension",
    },
    {
      nom: "Dilcontin XL 90 Tablet",
    },
    {
      nom: "Dargen 25 Injection",
    },
    {
      nom: "Dianorm 80mg Tablet",
    },
    {
      nom: "Derisal 0.5mg Respules 2ml",
    },
    {
      nom: "Diabetrol SR Tablet",
    },
    {
      nom: "Dersil-AF Body Wash",
    },
    {
      nom: "DO RE ME 25mg Tablet",
    },
    {
      nom: "Digihaler SF 250 Inhaler",
    },
    {
      nom: "Doxin 25mg Capsule",
    },
    {
      nom: "Dutaprost  0.5mg Tablet",
    },
    {
      nom: "Dompar 10mg/325mg Tablet",
    },
    {
      nom: "Danclear  Cream",
    },
    {
      nom: "Dom-DT 5 Rapitab",
    },
    {
      nom: "Dersol 12% Ointment",
    },
    {
      nom: "Dersol 12% Ointment",
    },
    {
      nom: "Diapride M2 LV 2mg/500mg/0.2mg Tablet SR",
    },
    {
      nom: "Diapride M 0.5mg/500mg Tablet PR",
    },
    {
      nom: "Doxolin AX Tablet",
    },
    {
      nom: "Dicorate ER 1g Tablet",
    },
    {
      nom: "Diva Hmg 75i.u Injection",
    },
    {
      nom: "Dabigat 110 Capsule",
    },
    {
      nom: "Desirox 250mg Tablet",
    },
    {
      nom: "Deys Milk OF Magnesia Liquid Ice Cream",
    },
    {
      nom: "Dencross Scalp Lotion",
    },
    {
      nom: "Divalprid-OD 500 Tablet PR",
    },
    {
      nom: "Divaa 250 Solution",
    },
    {
      nom: "Decomedo Gel",
    },
    {
      nom: "Deritas 7.5 Tablet PR",
    },
    {
      nom: "Dianorm-M OD Tablet SR",
    },
    {
      nom: "Dersol 24% Ointment",
    },
    {
      nom: "Denis NS 0.9% Sodium Chloride Injection",
    },
    {
      nom: "Dericip Retard 300  Tablet PR",
    },
    {
      nom: "Depaxil CR 25 Tablet",
    },
    {
      nom: "Dabiclot 150mg Capsule",
    },
    {
      nom: "Dynapar MR 8 Tablet",
    },
    {
      nom: "Danblock Lotion",
    },
    {
      nom: "Dicloran SR Tablet",
    },
    {
      nom: "Dolonex Rapid 20mg Tablet",
    },
    {
      nom: "Dablexa 150 Capsule",
    },
    {
      nom: "Droziver 80mg Tablet",
    },
    {
      nom: "Delok 20 Capsule DR",
    },
    {
      nom: "Dilgel",
    },
    {
      nom: "Doxcef 100mg Tablet DT",
    },
    {
      nom: "Dilantin Oral Suspension",
    },
    {
      nom: "Deriphyllin Injection",
    },
    {
      nom: "Duomate Forte Transcaps",
    },
    {
      nom: "Desveren 100 Tablet ER",
    },
    {
      nom: "Depakote XR 500 Tablet",
    },
    {
      nom: "D Flour Tablet",
    },
    {
      nom: "Derinide-AQ Nasal Spray",
    },
    {
      nom: "Depig-F Cream",
    },
    {
      nom: "Dubinor PM Capsule",
    },
    {
      nom: "Dill-N Tablet",
    },
    {
      nom: "D3-Zen 60K Soft Gelatin Capsule",
    },
    {
      nom: "Diamet 500mg Tablet SR",
    },
    {
      nom: "Diapride M1 LV 1mg/500mg/0.2mg Tablet SR",
    },
    {
      nom: "Deriphyllin S 231mg/69mg/4mg Tablet PR",
    },
    {
      nom: "Dermoquinol 8% Cream",
    },
    {
      nom: "Denlafax 50 Tablet PR",
    },
    {
      nom: "Drez Spray",
    },
    {
      nom: "Diclozyme-P Tablet",
    },
    {
      nom: "Dicaris  Children Tablet",
    },
    {
      nom: "Desval  ER 750 Tablet",
    },
    {
      nom: "Dabilong 110mg Capsule",
    },
    {
      nom: "Dolonex Gel",
    },
    {
      nom: "Divalrate 500mg Tablet ER",
    },
    {
      nom: "Densaid-QA Sachet",
    },
    {
      nom: "Dersol 18% Ointment",
    },
    {
      nom: "Diasdac SP Tablet",
    },
    {
      nom: "Divaxee OD 500 Tablet PR",
    },
    {
      nom: "Donecept M Tablet",
    },
    {
      nom: "Diabend -MR 60 Tablet",
    },
    {
      nom: "Dermicee Cream",
    },
    {
      nom: "Dobact-Core Capsule",
    },
    {
      nom: "Deriva I 10mg Capsule",
    },
    {
      nom: "Druffnil Shampoo",
    },
    {
      nom: "Dabistar 75mg Capsule",
    },
    {
      nom: "Dicorate Solution",
    },
    {
      nom: "Drotin DS Oral Suspension Mango Sugar Free",
    },
    {
      nom: "Desilam 10 Tablet",
    },
    {
      nom: "Dibeta GB 5 mg/500 mg Tablet",
    },
    {
      nom: "Dermikem 4 Cream",
    },
    {
      nom: "Diabend-MR 30 Tablet",
    },
    {
      nom: "Djiso 20mg Tablet",
    },
    {
      nom: "Dovy-M Tablet",
    },
    {
      nom: "Doberol Capsule",
    },
    {
      nom: "Donep Syrup",
    },
    {
      nom: "Depakote XR 250 Tablet",
    },
    {
      nom: "Divalpro 250 Tablet",
    },
    {
      nom: "Dermitop Lotion",
    },
    {
      nom: "Drez 10% Solution",
    },
    {
      nom: "Dinace 2.5 Tablet",
    },
    {
      nom: "Divalid 250mg Tablet ER",
    },
    {
      nom: "Deys Milk OF Magnesia 0.311gm Tablet",
    },
    {
      nom: "Drego-LS Capsule SR",
    },
    {
      nom: "Drez S Dusting Powder",
    },
    {
      nom: "Dilcontin 60 Tablet CR",
    },
    {
      nom: "Divalpro XR 250 Tablet",
    },
    {
      nom: "Diasdac-ER Tablet",
    },
    {
      nom: "Distaclor Drop",
    },
    {
      nom: "Donecept 10 Tablet",
    },
    {
      nom: "Domtac Tablet",
    },
    {
      nom: "Dezacor 30 Tablet",
    },
    {
      nom: "Dianorm Total 30 Tablet SR",
    },
    {
      nom: "Diproex ER 250 Tablet",
    },
    {
      nom: "Diproex ER 250 Tablet",
    },
    {
      nom: "Dabiclot 75mg Capsule",
    },
    {
      nom: "Divalpro 500 Tablet",
    },
    {
      nom: "Deriphyllin Tablet",
    },
    {
      nom: "Dargen 60 Injection",
    },
    {
      nom: "Dutandro 0.5mg Tablet",
    },
    {
      nom: "Domrab  Capsule SR",
    },
    {
      nom: "Diabend 40mg Tablet",
    },
    {
      nom: "Distaclor 187mg Oral Suspension Strawberry",
    },
    {
      nom: "Ducaine Suspension Sugar Free",
    },
    {
      nom: "Derisone L Forte Respicap",
    },
    {
      nom: "Diomilin-NT Tablet",
    },
    {
      nom: "DO RE ME 75mg Tablet",
    },
    {
      nom: "Dayo  OD 750 Tablet PR",
    },
    {
      nom: "Doxomit OD Tablet",
    },
    {
      nom: "Duotrol-SR Tablet",
    },
    {
      nom: "Dolo 156.25mg Suspension",
    },
    {
      nom: "Dysport 500IU Injection",
    },
    {
      nom: "Dotzide M Tablet",
    },
    {
      nom: "DO RE ME 50mg Tablet",
    },
    {
      nom: "Diprate-OD 250 Tablet ER",
    },
    {
      nom: "Duopep 40 Tablet",
    },
    {
      nom: "Dancure Shampoo",
    },
    {
      nom: "Daztor 20 Tablet",
    },
    {
      nom: "Denon Soap",
    },
    {
      nom: "Divaa-OD 125 Tablet ER",
    },
    {
      nom: "Diva Hmg HP 150IU Injection",
    },
    {
      nom: "Donica-SR Capsule",
    },
    {
      nom: "Drez S Ointment",
    },
    {
      nom: "Dysliptin 20 Tablet",
    },
    {
      nom: "Disogel Suspension Pineapple Sugar Free",
    },
    {
      nom: "Defelax Syrup",
    },
    {
      nom: "DTM 90 SR Tablet",
    },
    {
      nom: "Dariten OD 15mg Tablet CR",
    },
    {
      nom: "Dorsenz-T Eye Drop",
    },
    {
      nom: "Dabipla 150mg Capsule",
    },
    {
      nom: "Derinide 200 Inhaler CFC Free",
    },
    {
      nom: "Decdan Next 6mg Tablet",
    },
    {
      nom: "Diabend-MEX 60 Tablet ER",
    },
    {
      nom: "Depig Cream",
    },
    {
      nom: "Desval  ER 1g Tablet",
    },
    {
      nom: "Doxacard 2 Tablet",
    },
    {
      nom: "Dabirex 110mg Capsule",
    },
    {
      nom: "Djiso 10mg Tablet",
    },
    {
      nom: "Dollos-P Tablet",
    },
    {
      nom: "Dabigza 110 Capsule",
    },
    {
      nom: "Durart-R 450 Tablet",
    },
    {
      nom: "Dandrid Lotion",
    },
    {
      nom: "Denim P 500mg Tablet",
    },
    {
      nom: "Dolanzen Tablet",
    },
    {
      nom: "Dolodart 120mg/5ml Suspension",
    },
    {
      nom: "Drez S Dusting Powder",
    },
    {
      nom: "Danket Shampoo",
    },
    {
      nom: "Duopil-HS 2/850 Tablet PR",
    },
    {
      nom: "Domgel Suspension",
    },
    {
      nom: "Dubagest 400 Soft Gelatin Capsule",
    },
    {
      nom: "Derisone L Respicap",
    },
    {
      nom: "D3K Softgel Capsule",
    },
    {
      nom: "Dabirex 150 Capsule",
    },
    {
      nom: "Dentop-K Dental Gel",
    },
    {
      nom: "DR 4 Tablet",
    },
    {
      nom: "Dan Shine Lotion",
    },
    {
      nom: "Drukof D Syrup",
    },
    {
      nom: "Dermtone 25mg Tablet",
    },
    {
      nom: "D-Gen 2K Softgel Capsule",
    },
    {
      nom: "Divibrim-T Sterile Eye Drops",
    },
    {
      nom: "Dilpra-OD 750 Tablet",
    },
    {
      nom: "Dicovis-GM Tablet",
    },
    {
      nom: "Duoclin-B Gel",
    },
    {
      nom: "Defmind 100mg Tablet",
    },
    {
      nom: "Denon Shampoo",
    },
    {
      nom: "Derinide 0.5mg Respules 2ml",
    },
    {
      nom: "Denisole 4 Tablet",
    },
    {
      nom: "Disederm Cream",
    },
    {
      nom: "Diproliv Lotion",
    },
    {
      nom: "Dericip 77mg/23mg Tablet",
    },
    {
      nom: "Dericip 77mg/23mg Tablet",
    },
    {
      nom: "Dermoquinol 8% Ointment",
    },
    {
      nom: "Daltehep 5000IU Injection",
    },
    {
      nom: "Dufklin Lotion",
    },
    {
      nom: "Dubinac-SR Tablet",
    },
    {
      nom: "Dotzide 40mg Tablet",
    },
    {
      nom: "Dobutam 250mg Injection",
    },
    {
      nom: "Domtac-SR Capsule",
    },
    {
      nom: "Diflam Dental Gel",
    },
    {
      nom: "Degalyn 80 Injection",
    },
    {
      nom: "Dphyte Cream",
    },
    {
      nom: "Dany Cream",
    },
    {
      nom: "Dolestin 250 Tablet",
    },
    {
      nom: "Dulavin Injection",
    },
    {
      nom: "Dasashil 100mg Tablet",
    },
    {
      nom: "Dolcet-AL Tablet",
    },
    {
      nom: "Dolcet-AL Tablet",
    },
    {
      nom: "Duovir Tablet",
    },
    {
      nom: "Defwave  6 Tablet",
    },
    {
      nom: "Erlocip 150 Tablet",
    },
    {
      nom: "Erlocip 100 Tablet",
    },
    {
      nom: "Eliquis 2.5mg Tablet",
    },
    {
      nom: "Eliquis 5mg Tablet",
    },
    {
      nom: "Exelon Patch 15",
    },
    {
      nom: "Ecosprin 75 Tablet",
    },
    {
      nom: "Enzoflam Tablet",
    },
    {
      nom: "Evion LC Tablet",
    },
    {
      nom: "Etoshine MR Tablet",
    },
    {
      nom: "Ecosprin Gold  20 Capsule",
    },
    {
      nom: "Evalon Cream",
    },
    {
      nom: "Ecosprin AV 75/20 Capsule",
    },
    {
      nom: "Emeset 4 Tablet",
    },
    {
      nom: "Enzomac Plus Tablet",
    },
    {
      nom: "Eprisan SR Capsule",
    },
    {
      nom: "Enzar Forte  Tablet",
    },
    {
      nom: "Emanzen-D Tablet",
    },
    {
      nom: "Ecosprin 150 Tablet",
    },
    {
      nom: "Eptoin Tablet",
    },
    {
      nom: "Eldoper 2mg Capsule",
    },
    {
      nom: "Eumosone-M Cream",
    },
    {
      nom: "Etova-MR 400/4 Tablet",
    },
    {
      nom: "Eyemist Eye Drop",
    },
    {
      nom: "Eldervit 12 Combipack",
    },
    {
      nom: "Enzomac Tablet",
    },
    {
      nom: "Emeset Syrup Juicy Lemon",
    },
    {
      nom: "Ecosprin Gold  10 Capsule",
    },
    {
      nom: "Eltroxin 100mcg Tablet",
    },
    {
      nom: "Eliwel 10mg Tablet",
    },
    {
      nom: "Ebast-M Tablet",
    },
    {
      nom: "Emeset Injection 2ml",
    },
    {
      nom: "Elosone-HT Cream",
    },
    {
      nom: "Erytop Gel",
    },
    {
      nom: "Ebast-DC Tablet",
    },
    {
      nom: "Eco Tears Eye Drop",
    },
    {
      nom: "Etova-ER 600 Tablet",
    },
    {
      nom: "Epidosin Injection",
    },
    {
      nom: "Efil 2.5mg Tablet",
    },
    {
      nom: "Enuff Capsule",
    },
    {
      nom: "Ezedoc 10 Tablet",
    },
    {
      nom: "Emty Oral Solution",
    },
    {
      nom: "Esogress-D Capsule SR",
    },
    {
      nom: "Enzomac Forte Tablet",
    },
    {
      nom: "Ebast 20 Tablet",
    },
    {
      nom: "Etoshine 60 Tablet",
    },
    {
      nom: "Embeta XR 25 Tablet",
    },
    {
      nom: "Etos MR Tablet",
    },
    {
      nom: "Etova 400 Tablet",
    },
    {
      nom: "Esomac D 40 Capsule SR",
    },
    {
      nom: "Esofag-D Capsule SR",
    },
    {
      nom: "Esogress 40 Tablet",
    },
    {
      nom: "Eyemist Forte Eye Drop",
    },
    {
      nom: "Ebernet Cream",
    },
    {
      nom: "Esomac 40 Tablet",
    },
    {
      nom: "Envas 5 Tablet",
    },
    {
      nom: "Embeta XR 50 Tablet",
    },
    {
      nom: "Espogen 4000IU Injection",
    },
    {
      nom: "Eprisan D SR Capsule",
    },
    {
      nom: "Ezact MR Tablet",
    },
    {
      nom: "Estrabet 2 Tablet",
    },
    {
      nom: "Eldicet Tablet",
    },
    {
      nom: "Encorate Chrono 300 Tablet CR",
    },
    {
      nom: "Entavir 0.5mg Tablet",
    },
    {
      nom: "Enzoheal Tablet",
    },
    {
      nom: "Ecosprin AV 150/20 Capsule",
    },
    {
      nom: "Eritel LN 40 Tablet",
    },
    {
      nom: "Encorate Chrono 500 Tablet CR",
    },
    {
      nom: "Escot Cream",
    },
    {
      nom: "Everfresh Tears 0.5% Eye Drop",
    },
    {
      nom: "Eva Q Syrup",
    },
    {
      nom: "Evict Oral Solution",
    },
    {
      nom: "Ebast Tablet",
    },
    {
      nom: "Epsolin 100 Tablet",
    },
    {
      nom: "Emlukast-FX Tablet",
    },
    {
      nom: "Epilive 500 Tablet",
    },
    {
      nom: "Enzoflam-CT Tablet",
    },
    {
      nom: "Eflora Cream",
    },
    {
      nom: "Esoz D 40 Capsule SR",
    },
    {
      nom: "Eukroma Cream",
    },
    {
      nom: "Eyelet Eye Drop 10ml for Eye Infections",
    },
    {
      nom: "Etova-ER 400 Tablet ER",
    },
    {
      nom: "Eslo 2.5 Tablet",
    },
    {
      nom: "Ecosprin-AV 150 Capsule",
    },
    {
      nom: "Eyemist Gel",
    },
    {
      nom: "Envas 2.5 Tablet",
    },
    {
      nom: "Erytop Cream",
    },
    {
      nom: "Etrik MR Tablet",
    },
    {
      nom: "Endogest 200 SR Tablet",
    },
    {
      nom: "Ebility Tablet",
    },
    {
      nom: "Eptoin Injection",
    },
    {
      nom: "Etosys Tablet",
    },
    {
      nom: "Eritel 40 Tablet",
    },
    {
      nom: "Ezact 90 Tablet",
    },
    {
      nom: "Endoreg Tablet",
    },
    {
      nom: "Enzar-HS Capsule",
    },
    {
      nom: "Enzictra - DS Tablet",
    },
    {
      nom: "Elocon Cream",
    },
    {
      nom: "Eposis 4000IU Injection",
    },
    {
      nom: "Enzoheal Ointment",
    },
    {
      nom: "Esgipyrin SP Tablet",
    },
    {
      nom: "Etos 90 Tablet",
    },
    {
      nom: "Eritel-CH 40 Tablet",
    },
    {
      nom: "Esofine-DSR Capsule",
    },
    {
      nom: "Elores 1.5gm Injection",
    },
    {
      nom: "Etogesic ER Tablet",
    },
    {
      nom: "Etozox 90 Tablet",
    },
    {
      nom: "Enuff 10mg Sachet",
    },
    {
      nom: "Esomefol-DSR Capsule",
    },
    {
      nom: "Elata Tablet",
    },
    {
      nom: "Enderm gm Cream",
    },
    {
      nom: "Extralube Eye Drop",
    },
    {
      nom: "Etogesic MR Tablet",
    },
    {
      nom: "Eptoin 300 ER Tablet",
    },
    {
      nom: "Endace 40 Tablet",
    },
    {
      nom: "Eslo 5 Tablet",
    },
    {
      nom: "Epiduo 0.1%/2.5% Gel",
    },
    {
      nom: "Esiflo 250 Transcaps",
    },
    {
      nom: "Ethamcip 500 Tablet",
    },
    {
      nom: "Esogress-L Capsule SR",
    },
    {
      nom: "Etoshine 120 Tablet",
    },
    {
      nom: "Etoford MR 60mg/4mg Tablet",
    },
    {
      nom: "Etody 90 Tablet",
    },
    {
      nom: "Encorate 500 Tablet",
    },
    {
      nom: "Efnocar 40 Tablet",
    },
    {
      nom: "Emikind-MD Tablet",
    },
    {
      nom: "Eclospan Cream",
    },
    {
      nom: "Enzocort 6 Tablet",
    },
    {
      nom: "Etrik 90 Tablet",
    },
    {
      nom: "Esofag 40 Tablet",
    },
    {
      nom: "Ecovin 500 Tablet",
    },
    {
      nom: "Ezanic 20% Cream",
    },
    {
      nom: "Elestra Tablet",
    },
    {
      nom: "Eporise 4000 Injection",
    },
    {
      nom: "Epsolin 50mg",
    },
    {
      nom: "Etorica MR Tablet",
    },
    {
      nom: "Esomac L Capsule SR",
    },
    {
      nom: "Erytop Lotion",
    },
    {
      nom: "Euthyrox 50 Tablet",
    },
    {
      nom: "Extacef 200 DT Tablet",
    },
    {
      nom: "Eema HP 5000 Injection",
    },
    {
      nom: "Emeset 8 Tablet",
    },
    {
      nom: "Evatone 2 Tablet",
    },
    {
      nom: "Etoro TH 60mg/4mg Tablet",
    },
    {
      nom: "Esgipyrin-A Tablet",
    },
    {
      nom: "Elosone Cream",
    },
    {
      nom: "Epnone 25mg Tablet",
    },
    {
      nom: "Eplehef 25 Tablet",
    },
    {
      nom: "Esperal Tablet",
    },
    {
      nom: "ED Save Tablet",
    },
    {
      nom: "Emigo Oral Solution",
    },
    {
      nom: "Endace 160 Tablet",
    },
    {
      nom: "Encorate Chrono 200 Tablet CR",
    },
    {
      nom: "Esiflo 250 Transhaler",
    },
    {
      nom: "Etoxib 90 Tablet",
    },
    {
      nom: "Elocon Ointment",
    },
    {
      nom: "Eurepa 1 Tablet",
    },
    {
      nom: "Exocin Ophthalmic Solution",
    },
    {
      nom: "Esofag-L Capsule SR",
    },
    {
      nom: "Evaparin Injection",
    },
    {
      nom: "Eptoin Suspension",
    },
    {
      nom: "Etrobax 90 Tablet",
    },
    {
      nom: "Eofil Forte 250 mg/4 mg Tablet",
    },
    {
      nom: "Enzomac Ointment",
    },
    {
      nom: "Efil 5mg Tablet",
    },
    {
      nom: "Endogest 200 Capsule",
    },
    {
      nom: "Emanzen Forte 10mg Tablet",
    },
    {
      nom: "Etoxib MR Tablet",
    },
    {
      nom: "Eurepa-V 1/0.3 Tablet",
    },
    {
      nom: "Erytop-N Gel",
    },
    {
      nom: "Evaserve Tablet",
    },
    {
      nom: "Eltroxin 125mcg Tablet",
    },
    {
      nom: "Enteromycetin Suspension",
    },
    {
      nom: "Ecosprin 325 Tablet",
    },
    {
      nom: "Endobloc T Combipack",
    },
    {
      nom: "Eberfine Cream",
    },
    {
      nom: "Eterna 4mg Tablet MD",
    },
    {
      nom: "Enzictra Tablet",
    },
    {
      nom: "Estrabet 0.06% Gel",
    },
    {
      nom: "Enclex 40 Injection",
    },
    {
      nom: "Eyecon Eye Drop",
    },
    {
      nom: "Emestat OD Tablet",
    },
    {
      nom: "Emersa 2mg Tablet",
    },
    {
      nom: "Ethasyl 500 Tablet",
    },
    {
      nom: "Erythrocin 250mg Tablet",
    },
    {
      nom: "Elyn Cream",
    },
    {
      nom: "Ebernet-M Cream",
    },
    {
      nom: "Edrive-T 2.5 Tablet",
    },
    {
      nom: "Etos P 60mg/325mg Tablet",
    },
    {
      nom: "Ezact 60 Tablet",
    },
    {
      nom: "Endogest 300 SR Tablet",
    },
    {
      nom: "Etrik P Tablet",
    },
    {
      nom: "Esofine-LS Capsule SR",
    },
    {
      nom: "Eglucent Mix 25 100IU/ml Suspension for Injection",
    },
    {
      nom: "Elfolin Plus Tablet",
    },
    {
      nom: "Elina Tablet MR",
    },
    {
      nom: "Evanew Vaginal Tablet",
    },
    {
      nom: "Episert Cream",
    },
    {
      nom: "Eiref 40 mg/150 mg Capsule SR",
    },
    {
      nom: "Ezicas AZ Nasal Spray",
    },
    {
      nom: "Enam 5 Tablet",
    },
    {
      nom: "Effenac AB Tablet",
    },
    {
      nom: "Ephedrex Syrup",
    },
    {
      nom: "Elidel Cream",
    },
    {
      nom: "Evadiol Tablet",
    },
    {
      nom: "Eposis 10000IU Injection",
    },
    {
      nom: "Etowin 90 Tablet",
    },
    {
      nom: "Espra 40mg Tablet",
    },
    {
      nom: "Euthyrox 25 Tablet",
    },
    {
      nom: "Emaxgalin 75mg/60mg Tablet",
    },
    {
      nom: "Erox CV 625 Tablet",
    },
    {
      nom: "Eliwel 25mg Tablet",
    },
    {
      nom: "Estova 2 Tablet",
    },
    {
      nom: "Endosis Tablet",
    },
    {
      nom: "Ebal 20 Tablet",
    },
    {
      nom: "Encorate Tablet",
    },
    {
      nom: "Enzar 10000 Capsule",
    },
    {
      nom: "Ezicas F 360 Nasal Spray",
    },
    {
      nom: "Etosys-MF Tablet",
    },
    {
      nom: "Exel GN Cream",
    },
    {
      nom: "Emprogest 8% Vaginal gel",
    },
    {
      nom: "EME OD Tablet MD",
    },
    {
      nom: "Ebernet Cream",
    },
    {
      nom: "Enoxarin 40 Injection",
    },
    {
      nom: "Encorate 300 Tablet",
    },
    {
      nom: "Evimectin-A Tablet",
    },
    {
      nom: "Enclex 60 Injection",
    },
    {
      nom: "Elosone-HT Cream",
    },
    {
      nom: "Eritel-AM Tablet",
    },
    {
      nom: "Esys-D Capsule SR",
    },
    {
      nom: "Etocox 90 Tablet",
    },
    {
      nom: "Emigo-MD Tablet",
    },
    {
      nom: "Epofit 10000IU Injection",
    },
    {
      nom: "Ezentia Tablet",
    },
    {
      nom: "Epitra 500 Tablet",
    },
    {
      nom: "Etosaid MR Tablet",
    },
    {
      nom: "Etoford 90 Tablet",
    },
    {
      nom: "Eglucent Rapid 100IU/ml Solution for Injection",
    },
    {
      nom: "Etolid-MR Tablet",
    },
    {
      nom: "Esofine 40 Tablet",
    },
    {
      nom: "Ezanic 20% Gel",
    },
    {
      nom: "Ecosprin Gold  10 Forte Capsule",
    },
    {
      nom: "Emidoxyn 5mg Tablet MD",
    },
    {
      nom: "Endobloc 5 Tablet",
    },
    {
      nom: "Etosaid 90 Tablet",
    },
    {
      nom: "Embeta AM 50 Tablet PR",
    },
    {
      nom: "Etoro 90mg Tablet",
    },
    {
      nom: "Eritel-Trio Tablet",
    },
    {
      nom: "Euthyrox 100 Tablet",
    },
    {
      nom: "Erythego Gel",
    },
    {
      nom: "Etowin MR 60mg/4mg Tablet",
    },
    {
      nom: "Equirab 1500 Injection",
    },
    {
      nom: "E-Tag Syrup",
    },
    {
      nom: "Eptus 50 Tablet",
    },
    {
      nom: "Emcor Cream",
    },
    {
      nom: "Etan-G Cream",
    },
    {
      nom: "Espin-AT Tablet",
    },
    {
      nom: "Espin-AT Tablet",
    },
    {
      nom: "Elriz XL Tablet",
    },
    {
      nom: "Esomac 20 Tablet",
    },
    {
      nom: "Entofoam Foam",
    },
    {
      nom: "Eco Tears Gel",
    },
    {
      nom: "Eva Q Syrup",
    },
    {
      nom: "Efnocar 20 Tablet",
    },
    {
      nom: "Eltocin Tablet",
    },
    {
      nom: "Enapril 5 Tablet",
    },
    {
      nom: "Ethasyl 250 Tablet",
    },
    {
      nom: "Eslizen 400mg Tablet",
    },
    {
      nom: "Emgra Tablet",
    },
    {
      nom: "Escigress 10 Tablet",
    },
    {
      nom: "Etex-T Tablet",
    },
    {
      nom: "Entehep 0.5 Tablet",
    },
    {
      nom: "Esipram 10 Tablet",
    },
    {
      nom: "Etova-MR Forte Tablet",
    },
    {
      nom: "Eslo-Tel 2.5mg Tablet",
    },
    {
      nom: "Esoz 20 Tablet",
    },
    {
      nom: "Eutropin 4IU Injection",
    },
    {
      nom: "Espin 2.5 Tablet",
    },
    {
      nom: "Entaliv 0.5 Tablet",
    },
    {
      nom: "Envas 10 Tablet",
    },
    {
      nom: "Ezanic 10% Cream",
    },
    {
      nom: "Esomefol Tablet",
    },
    {
      nom: "Embeta XR 12.5 Tablet",
    },
    {
      nom: "EC Pan DSR Capsule",
    },
    {
      nom: "Elocon Lotion",
    },
    {
      nom: "Etogesic 400 Tablet",
    },
    {
      nom: "Emty Oral Solution",
    },
    {
      nom: "EV 2mg Tablet",
    },
    {
      nom: "Escitalent 10 Tablet",
    },
    {
      nom: "Ezimet Cream",
    },
    {
      nom: "Exermet 500 SR Tablet",
    },
    {
      nom: "Episert Cream",
    },
    {
      nom: "Eritel H Tablet",
    },
    {
      nom: "Eslo-AT Tablet",
    },
    {
      nom: "Esam 2.5 Tablet",
    },
    {
      nom: "Eglucent Mix 50 100IU/ml Suspension for Injection",
    },
    {
      nom: "Esoz L Capsule SR",
    },
    {
      nom: "Etowin P 60mg/325mg Tablet",
    },
    {
      nom: "Eberjen-M Cream",
    },
    {
      nom: "Esgipyrin 50mg/325mg Tablet",
    },
    {
      nom: "Enzamide 40mg Capsule",
    },
    {
      nom: "Ezimet-F Cream",
    },
    {
      nom: "Evict Oral Solution",
    },
    {
      nom: "Efipres Injection",
    },
    {
      nom: "Etody 60 Tablet",
    },
    {
      nom: "Endokine 300mcg Injection",
    },
    {
      nom: "Efil 10mg Tablet",
    },
    {
      nom: "Etos 60 Tablet",
    },
    {
      nom: "Endothik Tablet",
    },
    {
      nom: "Eva Q Plus  Oral Emulsion Strawberry Mint Sugar Free",
    },
    {
      nom: "Eptoin 50 Tablet",
    },
    {
      nom: "Embeta 25 Tablet",
    },
    {
      nom: "Exel M Skin Cream",
    },
    {
      nom: "Emeset Injection 4ml",
    },
    {
      nom: "Ezhh Cream",
    },
    {
      nom: "Eflo Eye Drop",
    },
    {
      nom: "Emeset 4 ODT Tablet",
    },
    {
      nom: "Eyemac Eye Drop",
    },
    {
      nom: "Enzomac CM Particles",
    },
    {
      nom: "Eritel-CH 80 Tablet",
    },
    {
      nom: "Exenta 25 Tablet",
    },
    {
      nom: "Euglim-M 2 Tablet PR",
    },
    {
      nom: "Ethasyl T 500 mg/250 mg Tablet",
    },
    {
      nom: "Elvix Gel",
    },
    {
      nom: "Exena 25 Tablet ER",
    },
    {
      nom: "Eurepa MF 1 Tablet",
    },
    {
      nom: "Embeta-R 2.5 Tablet",
    },
    {
      nom: "Euglim 1 Tablet",
    },
    {
      nom: "Esokem -D Capsule SR",
    },
    {
      nom: "Eltroxin 88mcg Tablet",
    },
    {
      nom: "Eticort 6 Tablet",
    },
    {
      nom: "Enzoheal Forte Tablet",
    },
    {
      nom: "Esava Cream",
    },
    {
      nom: "Etofree 600 ER Tablet",
    },
    {
      nom: "Exel skin Cream",
    },
    {
      nom: "Edrive-TD Tablet",
    },
    {
      nom: "Embeta 50 Tablet",
    },
    {
      nom: "Etoford P 60 mg/325 mg Tablet",
    },
    {
      nom: "Enzoflam SV  Tablet",
    },
    {
      nom: "Ebspor Cream",
    },
    {
      nom: "Exsora Ointment",
    },
    {
      nom: "Etoford 120 Tablet",
    },
    {
      nom: "Eritel 20 Tablet",
    },
    {
      nom: "Esole Delayed Release Granules",
    },
    {
      nom: "Embeta-R 5 Tablet ER",
    },
    {
      nom: "Ect Plus Tablet",
    },
    {
      nom: "Eritel-CH 40 Trio Tablet",
    },
    {
      nom: "Enrifol 2mg Tablet",
    },
    {
      nom: "Erypeg 50mcg Injection",
    },
    {
      nom: "Eema Hmg 150IU Injection",
    },
    {
      nom: "Extralast Tablet",
    },
    {
      nom: "Effenac 600 Effervescent Tablet Orange",
    },
    {
      nom: "Enzosafe-D Tablet",
    },
    {
      nom: "Esam 5 Tablet",
    },
    {
      nom: "EJ  30 Tablet",
    },
    {
      nom: "Ebast Suspension",
    },
    {
      nom: "Escigress 5 Tablet",
    },
    {
      nom: "Encorate Chrono 400 Tablet CR",
    },
    {
      nom: "Ecothral 500mg Tablet",
    },
    {
      nom: "Essita 10 Tablet",
    },
    {
      nom: "Euglim-M 1 Tablet PR",
    },
    {
      nom: "Epilite Topical Solution",
    },
    {
      nom: "Eleftha 440mg Injection",
    },
    {
      nom: "Embeta-TM 25 Tablet ER",
    },
    {
      nom: "Epsolin ER 300 Tablet",
    },
    {
      nom: "Exizol Shampoo",
    },
    {
      nom: "Etova 200 Tablet",
    },
    {
      nom: "Eslo-Tel 5mg Tablet",
    },
    {
      nom: "Ebamont Tablet",
    },
    {
      nom: "Etorica 120 Tablet",
    },
    {
      nom: "Elores 3000mg Injection",
    },
    {
      nom: "Esurance Tablet",
    },
    {
      nom: "Erzol-D Capsule SR",
    },
    {
      nom: "Eritel LN 80 Tablet",
    },
    {
      nom: "Elicia 4 Tablet",
    },
    {
      nom: "Exermet GM 502 Tablet PR",
    },
    {
      nom: "Ericlear Cream",
    },
    {
      nom: "Eva Q Syrup Child Pack",
    },
    {
      nom: "Encorate Oral Solution",
    },
    {
      nom: "Esiflo 100 Transcaps",
    },
    {
      nom: "Etoshine NP Tablet PR",
    },
    {
      nom: "Eva Q Fiber Granules",
    },
    {
      nom: "Entrak Soothe Eye Ointment",
    },
    {
      nom: "Entacom Tablet",
    },
    {
      nom: "Esomac D 20 Capsule SR",
    },
    {
      nom: "Enapril-HT Tablet",
    },
    {
      nom: "Ethasyl Injection",
    },
    {
      nom: "Epival Tablet",
    },
    {
      nom: "Ethamcip 250mg Tablet",
    },
    {
      nom: "Etospeed 90 Tablet",
    },
    {
      nom: "Etogesic T Tablet",
    },
    {
      nom: "Endonok Tablet",
    },
    {
      nom: "Equisulin-M 30 100IU/ml",
    },
    {
      nom: "Etofex 120mg Tablet",
    },
    {
      nom: "Ebernet Lot",
    },
    {
      nom: "Ebal 10 Tablet",
    },
    {
      nom: "Ezact 120 Tablet",
    },
    {
      nom: "Enapril 2.5 Tablet",
    },
    {
      nom: "Epsolin 300 Tablet",
    },
    {
      nom: "Emluz Cream",
    },
    {
      nom: "Emefilm Orally Disintegrating Strip",
    },
    {
      nom: "Eyebrex 0.3% Liquifilm",
    },
    {
      nom: "Epival Oral Solution",
    },
    {
      nom: "ESGIPYRIN DS INJECTION",
    },
    {
      nom: "Epineuron SR Tablet",
    },
    {
      nom: "Eberfun Cream",
    },
    {
      nom: "Esta 10 Tablet",
    },
    {
      nom: "Eberwin Cream",
    },
    {
      nom: "Entavir 1mg Tablet",
    },
    {
      nom: "Etoxib 60 Tablet",
    },
    {
      nom: "Esys Tablet",
    },
    {
      nom: "Epilex Oral Solution",
    },
    {
      nom: "Epilive 750 Tablet",
    },
    {
      nom: "Etody 120 Tablet",
    },
    {
      nom: "Exermet GM 501 Tablet PR",
    },
    {
      nom: "Escipra 10 Tablet",
    },
    {
      nom: "Eberclin Cream",
    },
    {
      nom: "Etrobax 120 Tablet",
    },
    {
      nom: "Ethinorm P 5mg Tablet",
    },
    {
      nom: "Emestat OD Tablet",
    },
    {
      nom: "EN-Clofert 50 Tablet",
    },
    {
      nom: "Etaze-ID Cream",
    },
    {
      nom: "Efonta 40mg Tablet",
    },
    {
      nom: "Endobreak 2mg Tablet",
    },
    {
      nom: "Ebal-M Tablet",
    },
    {
      nom: "Ebuxo 40 Tablet",
    },
    {
      nom: "Enzox-Forte Tablet",
    },
    {
      nom: "Etorite MR 400mg/4mg Tablet",
    },
    {
      nom: "Euclide M 30 OD Tablet ER",
    },
    {
      nom: "Enliva 20mg/75mg Capsule SR",
    },
    {
      nom: "Efzu Tablet PR",
    },
    {
      nom: "Epilive 250 Tablet",
    },
    {
      nom: "Emlevo 500 Tablet",
    },
    {
      nom: "Euthyrox 75 Tablet",
    },
    {
      nom: "Eberjen Cream",
    },
    {
      nom: "Edinase-D  Tablet",
    },
    {
      nom: "Etornext-TH Tablet",
    },
    {
      nom: "Esiflo 500 Transcaps",
    },
    {
      nom: "Eternex-T Tablet",
    },
    {
      nom: "Euglim 2 Tablet",
    },
    {
      nom: "Etaze-AF Lotion",
    },
    {
      nom: "Evict XF Solution",
    },
    {
      nom: "Erox CV Dry Syrup",
    },
    {
      nom: "Eurolide 3.75mg Depot Injection",
    },
    {
      nom: "Ezicas Nasal Spray",
    },
    {
      nom: "Esobiz-L Capsule SR",
    },
    {
      nom: "Embeta XR 100 Tablet",
    },
    {
      nom: "Ezeepam 5 Tablet",
    },
    {
      nom: "Embeta AM 25 Tablet PR",
    },
    {
      nom: "Epofit 5000IU Injection",
    },
    {
      nom: "Epocept 4000IU Injection",
    },
    {
      nom: "Enpred Eye Drop",
    },
    {
      nom: "Ensarin-MF Cream",
    },
    {
      nom: "Euclide M 60 OD Tablet ER",
    },
    {
      nom: "Esokem-L Capsule SR",
    },
    {
      nom: "Eritel B 40mg/50mg Tablet PR",
    },
    {
      nom: "Espin TM  Tablet",
    },
    {
      nom: "Entacom Plus 100 Tablet",
    },
    {
      nom: "Eglucent Rapid 100IU/ml Kwikpen",
    },
    {
      nom: "Etowin 60mg Tablet",
    },
    {
      nom: "Etonow-MR Tablet",
    },
    {
      nom: "Edinase  -DS Tablet",
    },
    {
      nom: "Erypro 4000IU Injection",
    },
    {
      nom: "Etorica 60 Tablet",
    },
    {
      nom: "Eurepa-V 1/0.2 Tablet",
    },
    {
      nom: "Easyfive-TT Vaccine",
    },
    {
      nom: "Eslo Tan Tablet",
    },
    {
      nom: "Endogest 400 SR Tablet",
    },
    {
      nom: "Elcephase 500mg Tablet",
    },
    {
      nom: "Epinext 500 Tablet",
    },
    {
      nom: "Esiflo Hfa 125 Transhaler",
    },
    {
      nom: "E-Ova L 2.5 Tablet",
    },
    {
      nom: "Espidase 10mg Tablet",
    },
    {
      nom: "Etoxib 120 Tablet",
    },
    {
      nom: "Eslot 5mg Tablet",
    },
    {
      nom: "Estina Eye Drop",
    },
    {
      nom: "Eritel B 40mg/25mg Tablet PR",
    },
    {
      nom: "Efficort Cream",
    },
    {
      nom: "Ebernet Cream",
    },
    {
      nom: "Eslo-Met 2.5 Tablet",
    },
    {
      nom: "Etosaid 60 Tablet",
    },
    {
      nom: "Eglucent Mix 25 Kwikpen 100IU/ml",
    },
    {
      nom: "Eslo-5 AT Tablet",
    },
    {
      nom: "Escnx 10mg Tablet",
    },
    {
      nom: "Enfiera 500mg Injection",
    },
    {
      nom: "Enoxarin 60 Injection",
    },
    {
      nom: "Etoriflex-MR4 Tablet",
    },
    {
      nom: "Ebasil 20 Tablet",
    },
    {
      nom: "Enzase 10000 Tablet",
    },
    {
      nom: "Ebmont FX3 Tablet",
    },
    {
      nom: "Etotol 150 Tablet",
    },
    {
      nom: "Evict Fibre Granules",
    },
    {
      nom: "Eritel 80 Tablet",
    },
    {
      nom: "Epilive Syrup",
    },
    {
      nom: "Eco Tears XL Eye Drop",
    },
    {
      nom: "Etorvel 90 Tablet",
    },
    {
      nom: "Endogest 100 Capsule",
    },
    {
      nom: "Eclospan Cream",
    },
    {
      nom: "Erypeg 75mcg Injection",
    },
    {
      nom: "Evopin 400 Capsule",
    },
    {
      nom: "Emgrast 300mcg Injection",
    },
    {
      nom: "Eberclin-M Cream",
    },
    {
      nom: "Eubri Eye Drop",
    },
    {
      nom: "Ecoglip-T Tablet",
    },
    {
      nom: "Eternex-M 500 Tablet SR",
    },
    {
      nom: "Ebermed 1% Cream",
    },
    {
      nom: "Eritel-CH 80 Trio Tablet",
    },
    {
      nom: "Ezuric 25mg Tablet",
    },
    {
      nom: "Eslizen 600mg Tablet",
    },
    {
      nom: "Envas H Tablet",
    },
    {
      nom: "Exermet 1000 Tablet SR",
    },
    {
      nom: "Enace D 10 Tablet",
    },
    {
      nom: "Endobloc 10 Tablet",
    },
    {
      nom: "Encorate Chrono 600 Tablet CR",
    },
    {
      nom: "Eslo 1.25 Tablet",
    },
    {
      nom: "Etofine MR 60mg/4mg Capsule",
    },
    {
      nom: "Esam-AT Tablet",
    },
    {
      nom: "Elmovel TF Gel",
    },
    {
      nom: "Ebasil Tablet",
    },
    {
      nom: "Enam 10 Tablet",
    },
    {
      nom: "Eplerite 25 Tablet",
    },
    {
      nom: "Eurepa-V 0.5/0.3 Tablet",
    },
    {
      nom: "Eudyna Cream",
    },
    {
      nom: "Etaze HT Cream",
    },
    {
      nom: "Ect 60 Tablet",
    },
    {
      nom: "Exermet GM Forte 2 Tablet PR",
    },
    {
      nom: "Elicia 8 Tablet",
    },
    {
      nom: "Eprytor-A Tablet SR",
    },
    {
      nom: "Entacom Plus 150 Tablet",
    },
    {
      nom: "Etosaid 120 Tablet",
    },
    {
      nom: "Etaze-AF Cream",
    },
    {
      nom: "Euclide 80 Tablet",
    },
    {
      nom: "Ethimom Cream",
    },
    {
      nom: "Ecorab D Capsule SR",
    },
    {
      nom: "Ezeepam 10 Tablet",
    },
    {
      nom: "Eukarit 100 Capsule",
    },
    {
      nom: "Epotrend 4000 Injection",
    },
    {
      nom: "Escnx 5mg Tablet",
    },
    {
      nom: "Endocryl 0.5ml Injection",
    },
    {
      nom: "Ebercos Cream",
    },
    {
      nom: "Enzase 25000 Tablet",
    },
    {
      nom: "Epalrica-M Tablet SR",
    },
    {
      nom: "Epilive ER 1000 Tablet",
    },
    {
      nom: "Ethislone 16mg Tablet",
    },
    {
      nom: "Etofine 90mg Capsule",
    },
    {
      nom: "Escitalent 5 Tablet",
    },
    {
      nom: "Evoxil-HP Kit",
    },
    {
      nom: "Epsolin ER 200 Tablet",
    },
    {
      nom: "Eveglow Cream",
    },
    {
      nom: "Edinase  Tablet",
    },
    {
      nom: "Ebermac Cream",
    },
    {
      nom: "Escipra 15mg Tablet",
    },
    {
      nom: "Ethored TX 250mg/250mg Tablet",
    },
    {
      nom: "Endor Eye Drop",
    },
    {
      nom: "Ebov MR  4 Tablet",
    },
    {
      nom: "Eberfine Cream",
    },
    {
      nom: "Etorite Tablet PR",
    },
    {
      nom: "Ebov 90 Tablet",
    },
    {
      nom: "Epineuron Tablet",
    },
    {
      nom: "Evict Oral Solution",
    },
    {
      nom: "Espin MT Tablet ER",
    },
    {
      nom: "Ephedrex Plus Expectorant",
    },
    {
      nom: "Esolyst-D Capsule SR",
    },
    {
      nom: "Exocast Tablet",
    },
    {
      nom: "Espidase D Tablet",
    },
    {
      nom: "Ethione CR 15 Tablet",
    },
    {
      nom: "Excex Gel",
    },
    {
      nom: "Excex Gel",
    },
    {
      nom: "Etonow 90 Tablet",
    },
    {
      nom: "Eberderm Cream",
    },
    {
      nom: "Eclo Cream",
    },
    {
      nom: "Ezimet-S Ointment",
    },
    {
      nom: "Esmozole DSR Capsule",
    },
    {
      nom: "Ezanic 10% Gel",
    },
    {
      nom: "Eritel 80-H Tablet",
    },
    {
      nom: "Ebmont FX 10mg/120mg Tablet",
    },
    {
      nom: "Espin H 2.5 mg/12.5 mg Tablet",
    },
    {
      nom: "Endofit Tablet",
    },
    {
      nom: "Eslizen 800mg Tablet",
    },
    {
      nom: "Epirate Chrono 500 Tablet",
    },
    {
      nom: "Erbimesh Cream",
    },
    {
      nom: "Escipra 5 Tablet",
    },
    {
      nom: "Emprogest -SR 300 Tablet",
    },
    {
      nom: "Episert Cream",
    },
    {
      nom: "Epitrate Injection 1 ml",
    },
    {
      nom: "Eltroxin 75mcg Tablet",
    },
    {
      nom: "Exinia 25 Tablet",
    },
    {
      nom: "Eternex-M 1000 Tablet SR",
    },
    {
      nom: "Escipra 20 Tablet",
    },
    {
      nom: "Escitalent 20 Tablet",
    },
    {
      nom: "Eglucent Mix 50 Kwikpen 100IU/ml",
    },
    {
      nom: "Emrolfin Cream",
    },
    {
      nom: "Enoxatroy 40mg Injection",
    },
    {
      nom: "Ecofab-HA Eye Drop",
    },
    {
      nom: "Ebonte-M Tablet",
    },
    {
      nom: "Eliwel 75mg Tablet",
    },
    {
      nom: "Evimeto 50 Tablet PR",
    },
    {
      nom: "Evict XF Solution",
    },
    {
      nom: "Ecopan DSR 30 mg/20 mg Tablet",
    },
    {
      nom: "Euthyroid 50 Tablet",
    },
    {
      nom: "Exenta 50 Tablet",
    },
    {
      nom: "Eflo 0.1% Eye Ointment",
    },
    {
      nom: "Eleftha 150mg Injection",
    },
    {
      nom: "Evimeto 25 Tablet PR",
    },
    {
      nom: "Efavir 600 Tablet",
    },
    {
      nom: "Eliptin M 500mg/20mg Tablet SR",
    },
    {
      nom: "Endometryl 200mg Capsule",
    },
    {
      nom: "Egeptin 16mg Tablet",
    },
    {
      nom: "Etonow 120 Tablet",
    },
    {
      nom: "Encelax Syrup",
    },
    {
      nom: "Eclo 6 Ointment",
    },
    {
      nom: "Euthyroid 25 Tablet",
    },
    {
      nom: "Eczmate-F Cream",
    },
    {
      nom: "Easyaid 1 Tablet PR",
    },
    {
      nom: "Elesert 100 Tablet",
    },
    {
      nom: "Enzrid-DS Tablet",
    },
    {
      nom: "Enzoloy H Tablet",
    },
    {
      nom: "Enzrid 90mg/48mg/100mg Tablet",
    },
    {
      nom: "Ebspor Cream",
    },
    {
      nom: "Espin 1.25mg Tablet",
    },
    {
      nom: "Endyze 170 mg/80 mg Tablet",
    },
    {
      nom: "Etrovis 90 Tablet",
    },
    {
      nom: "Euthyroid 100 Tablet",
    },
    {
      nom: "Etorvel 120mg Tablet",
    },
    {
      nom: "Eglucent Kwikpen",
    },
    {
      nom: "Era-H Tablet",
    },
    {
      nom: "Enzowin-D  Tablet",
    },
    {
      nom: "Eberwin Cream",
    },
    {
      nom: "Emesafe Oral Spray",
    },
    {
      nom: "Efiglin-M 500mg/20mg Tablet ER",
    },
    {
      nom: "Erbinox Tablet",
    },
    {
      nom: "Erbinox Tablet",
    },
    {
      nom: "Elocon Ointment",
    },
    {
      nom: "Enzigest 25000 Capsule",
    },
    {
      nom: "Etogrand 90 Tablet",
    },
    {
      nom: "E-Vir Tablet",
    },
    {
      nom: "Erophylline 100mg Capsule",
    },
    {
      nom: "Enristas 2MF Tablet PR",
    },
    {
      nom: "Endoformin VG  2mg/500mg/0.2mg Tablet ER",
    },
    {
      nom: "Evoxil CV 500mg/125mg Tablet",
    },
    {
      nom: "Evoxil CV 500mg/125mg Tablet",
    },
    {
      nom: "Endoformin PG 2mg/500mg/15mg Tablet ER",
    },
    {
      nom: "E Tel 40mg Tablet",
    },
    {
      nom: "Ezimet Cream",
    },
    {
      nom: "Exermet GM 0.5 Tablet SR",
    },
    {
      nom: "Esitamat 20 Tablet",
    },
    {
      nom: "Endofil Tablet",
    },
    {
      nom: "Epinext 250 Tablet",
    },
    {
      nom: "Etomav 90 Tablet",
    },
    {
      nom: "Exeption 500 Tablet",
    },
    {
      nom: "Eribilin Injection",
    },
    {
      nom: "Exapace Gel",
    },
    {
      nom: "Etorip-MR Tablet",
    },
    {
      nom: "Eticort 30 Tablet",
    },
    {
      nom: "Emimont 5mg/10mg Tablet",
    },
    {
      nom: "Enzowin-D  Softgel Capsule",
    },
    {
      nom: "Eczrid Forte Lotion",
    },
    {
      nom: "Erafate-O Oral Suspension",
    },
    {
      nom: "Etoroxi 120 Tablet",
    },
    {
      nom: "Etoroxi 120 Tablet",
    },
    {
      nom: "Etomav 120 Tablet",
    },
    {
      nom: "Flucos Gel",
    },
    {
      nom: "Febrex 500mg Tablet",
    },
    {
      nom: "Foracort Forte Inhaler",
    },
    {
      nom: "Flunil Suspension",
    },
    {
      nom: "Fertyl Super 100mg Tablet",
    },
    {
      nom: "Febuday 40 Tablet",
    },
    {
      nom: "Fibrovas Tablet",
    },
    {
      nom: "Flunil 60 Capsule",
    },
    {
      nom: "Flotral D Tablet",
    },
    {
      nom: "Fosfoe Powder Delicious Mango",
    },
    {
      nom: "Flusid Cream",
    },
    {
      nom: "Fusirose Lotion",
    },
    {
      nom: "Fungicip 200 Tablet",
    },
    {
      nom: "Fabulas 40 Tablet",
    },
    {
      nom: "Fibator 20 Tablet",
    },
    {
      nom: "Febuget 80 Tablet",
    },
    {
      nom: "Formonide 400 Respicaps",
    },
    {
      nom: "Fexy Oral Suspension",
    },
    {
      nom: "Flacort 6mg Tablet",
    },
    {
      nom: "Fluner 5 Tablet",
    },
    {
      nom: "Febrex Plus AF Syrup",
    },
    {
      nom: "Floatin 20mg Tablet",
    },
    {
      nom: "Forcef 250mg Tablet",
    },
    {
      nom: "Flexabenz ER Capsule",
    },
    {
      nom: "Fungikem 200 Capsule",
    },
    {
      nom: "Forcef-CV 250 Tablet",
    },
    {
      nom: "Floxip 250 Tablet",
    },
    {
      nom: "Frusenex 100 Tablet",
    },
    {
      nom: "Faceclin AT Gel",
    },
    {
      nom: "Flohale 0.5mg Respules 2ml",
    },
    {
      nom: "Funzi-NM Cream",
    },
    {
      nom: "Forcan 200mg Infusion",
    },
    {
      nom: "Flucos 400mg Tablet",
    },
    {
      nom: "Fungikem 100 Capsule",
    },
    {
      nom: "Fintop-AF Cream",
    },
    {
      nom: "Flexaid D Tablet",
    },
    {
      nom: "Finacet 1mg Tablet",
    },
    {
      nom: "Flumet 150mg Tablet",
    },
    {
      nom: "Futop Cream",
    },
    {
      nom: "Folitrax 50 Injection",
    },
    {
      nom: "Fexy 120 Tablet",
    },
    {
      nom: "Flurish Tablet",
    },
    {
      nom: "Fudic BNF Cream",
    },
    {
      nom: "Fullform 200 Rotacap",
    },
    {
      nom: "Flublock-AZ Nasal Spray",
    },
    {
      nom: "Flucold Oral Drops",
    },
    {
      nom: "Femovan Tablet",
    },
    {
      nom: "Fibator 5 Tablet",
    },
    {
      nom: "Fine Nerve Soft Gelatin Capsule",
    },
    {
      nom: "Fluvoxin CR 50 Tablet",
    },
    {
      nom: "Fomtide 200 Inhaler",
    },
    {
      nom: "Fusigen Spray",
    },
    {
      nom: "FCN 200mg Tablet",
    },
    {
      nom: "Flutrol 250 Capsule",
    },
    {
      nom: "Ferinject 50mg/ml Solution for Injection",
    },
    {
      nom: "Fubox 40 Tablet",
    },
    {
      nom: "Freego Granules",
    },
    {
      nom: "Fucidin Ointment",
    },
    {
      nom: "Funzi-IT 200 Capsule",
    },
    {
      nom: "Femoston Tablet",
    },
    {
      nom: "Finabald 1mg Tablet",
    },
    {
      nom: "Fertolet Tablet",
    },
    {
      nom: "Feldex Tablet",
    },
    {
      nom: "Febuxor 40 Tablet",
    },
    {
      nom: "Fabiflu 400 Tablet",
    },
    {
      nom: "Femipristal Tablet",
    },
    {
      nom: "Fegus Vaginal Capsule",
    },
    {
      nom: "FML NEO Liquifilm",
    },
    {
      nom: "Folitrax 25 Tablet",
    },
    {
      nom: "Foracort 100 Rotacap",
    },
    {
      nom: "Flutrol 250 Inhaler",
    },
    {
      nom: "Fibator LS Tablet",
    },
    {
      nom: "Fosfona Powder",
    },
    {
      nom: "Flucos 200 Tablet",
    },
    {
      nom: "Flucold AF Oral Drops",
    },
    {
      nom: "Flavedon 20 Tablet",
    },
    {
      nom: "Finecef 200mg Tablet DT",
    },
    {
      nom: "Fragmin 2500IU Injection",
    },
    {
      nom: "Formonide 1mg Respules 2ml",
    },
    {
      nom: "Fibrodone Tablet",
    },
    {
      nom: "Flumet 200mg Tablet",
    },
    {
      nom: "Febrinil M Syrup",
    },
    {
      nom: "Febuset 40 Tablet",
    },
    {
      nom: "Flomon Eye Drop",
    },
    {
      nom: "Fondaflo 2.5 Injection",
    },
    {
      nom: "Flonida 1% Cream",
    },
    {
      nom: "Febutax 80 Tablet",
    },
    {
      nom: "Febugood 40 Tablet",
    },
    {
      nom: "Fusys DT Tablet",
    },
    {
      nom: "Formin PG 2 Tablet SR",
    },
    {
      nom: "Fungicros Cream",
    },
    {
      nom: "Floace-T Opthalmic Suspension",
    },
    {
      nom: "Flurbin Eye Drop",
    },
    {
      nom: "Febrex Plus AF Oral Drops",
    },
    {
      nom: "Fusigen-DP Cream",
    },
    {
      nom: "FXR 10 Tablet",
    },
    {
      nom: "Flucort Forte Lotion",
    },
    {
      nom: "Formoflo Forte Transcaps",
    },
    {
      nom: "Femcinol-ADP Gel",
    },
    {
      nom: "Fludac 60 Capsule",
    },
    {
      nom: "Flexbumin 20% Infusion",
    },
    {
      nom: "Flavospas O 200 mg/200 mg Tablet",
    },
    {
      nom: "Fevago DS Suspension",
    },
    {
      nom: "Forcan 50 Tablet",
    },
    {
      nom: "Febrinil 650mg Tablet",
    },
    {
      nom: "Folisurge 150 Injection",
    },
    {
      nom: "Fiasp 100IU/ml Solution for Injection",
    },
    {
      nom: "Finobrate 145mg Tablet",
    },
    {
      nom: "Fludot 0.5mg Injection",
    },
    {
      nom: "Fungeeheal 200 Capsule",
    },
    {
      nom: "Fenceta Plus 100mg/162.5mg Suspension",
    },
    {
      nom: "Fusinol Cream",
    },
    {
      nom: "Fexova 120 Tablet",
    },
    {
      nom: "Flucos Lotion",
    },
    {
      nom: "Febumac 80 Tablet",
    },
    {
      nom: "Frext 50 Tablet",
    },
    {
      nom: "Fungiset 150mg Tablet",
    },
    {
      nom: "Folitrax 25 Injection",
    },
    {
      nom: "ForAir 250 CFC Free Inhaler",
    },
    {
      nom: "Fosavance  70 mg/5600 IU Tablet",
    },
    {
      nom: "Fortibile 150 Tablet",
    },
    {
      nom: "Facer Sera Tablet",
    },
    {
      nom: "Formosone 250 Respicap",
    },
    {
      nom: "Flecarite 100 Tablet",
    },
    {
      nom: "Fenazol 150 Tablet",
    },
    {
      nom: "Finehart Tablet",
    },
    {
      nom: "Femoston Conti 1mg/5mg Tablet",
    },
    {
      nom: "Flutivate 0.005% Ointment",
    },
    {
      nom: "Fexolife M 10 mg/120 mg Tablet",
    },
    {
      nom: "Febuvel 40mg Tablet",
    },
    {
      nom: "Fomtide 400 Octacaps",
    },
    {
      nom: "Feliz-S 20 Tablet",
    },
    {
      nom: "FZHH Tablet",
    },
    {
      nom: "Fbt 40 Tablet",
    },
    {
      nom: "Fiberlact Granules",
    },
    {
      nom: "Fungdid B Cream",
    },
    {
      nom: "FT-Mac Cream",
    },
    {
      nom: "Fluvator 50 Tablet",
    },
    {
      nom: "Funzi-IT 100mg Capsule",
    },
    {
      nom: "Fenixa 180 Tablet",
    },
    {
      nom: "Fasigyn DS 1000mg Tablet",
    },
    {
      nom: "Fexy 180 Tablet",
    },
    {
      nom: "Fenocor 67mg Capsule",
    },
    {
      nom: "Fourderm Cream",
    },
    {
      nom: "For-IC Capsule",
    },
    {
      nom: "Floace Ophthalmic Suspension",
    },
    {
      nom: "Fluticort F 250 Capsule",
    },
    {
      nom: "Flutee 40mg Capsule",
    },
    {
      nom: "Formonide Forte Respicap",
    },
    {
      nom: "Fullform 400 Rotacap",
    },
    {
      nom: "Formoflo 125 Transhaler",
    },
    {
      nom: "Flutas 400mg Tablet",
    },
    {
      nom: "Floatin 10mg Tablet",
    },
    {
      nom: "Flucos DT 50 Tablet",
    },
    {
      nom: "Feboxa 80 Tablet",
    },
    {
      nom: "Fusee Ointment",
    },
    {
      nom: "Frext CR 100 Tablet",
    },
    {
      nom: "Fexofen 120 Tablet",
    },
    {
      nom: "Floatin 40mg Tablet",
    },
    {
      nom: "Foligraf 150IU Injection",
    },
    {
      nom: "Faxicad 400 Tablet",
    },
    {
      nom: "Fungizole Cream",
    },
    {
      nom: "FM Derma Ointment",
    },
    {
      nom: "Fondum 2.5mg Injection",
    },
    {
      nom: "Formonide 100 Inhaler",
    },
    {
      nom: "Fungikem 200 Capsule",
    },
    {
      nom: "Fondared 7.5 Injection",
    },
    {
      nom: "Formost 200 Respicap",
    },
    {
      nom: "Fomtide 200 Octacap",
    },
    {
      nom: "Fusiwal Cream",
    },
    {
      nom: "Fungeeheal 100 Capsule",
    },
    {
      nom: "Fourderm Cream",
    },
    {
      nom: "Freelac Granules Orange Lemon",
    },
    {
      nom: "Flutas 150 Tablet",
    },
    {
      nom: "Formin Plus  500 Tablet SR",
    },
    {
      nom: "Folitrax 20 Injection",
    },
    {
      nom: "Fritolev 500 Tablet",
    },
    {
      nom: "Frext 100 Tablet",
    },
    {
      nom: "Fenza-L Cream",
    },
    {
      nom: "ForAir 250 Respicap",
    },
    {
      nom: "Fabiflu Tablet",
    },
    {
      nom: "Flame 20mg Tablet",
    },
    {
      nom: "Fibrogesic N Tablet",
    },
    {
      nom: "Febs Tablet",
    },
    {
      nom: "Foxstat 80 Tablet",
    },
    {
      nom: "Firmagon 80mg Injection",
    },
    {
      nom: "Fexocet 180mg Tablet",
    },
    {
      nom: "Femcinol-A Gel",
    },
    {
      nom: "Fintrix Tablet",
    },
    {
      nom: "Fbx 80 Tablet",
    },
    {
      nom: "Famcimac 250 Tablet",
    },
    {
      nom: "Flublock Nasal Spray",
    },
    {
      nom: "Flugesic SR Tablet",
    },
    {
      nom: "Femitraz Tablet",
    },
    {
      nom: "Flexilor 8 Tablet",
    },
    {
      nom: "Fluoren Nasal Spray",
    },
    {
      nom: "Facer-MR Tablet",
    },
    {
      nom: "Funzi-L Lotion Alcohol Free",
    },
    {
      nom: "Floxsafe 400 Tablet",
    },
    {
      nom: "Flupanol 10mg Tablet",
    },
    {
      nom: "Fintop-AF Cream",
    },
    {
      nom: "Fenti Vaginal Capsule",
    },
    {
      nom: "Fever-X Tablet",
    },
    {
      nom: "Fluticort F 250 Inhaler",
    },
    {
      nom: "Formosone 250 CFC Free Inhaler",
    },
    {
      nom: "Florina G 0.05mg/0.25mg Tablet",
    },
    {
      nom: "Finacet 5mg Tablet",
    },
    {
      nom: "Fungid Best 150mg Tablet",
    },
    {
      nom: "Fluvator 100 Tablet",
    },
    {
      nom: "Fostera 20 mg/10 mg Tablet",
    },
    {
      nom: "Fungikem 100 Capsule",
    },
    {
      nom: "Flohale 2mg Respules 2ml",
    },
    {
      nom: "F Next Dusting Powder",
    },
    {
      nom: "Flarex  Ophthalmic Suspension",
    },
    {
      nom: "Funzi-L Cream",
    },
    {
      nom: "Forlast 2.5mg Tablet",
    },
    {
      nom: "Finap Tablet",
    },
    {
      nom: "Fusibest Cream",
    },
    {
      nom: "Fexofen 180mg Tablet",
    },
    {
      nom: "Fibricor Injection",
    },
    {
      nom: "Fintrix 500 Tablet",
    },
    {
      nom: "Fentiderm Cream",
    },
    {
      nom: "Fusiron Cream",
    },
    {
      nom: "Fexolife 180 Tablet",
    },
    {
      nom: "Furotop FA Cream",
    },
    {
      nom: "Fonafirst 1% Cream",
    },
    {
      nom: "Formonide Forte 12mcg/400mcg Inhaler",
    },
    {
      nom: "Febucip 80 Tablet",
    },
    {
      nom: "Formost 400 Respicap",
    },
    {
      nom: "Fusiwal B Cream",
    },
    {
      nom: "Fusiderm Ointment",
    },
    {
      nom: "Finetret Soft Gelatin Capsule",
    },
    {
      nom: "Funzi Tablet",
    },
    {
      nom: "Finabald 2.5mg Tablet",
    },
    {
      nom: "Formosone Forte Respicap",
    },
    {
      nom: "Flosoft Eye Drop",
    },
    {
      nom: "Formost 200 Inhaler",
    },
    {
      nom: "Fuzinix Cream",
    },
    {
      nom: "Fusiscalp Lotion",
    },
    {
      nom: "Fibroprist Tablet",
    },
    {
      nom: "Fomtide 400 CFC Free Inhaler",
    },
    {
      nom: "Fondazest 7.5 Injection",
    },
    {
      nom: "Flutee 60mg Capsule",
    },
    {
      nom: "Flurisone Eye Ointment",
    },
    {
      nom: "Fenixa 120 Tablet",
    },
    {
      nom: "Femcort 0.1% Cream",
    },
    {
      nom: "Fenza Cream",
    },
    {
      nom: "Febuday 80 Tablet",
    },
    {
      nom: "Fusicare Cream",
    },
    {
      nom: "Fevago 120mg Oral Suspension Strawberry",
    },
    {
      nom: "Forzid 2gm Injection",
    },
    {
      nom: "Febugood 80 Tablet",
    },
    {
      nom: "ForAir 500 Respicap",
    },
    {
      nom: "Firsito 10 Tablet",
    },
    {
      nom: "Fensupp 12.5 Suppository",
    },
    {
      nom: "Formoflo 6mcg/100mcg Transcaps",
    },
    {
      nom: "Fertigyn HP 2000 Injection",
    },
    {
      nom: "Fungicip 150mg Tablet",
    },
    {
      nom: "FM 1 Eye Drop",
    },
    {
      nom: "Fudic Cream",
    },
    {
      nom: "Foracort 200 Autohaler",
    },
    {
      nom: "Flucos ITZ 200 Capsule",
    },
    {
      nom: "Fosabest Tablet",
    },
    {
      nom: "Fingomod Capsule",
    },
    {
      nom: "Forfora-Z Shampoo",
    },
    {
      nom: "Fungotek Cream",
    },
    {
      nom: "Fexokast 10 mg/120 mg Tablet",
    },
    {
      nom: "Finabald 5mg Tablet",
    },
    {
      nom: "Fulite Cream",
    },
    {
      nom: "Fluzol 150mg Tablet",
    },
    {
      nom: "Formost 400 Inhaler",
    },
    {
      nom: "Floxiwave 20 Capsule",
    },
    {
      nom: "Funspor Dusting Powder",
    },
    {
      nom: "Flucos ITZ 100 Capsule",
    },
    {
      nom: "Fosidal Powder",
    },
    {
      nom: "Fusoceff CV 200mg/125mg Tablet",
    },
    {
      nom: "Fubox 80 Tablet",
    },
    {
      nom: "Fensupp 100 Suppository",
    },
    {
      nom: "Fusirose 2% Cream",
    },
    {
      nom: "Fulviglen 250mg Injection",
    },
    {
      nom: "Fevago 100mg/ml Drop",
    },
    {
      nom: "Fusiwal Ointment",
    },
    {
      nom: "Folitrax 7.5mg Injection",
    },
    {
      nom: "Faxicad 200mg Tablet",
    },
    {
      nom: "Fungerase-L Cream",
    },
    {
      nom: "Flumet 1% Soap",
    },
    {
      nom: "Finetears Eye Drop",
    },
    {
      nom: "Febuxor 80 Tablet",
    },
    {
      nom: "Fentimax Cream",
    },
    {
      nom: "Fxla 180 Tablet",
    },
    {
      nom: "Flupanol 5mg Tablet",
    },
    {
      nom: "Fintrix Cream",
    },
    {
      nom: "Febuset 80 Tablet",
    },
    {
      nom: "Fungidust Dusting Powder",
    },
    {
      nom: "Formin Plus  1000 Tablet SR",
    },
    {
      nom: "Fimagen 60 Tablet",
    },
    {
      nom: "ForAir 125 CFC free Inhaler",
    },
    {
      nom: "Fludafos 3gm Powder Vanilla",
    },
    {
      nom: "Fritolev 750 Tablet",
    },
    {
      nom: "Fusee-B Cream",
    },
    {
      nom: "Fibrocet 50 Tablet",
    },
    {
      nom: "Fuket Soap",
    },
    {
      nom: "Fiboresp Tablet",
    },
    {
      nom: "Fabulas 80 Tablet",
    },
    {
      nom: "Fmine 100 Tablet",
    },
    {
      nom: "Folimet 5mg Tablet",
    },
    {
      nom: "Flucos Dusting Powder",
    },
    {
      nom: "Fluanxol 3mg Tablet",
    },
    {
      nom: "Flunam 20mg Capsule",
    },
    {
      nom: "Fbt 80 Tablet",
    },
    {
      nom: "Fucross-B Solution",
    },
    {
      nom: "Foseal 800 Tablet",
    },
    {
      nom: "Fovepta 200IU Solution for Injection",
    },
    {
      nom: "Flan Eye Ointment",
    },
    {
      nom: "Fuderm Cream",
    },
    {
      nom: "Febubest 80 Tablet",
    },
    {
      nom: "Fluguard 400 Tablet",
    },
    {
      nom: "Fintrix Cream",
    },
    {
      nom: "Fenograf S 360mg Tablet",
    },
    {
      nom: "Flucalup 50mg Tablet",
    },
    {
      nom: "Flucos ITZ Dusting Powder",
    },
    {
      nom: "Fatrova FT 160mg/10mg Tablet",
    },
    {
      nom: "Fexopen 180mg Tablet",
    },
    {
      nom: "Floxiwave 60 Capsule",
    },
    {
      nom: "Fibrimin-OD Tablet",
    },
    {
      nom: "Funzi-IT Dusting Powder",
    },
    {
      nom: "Finlite Cream",
    },
    {
      nom: "Fimanta 120 Tablet",
    },
    {
      nom: "Fenadol-DV Tablet",
    },
    {
      nom: "Forcutril Plus Cream",
    },
    {
      nom: "Flucowin Tablet",
    },
    {
      nom: "Fapvir Tablet",
    },
    {
      nom: "Folimost Gel",
    },
    {
      nom: "Fungiquick Capsule",
    },
    {
      nom: "Formin-SR 500 Tablet",
    },
    {
      nom: "Formin-SR 500 Tablet",
    },
    {
      nom: "FMH-Coalsal Ointment",
    },
    {
      nom: "Gabapin NT Tablet",
    },
    {
      nom: "Glycomet 500 SR Tablet",
    },
    {
      nom: "Gudcef 200 Tablet",
    },
    {
      nom: "Glycomet-GP 1 Tablet PR",
    },
    {
      nom: "Gudcef-CV 200 Tablet",
    },
    {
      nom: "Gabapin NT 100 Tablet",
    },
    {
      nom: "Glycomet-GP 2 Tablet PR",
    },
    {
      nom: "Grilinctus-BM Syrup",
    },
    {
      nom: "Gabapin 100 Tablet",
    },
    {
      nom: "Glyciphage SR 500mg Tablet",
    },
    {
      nom: "Grenil Tablet",
    },
    {
      nom: "Ganaton Total Capsule SR",
    },
    {
      nom: "Galvus Met 50mg/500mg Tablet",
    },
    {
      nom: "Ganaton Tablet",
    },
    {
      nom: "Glynase-MF Tablet",
    },
    {
      nom: "Glycomet Trio 2 Tablet SR",
    },
    {
      nom: "Glimestar-M 1 Tablet PR",
    },
    {
      nom: "Genteal Eye Drop",
    },
    {
      nom: "Gabaneuron NT Tablet",
    },
    {
      nom: "Grilinctus-L Oral Suspension",
    },
    {
      nom: "Glizid-M Tablet",
    },
    {
      nom: "Gudlax-Plus Laxative Peppermint Sugar Free",
    },
    {
      nom: "Glycomet-GP 0.5 Tablet SR",
    },
    {
      nom: "Grilinctus-LS Syrup",
    },
    {
      nom: "Glycomet Tablet",
    },
    {
      nom: "Gerbisa Tablet",
    },
    {
      nom: "Gabapin 300 Capsule",
    },
    {
      nom: "Gliptagreat M 500 Tablet",
    },
    {
      nom: "Gabaneuron Tablet",
    },
    {
      nom: "Gudcef Plus Tablet",
    },
    {
      nom: "GB 29 Total Tablet",
    },
    {
      nom: "Gluconorm-G 1 Tablet PR",
    },
    {
      nom: "Glycomet 1gm Tablet SR",
    },
    {
      nom: "Gluconorm G2 Tablet PR",
    },
    {
      nom: "Grisovin-FP Tablet",
    },
    {
      nom: "Glykind-M Tablet",
    },
    {
      nom: "Glycomet-GP 2 Forte Tablet SR",
    },
    {
      nom: "Gatiquin-P Eye Drop",
    },
    {
      nom: "Gluconorm SR 500mg Tablet",
    },
    {
      nom: "Goutnil 0.5mg Tablet",
    },
    {
      nom: "Ginette 35 Tablet",
    },
    {
      nom: "Gabantin-NT Tablet",
    },
    {
      nom: "Gardasil Vaccine",
    },
    {
      nom: "Genteal Gel",
    },
    {
      nom: "Gynaemed Vaginal Tablet",
    },
    {
      nom: "GTN Sorbitrate CR 2.6 Tablet",
    },
    {
      nom: "Glimestar-PM2 Tablet ER",
    },
    {
      nom: "Gatilox DM Sterile Eye Drops",
    },
    {
      nom: "Gabamax Gold Capsule",
    },
    {
      nom: "Glyxambi 25mg/5mg Tablet",
    },
    {
      nom: "Gemer 0.5 Tablet PR",
    },
    {
      nom: "Gutron 2.5mg Tablet",
    },
    {
      nom: "Glucored Forte Tablet",
    },
    {
      nom: "Glimestar-M 2 Tablet PR",
    },
    {
      nom: "Gutgermina Oral Suspension",
    },
    {
      nom: "Gabantin 100 Capsule",
    },
    {
      nom: "Grilinctus  DX Syrup",
    },
    {
      nom: "Galvus 50mg Tablet",
    },
    {
      nom: "Gestofit 200mg SR Tablet",
    },
    {
      nom: "Glycomet Trio 1 Tablet SR",
    },
    {
      nom: "Gramocef-O 200mg Tablet DT",
    },
    {
      nom: "Gabapin ME Tablet",
    },
    {
      nom: "Gabamax NT Tablet",
    },
    {
      nom: "Gynaset Tablet",
    },
    {
      nom: "Gravitor Tablet",
    },
    {
      nom: "Gutclear Syrup",
    },
    {
      nom: "Gibtulio 25mg Tablet",
    },
    {
      nom: "Gabagesic Gel",
    },
    {
      nom: "Gemer P 2 Tablet ER",
    },
    {
      nom: "Gemer DS 2 Tablet PR",
    },
    {
      nom: "Glucobay 50 Tablet",
    },
    {
      nom: "Gluconorm G2 Forte Tablet PR",
    },
    {
      nom: "Gabanyl NT 400mg/10mg Tablet",
    },
    {
      nom: "Glynase Tablet",
    },
    {
      nom: "Glimisave MV 3.3 Tablet SR",
    },
    {
      nom: "Gudcef Dry Syrup",
    },
    {
      nom: "Galvus Met 50mg/1000mg Tablet",
    },
    {
      nom: "Glucozone  Tablet",
    },
    {
      nom: "Gabantin Plus Tablet",
    },
    {
      nom: "GP 1 Tablet",
    },
    {
      nom: "Gestofit 300mg SR Tablet",
    },
    {
      nom: "Ganaton OD Capsule SR",
    },
    {
      nom: "Grandem Syrup",
    },
    {
      nom: "Glycomet 250 Tablet",
    },
    {
      nom: "Glyciphage SR 1gm Tablet",
    },
    {
      nom: "Gabantip AT Tablet",
    },
    {
      nom: "Gluconorm PG 2  Tablet PR",
    },
    {
      nom: "Glycomet-GP 1 Forte Tablet SR",
    },
    {
      nom: "Glucoryl-MV 2 Tablet SR",
    },
    {
      nom: "Golbi 300 Tablet",
    },
    {
      nom: "Glycomet Trio 2/0.3 Tablet SR",
    },
    {
      nom: "Glyxambi 10mg/5mg Tablet",
    },
    {
      nom: "Gudcef-CV Dry Syrup",
    },
    {
      nom: "Glycomet-GP 3/850 Tablet PR",
    },
    {
      nom: "Gluxit 10mg Tablet",
    },
    {
      nom: "Gestin Tablet",
    },
    {
      nom: "GP 2 Tablet",
    },
    {
      nom: "Glimiprex MF 1/500 Tablet PR",
    },
    {
      nom: "Glimestar-PM1 Tablet ER",
    },
    {
      nom: "GP 0.5 Tablet",
    },
    {
      nom: "Glevo 500 Tablet",
    },
    {
      nom: "Glimestar-M2 Forte Tablet PR",
    },
    {
      nom: "Gabator NT 400mg/10mg Tablet",
    },
    {
      nom: "Glycomet Trio Forte 2 Tablet SR",
    },
    {
      nom: "Glocin Gel",
    },
    {
      nom: "Gris ODT Tablet",
    },
    {
      nom: "Gudcef -XL 200 New Tablet ER",
    },
    {
      nom: "Glimisave MV 2 Tablet SR",
    },
    {
      nom: "Glycolate 1 Tablet",
    },
    {
      nom: "Glucobay 25 Tablet",
    },
    {
      nom: "Gabantin Forte Tablet",
    },
    {
      nom: "Gemfos Tablet",
    },
    {
      nom: "Gaspaz DS Capsule",
    },
    {
      nom: "Gestofit 200 Capsule",
    },
    {
      nom: "Glycohale-F Rotacap",
    },
    {
      nom: "Gudcef Drop",
    },
    {
      nom: "Gemcal Nasal Spray",
    },
    {
      nom: "Glizid-MV Tablet SR",
    },
    {
      nom: "Geripod 8 Tablet",
    },
    {
      nom: "Gabantin 300 Capsule",
    },
    {
      nom: "Glyciphage-G 1 Tablet PR",
    },
    {
      nom: "Gabantip AT 100 Tablet",
    },
    {
      nom: "Gemvert Tablet",
    },
    {
      nom: "Gudcef 100mg Tablet DT",
    },
    {
      nom: "Gemer DS 1 Tablet PR",
    },
    {
      nom: "Grandem MD Tablet",
    },
    {
      nom: "Glizid 40 Tablet",
    },
    {
      nom: "Genticyn 80mg Injection",
    },
    {
      nom: "Geminor M 2 Tablet PR",
    },
    {
      nom: "GeneVac-B Adult Vaccine",
    },
    {
      nom: "Gravol Tablet",
    },
    {
      nom: "Glimestar 1 Tablet",
    },
    {
      nom: "Gentalene Plus Cream",
    },
    {
      nom: "Gemer P 1 Tablet ER",
    },
    {
      nom: "Gudcef-CV 100mg Tablet",
    },
    {
      nom: "Glimy 1 Tablet",
    },
    {
      nom: "Glimp-M 2 Tablet",
    },
    {
      nom: "Grilinctus-BM Tablet",
    },
    {
      nom: "Graniforce Syrup",
    },
    {
      nom: "Glycomet 850 SR Tablet",
    },
    {
      nom: "Glimy M 1 Tablet PR",
    },
    {
      nom: "Gabaneuron NT 400 Tablet",
    },
    {
      nom: "Glizid 80 Tablet",
    },
    {
      nom: "Gluconorm SR 1gm Tablet",
    },
    {
      nom: "Glimp-M 1 Tablet",
    },
    {
      nom: "Glimiprex MF 2/500 Tablet PR",
    },
    {
      nom: "Glimisave M 2 Tablet PR",
    },
    {
      nom: "Gancigel Ophthalmic Gel",
    },
    {
      nom: "Gestone Injection",
    },
    {
      nom: "Glyciphage Tablet",
    },
    {
      nom: "Glucoryl-M 2 Tablet PR",
    },
    {
      nom: "Gramocef-CV Tablet",
    },
    {
      nom: "Gabafix Gel",
    },
    {
      nom: "Gaspaz Capsule",
    },
    {
      nom: "Gluconorm-VG 2 Tablet SR",
    },
    {
      nom: "Gulfadryl Syrup",
    },
    {
      nom: "Gluconorm-G 1 Forte Tablet PR",
    },
    {
      nom: "Glimda-MV 2 Tablet SR",
    },
    {
      nom: "Glycomet-GP 4 Forte Tablet PR",
    },
    {
      nom: "Gifaxin  400 Tablet",
    },
    {
      nom: "Glykind  60 XR Tablet",
    },
    {
      nom: "Glizid -MR 60 Tablet",
    },
    {
      nom: "Glyciphage-VG2 Tablet SR",
    },
    {
      nom: "Golbi SR 450 Tablet",
    },
    {
      nom: "Glemont-F Tablet",
    },
    {
      nom: "Gabawin 25 Tablet",
    },
    {
      nom: "Gemitrol NS Nasal Solution",
    },
    {
      nom: "Glucobay M50 Tablet",
    },
    {
      nom: "Geminor MP 2 Tablet SR",
    },
    {
      nom: "Gemer Forte 1 Tablet PR",
    },
    {
      nom: "Gemer Forte 2 Tablet PR",
    },
    {
      nom: "Glucoryl-M 1 Tablet PR",
    },
    {
      nom: "GLZ Plus Tablet",
    },
    {
      nom: "Glucomol 0.5% Eye Drop",
    },
    {
      nom: "Glycomet Trio 1/0.3 Tablet SR",
    },
    {
      nom: "Goodmorn Tablet",
    },
    {
      nom: "Geriflo-D Tablet SR",
    },
    {
      nom: "Gluconorm PG 1 Tablet PR",
    },
    {
      nom: "Graniforce -MD Tablet",
    },
    {
      nom: "Glimisave M 1 Tablet PR",
    },
    {
      nom: "Gibtulio 10mg Tablet",
    },
    {
      nom: "Glimestar-M1 Forte Tablet PR",
    },
    {
      nom: "Gamascab Lotion",
    },
    {
      nom: "Glizid-MR 30 Tablet",
    },
    {
      nom: "Gliptagreat M 1000 Tablet",
    },
    {
      nom: "Genericart Levocetirizine Dihydrochloride 5mg Tablet",
    },
    {
      nom: "GB 29 1500mcg/75mg Tablet SR",
    },
    {
      nom: "Gerbisa Suppository",
    },
    {
      nom: "Glucoryl-MV1 Tablet SR",
    },
    {
      nom: "Glimy M 2 Tablet PR",
    },
    {
      nom: "Glytears Eye Drop",
    },
    {
      nom: "Geftinat 250mg Tablet",
    },
    {
      nom: "Glycinorm-M 60 OD Tablet",
    },
    {
      nom: "Glimestar 2 Tablet",
    },
    {
      nom: "Globucel Solution for Infusion",
    },
    {
      nom: "Gluconorm PG 2 Forte Tablet SR",
    },
    {
      nom: "Glaritus 100IU/ml Injection",
    },
    {
      nom: "Glimisave MV 1 Tablet SR",
    },
    {
      nom: "Geminor M2 Forte Tablet PR",
    },
    {
      nom: "Gabafix NT 75mg/10mg/1500mcg Tablet",
    },
    {
      nom: "Gestakind-SR Tablet",
    },
    {
      nom: "Glutaup 500mg Tablet",
    },
    {
      nom: "Glyciphage-G 2 Tablet PR",
    },
    {
      nom: "Glimy 2 Tablet",
    },
    {
      nom: "Gabapax L Gel",
    },
    {
      nom: "Glycolate 2 Tablet",
    },
    {
      nom: "GPM-SR 2 Tablet",
    },
    {
      nom: "Glycigon-M Tablet",
    },
    {
      nom: "Grenil-F 10 Tablet",
    },
    {
      nom: "GB 29 Plus Tablet",
    },
    {
      nom: "Gabapin 400 Capsule",
    },
    {
      nom: "Glucored Tablet",
    },
    {
      nom: "Glycomet Trio Forte 1 Tablet SR",
    },
    {
      nom: "Gabamax 75mg Capsule",
    },
    {
      nom: "Gibtulio Met 12.5mg/500mg Tablet",
    },
    {
      nom: "Glimp-MP 2 Tablet SR",
    },
    {
      nom: "Glyciphage-PG2 Tablet SR",
    },
    {
      nom: "Glimy M V2 Tablet SR",
    },
    {
      nom: "Gemer DS 3 Tablet PR",
    },
    {
      nom: "Gemcal -Kit",
    },
    {
      nom: "Gudcef XL Tablet",
    },
    {
      nom: "Geminor M1 Forte Tablet PR",
    },
    {
      nom: "Gluconorm-G 0.5mg/500mg Tablet PR",
    },
    {
      nom: "Glycoseptol Antiseptic Gargle &amp; Mouth Wash",
    },
    {
      nom: "Gabamax SR 75 Tablet",
    },
    {
      nom: "Goodova 50 Capsule",
    },
    {
      nom: "Gluconorm-G 3 Forte Tablet PR",
    },
    {
      nom: "Galvus Met 50mg/850mg Tablet",
    },
    {
      nom: "Gluconorm-G 4 Forte Tablet PR",
    },
    {
      nom: "Gabapin SR 450 Tablet",
    },
    {
      nom: "Gabawin 50 Tablet",
    },
    {
      nom: "Glimda 1 Tablet",
    },
    {
      nom: "Grilinctus  Paediatric Syrup",
    },
    {
      nom: "Glucobay M 25 Tablet",
    },
    {
      nom: "Glotret 20 Tablet",
    },
    {
      nom: "Glospor Capsule",
    },
    {
      nom: "Gflotas D Eye Drop",
    },
    {
      nom: "Gastractiv 10mg Tablet",
    },
    {
      nom: "Glimisave MV2 Forte Tablet SR",
    },
    {
      nom: "Glimda 2 Tablet",
    },
    {
      nom: "Gabamax NT 50mg/10mg Tablet",
    },
    {
      nom: "Glyciphage 250 Tablet",
    },
    {
      nom: "Gravidol Tablet",
    },
    {
      nom: "Glz XR Tablet",
    },
    {
      nom: "Glimison-M 2 Tablet PR",
    },
    {
      nom: "Glimisave M2 Forte Tablet PR",
    },
    {
      nom: "Glycomet-GP 0.5 Forte Tablet PR",
    },
    {
      nom: "Glospor-DS Capsule",
    },
    {
      nom: "Glycomet 850 Tablet",
    },
    {
      nom: "Genericart Metformin Hydrochloride 500mg Tablet",
    },
    {
      nom: "Grocapix M 5% Solution",
    },
    {
      nom: "Geriflo  Tablet SR",
    },
    {
      nom: "Gifaxin  100 mg Syrup",
    },
    {
      nom: "Glimet DS Tablet",
    },
    {
      nom: "Ganfort  Eye Drop",
    },
    {
      nom: "Glycomet-GP 1/850 Tablet PR",
    },
    {
      nom: "Gepride M1 Tablet PR",
    },
    {
      nom: "Gluformin 500 Tablet",
    },
    {
      nom: "Goodmorn Plus Tablet",
    },
    {
      nom: "Glucoryl-MV 2/0.3 Tablet SR",
    },
    {
      nom: "Gudpres-AM 50 Tablet PR",
    },
    {
      nom: "Gabawin 75 Tablet",
    },
    {
      nom: "Gudpres-XL 50 Capsule",
    },
    {
      nom: "Gudgesic TH 100mg/4mg Tablet",
    },
    {
      nom: "Gabacure Gel",
    },
    {
      nom: "Glinil-M  Tablet",
    },
    {
      nom: "Gerbisa L Syrup",
    },
    {
      nom: "Glychek-M Forte Tablet",
    },
    {
      nom: "Gluvilda 50 Tablet",
    },
    {
      nom: "Grilinctus-BM Paediatric Syrup",
    },
    {
      nom: "Genxvast F Tablet",
    },
    {
      nom: "Glotret 10 Tablet",
    },
    {
      nom: "Gluconorm-VG 1 Tablet SR",
    },
    {
      nom: "Gudpres-XL 25 Capsule",
    },
    {
      nom: "Glimiprex MF Forte 2 Tablet PR",
    },
    {
      nom: "Glycinorm -OD 60 Tablet MR",
    },
    {
      nom: "Grandem Injection",
    },
    {
      nom: "Gesterol 200mg Tablet SR",
    },
    {
      nom: "Gemidro Tablet",
    },
    {
      nom: "Gabapin Plus 100 Tablet",
    },
    {
      nom: "Gaba 300 Capsule",
    },
    {
      nom: "Ginlac-V Vaginal Tablet",
    },
    {
      nom: "Glador M1 Tablet PR",
    },
    {
      nom: "Gluconorm P 15 Tablet ER",
    },
    {
      nom: "Gerbisa Children Suppository",
    },
    {
      nom: "Glaritus 100IU/ml Injection 3ml",
    },
    {
      nom: "Glipon 20mg Tablet",
    },
    {
      nom: "Glyciphage-G 2 Forte Tablet PR",
    },
    {
      nom: "Glador M2 Tablet PR",
    },
    {
      nom: "Grilinctus-BM Syrup Sugar Free",
    },
    {
      nom: "Gepride M2 Tablet PR",
    },
    {
      nom: "Glynase XL 10 Tablet",
    },
    {
      nom: "Glycinorm 40 Tablet",
    },
    {
      nom: "Glivec 400mg Tablet",
    },
    {
      nom: "Gluformin G 2 New Tablet PR",
    },
    {
      nom: "Glimisave MV 3.3 F Tablet SR",
    },
    {
      nom: "Glycinorm-M 30 OD Tablet ER",
    },
    {
      nom: "Glycomet-GP 2/850 Tablet PR",
    },
    {
      nom: "Glevo 750 Tablet",
    },
    {
      nom: "Glycinorm Total 60 Tablet SR",
    },
    {
      nom: "Goodova-L 5mg Tablet",
    },
    {
      nom: "Gabanyl 300mg/500mcg Tablet",
    },
    {
      nom: "Glyciphage-VG1 Tablet SR",
    },
    {
      nom: "Graniset 1 Tablet",
    },
    {
      nom: "Glyciphage 850 Tablet",
    },
    {
      nom: "Glimiprex 1 Tablet",
    },
    {
      nom: "Goodova 100 Capsule",
    },
    {
      nom: "Glimison-MP 2 Tablet SR",
    },
    {
      nom: "Glucoryl-M 2 Forte Tablet PR",
    },
    {
      nom: "Glimisave 1 Tablet",
    },
    {
      nom: "Glyciphage-G 1 Forte Tablet PR",
    },
    {
      nom: "Geristart Tablet PR",
    },
    {
      nom: "Glynamic MV 2 Tablet",
    },
    {
      nom: "Glycinorm 80 Tablet",
    },
    {
      nom: "Gabawin 25 M Tablet",
    },
    {
      nom: "Glimisave M 0.5 Tablet PR",
    },
    {
      nom: "Gemitrol Kit",
    },
    {
      nom: "Giftan-HC Tablet",
    },
    {
      nom: "Gabagesic 100mg Tablet",
    },
    {
      nom: "Gapitas-L Gel",
    },
    {
      nom: "Gate DM BAK Free Eye Drop",
    },
    {
      nom: "Gibtulio Met 12.5mg/1000mg Tablet",
    },
    {
      nom: "Galop 10 Tablet",
    },
    {
      nom: "Glyciphage-PG 1 Tablet SR",
    },
    {
      nom: "Gabaneuron SR 600 Tablet",
    },
    {
      nom: "Glynase XL- 5 Tablet",
    },
    {
      nom: "Glypten-M Tablet SR",
    },
    {
      nom: "Goodova-L Tablet",
    },
    {
      nom: "Genxvast 20 Tablet",
    },
    {
      nom: "Glimy M 2 Forte Tablet PR",
    },
    {
      nom: "GTN Sorbitrate -CR 6.4 Tablet",
    },
    {
      nom: "Glimisave M1 Forte Tablet PR",
    },
    {
      nom: "Gestakind 10mg Tablet",
    },
    {
      nom: "G-Cin Tablet",
    },
    {
      nom: "Gonablok 100 Capsule",
    },
    {
      nom: "Gravitor SR Tablet",
    },
    {
      nom: "Genericart Metformin Hydrochloride 1000mg Tablet SR",
    },
    {
      nom: "Galamer 4 Tablet",
    },
    {
      nom: "Genericart Nifedipine 20mg Tablet SR",
    },
    {
      nom: "Gluconorm-Z 80 Tablet",
    },
    {
      nom: "Glycinorm OD 30mg Tablet MR",
    },
    {
      nom: "Glyree-M 1 Tablet PR",
    },
    {
      nom: "Glyciphage SR 850mg Tablet",
    },
    {
      nom: "GP 4 Tablet",
    },
    {
      nom: "Gestone 400mg Capsule",
    },
    {
      nom: "Glimisave MV 1.3 Tablet SR",
    },
    {
      nom: "Gatilox Plus  Eye Drop",
    },
    {
      nom: "Gerta Injection",
    },
    {
      nom: "Glyree MV 2 Tablet PR",
    },
    {
      nom: "Geminor MP 1 Tablet SR",
    },
    {
      nom: "Gasofilm Oral Disintegrating Strip",
    },
    {
      nom: "Glz Total Tablet",
    },
    {
      nom: "Geftistar 250mg Tablet",
    },
    {
      nom: "Glimet Tablet",
    },
    {
      nom: "Gramoneg Oral Suspension",
    },
    {
      nom: "Gonal-F 300IU Solution for Injection",
    },
    {
      nom: "Glynium Respicap",
    },
    {
      nom: "Glimestar-M4 Forte Tablet PR",
    },
    {
      nom: "Gaba-Hosit Tablet",
    },
    {
      nom: "Gabagesic M 300mg/500mcg Tablet",
    },
    {
      nom: "Glimestar-M 3 Tablet PR",
    },
    {
      nom: "Glisen MF 1 Tablet PR",
    },
    {
      nom: "Glucoryl-M 0.5 mg Tablet",
    },
    {
      nom: "Geminor 1 Tablet",
    },
    {
      nom: "Gabafix-M SR Tablet",
    },
    {
      nom: "Glizid-M OD 60 Tablet SR",
    },
    {
      nom: "Glitaray M 1  Tablet PR",
    },
    {
      nom: "Glimy M 0.5 Tablet PR",
    },
    {
      nom: "Gasowel Plus Syrup",
    },
    {
      nom: "Glimestar M4 Tablet PR",
    },
    {
      nom: "Glimulin MV 2 Tablet ER",
    },
    {
      nom: "GR8 Capsule",
    },
    {
      nom: "Glimy-MP 2 Tablet SR",
    },
    {
      nom: "Glycigon-M SR Tablet",
    },
    {
      nom: "Glimiprex MF Forte 1 Tablet PR",
    },
    {
      nom: "Gluconorm PG 1 Forte Tablet SR",
    },
    {
      nom: "Gabafix-Plus Capsule",
    },
    {
      nom: "Glisen MF 2 Tablet PR",
    },
    {
      nom: "Glemont-A Tablet SR",
    },
    {
      nom: "GTN Spray",
    },
    {
      nom: "Gluconorm-VG 2 Forte Tablet SR",
    },
    {
      nom: "Gestofit 400 Soft Gelatin Capsule",
    },
    {
      nom: "Gabaxia 75 SR Tablet",
    },
    {
      nom: "Gestofit 400mg SR Tablet",
    },
    {
      nom: "Ginkostat 60mg/800mg/5mg Tablet",
    },
    {
      nom: "Gli-M Tablet",
    },
    {
      nom: "Gabantin 400 Capsule",
    },
    {
      nom: "Geminor M 0.5 Tablet PR",
    },
    {
      nom: "Gutclear-IG Granules",
    },
    {
      nom: "Gempar 1K Tablet",
    },
    {
      nom: "Gushout Tablet",
    },
    {
      nom: "Genpraz DSR Capsule",
    },
    {
      nom: "Gestone 8% Vaginal gel",
    },
    {
      nom: "Gabalent-NT Tablet",
    },
    {
      nom: "Gabaloy-NT Tablet",
    },
    {
      nom: "Glyree-M 2 Tablet PR",
    },
    {
      nom: "Gabator 300 Tablet",
    },
    {
      nom: "Gestone 200mg Capsule",
    },
    {
      nom: "Gabadon-NTP 400mg/10mg Tablet",
    },
    {
      nom: "Gocan 150mg Tablet",
    },
    {
      nom: "Glimestar 4 Tablet",
    },
    {
      nom: "Gutclear Syrup",
    },
    {
      nom: "Gentalene Plus Cream",
    },
    {
      nom: "Gepride M 0.5 Tablet PR",
    },
    {
      nom: "Gudpres-AM 25 Tablet PR",
    },
    {
      nom: "Glucoryl-MP2 Tablet SR",
    },
    {
      nom: "Gluconorm-G 3 Tablet PR",
    },
    {
      nom: "Glimestar 3 Tablet",
    },
    {
      nom: "Grandcef-CV Tablet",
    },
    {
      nom: "Gositis Mouth Wash",
    },
    {
      nom: "Gluconorm-G 0.5 Forte Tablet PR",
    },
    {
      nom: "Glypten Tablet",
    },
    {
      nom: "Gluformin G 1 New Tablet PR",
    },
    {
      nom: "Glyree 1 Tablet",
    },
    {
      nom: "Gestone Injection",
    },
    {
      nom: "Glimisave M3 Forte Tablet PR",
    },
    {
      nom: "Gluconorm SR 850 Tablet",
    },
    {
      nom: "Gluconorm-G 4 Tablet PR",
    },
    {
      nom: "Glimisave M4 Forte Tablet PR",
    },
    {
      nom: "Gravidol 200mg Tablet",
    },
    {
      nom: "Glimison-MP 1 Tablet SR",
    },
    {
      nom: "Glucoryl 1 Tablet",
    },
    {
      nom: "Geminor M 3 Forte Tablet PR",
    },
    {
      nom: "Glimisave 2 Tablet",
    },
    {
      nom: "Gabawok-NT 100 Tablet",
    },
    {
      nom: "Glenpar 500mg Tablet",
    },
    {
      nom: "Glipon MF Forte Tablet ER",
    },
    {
      nom: "Gabadon 300mg Tablet",
    },
    {
      nom: "Giftan 50 Tablet",
    },
    {
      nom: "Gluformin XL New 500 Tablet PR",
    },
    {
      nom: "Glucored Forte 850 Tablet",
    },
    {
      nom: "Glucoryl-M4 Forte Tablet PR",
    },
    {
      nom: "Gabanyt 400mg/10mg Tablet",
    },
    {
      nom: "Gris ODT Cream",
    },
    {
      nom: "GLZ MEX 60mg/500mg Tablet",
    },
    {
      nom: "Glisen VM 2 Tablet SR",
    },
    {
      nom: "Gliclaz M 80 mg/500 mg Tablet",
    },
    {
      nom: "Galop 5 Tablet",
    },
    {
      nom: "Glyciphage P 15 mg/500 mg Tablet SR",
    },
    {
      nom: "Glimaday 2 Tablet PR",
    },
    {
      nom: "Glycigon Tablet",
    },
    {
      nom: "Glimp 1 Tablet",
    },
    {
      nom: "Goutfree 40 Tablet ER",
    },
    {
      nom: "Glimp 2 Tablet",
    },
    {
      nom: "Glychek-M Plus Tablet",
    },
    {
      nom: "Grenil 5mg/250mg Suspension",
    },
    {
      nom: "Gepride M 3 Tablet PR",
    },
    {
      nom: "Glimulin-MF Tablet PR",
    },
    {
      nom: "Glycinorm Total 30 Tablet SR",
    },
    {
      nom: "Gabawell NT  400mg/10mg Tablet",
    },
    {
      nom: "Gonablok 200 Capsule",
    },
    {
      nom: "Glychek 80 Tablet",
    },
    {
      nom: "Glucomust M 5 mg/500 mg Tablet",
    },
    {
      nom: "Glucotim LA Eye Drop",
    },
    {
      nom: "Gutwin 400 Tablet",
    },
    {
      nom: "Gifaxin  550 Tablet",
    },
    {
      nom: "Gabastar-M Tablet",
    },
    {
      nom: "Goecyst-M Tablet SR",
    },
    {
      nom: "Glador 4 Tablet",
    },
    {
      nom: "Glocan Cream",
    },
    {
      nom: "Glotret 5mg Tablet",
    },
    {
      nom: "Gestofit 100 Soft Gelatin Capsule",
    },
    {
      nom: "Gabacip M Tablet",
    },
    {
      nom: "Glypride 1 Tablet",
    },
    {
      nom: "Gemdronic 5mg/100ml Injection",
    },
    {
      nom: "Gabritab 50-AT Tablet",
    },
    {
      nom: "Geminor 2 Tablet",
    },
    {
      nom: "Geripod 4 Capsule",
    },
    {
      nom: "Gastril Mps  Syrup",
    },
    {
      nom: "Goodflo 110mg Capsule",
    },
    {
      nom: "Germero 1000mg Injection",
    },
    {
      nom: "Gepride M 1 Forte Tablet SR",
    },
    {
      nom: "Gabasafe Plus  SR 75 Tablet",
    },
    {
      nom: "GM -SR1 Tablet",
    },
    {
      nom: "Grewit 5% Solution",
    },
    {
      nom: "Glypride 2 Tablet",
    },
    {
      nom: "Glimital-M1 Forte Tablet PR",
    },
    {
      nom: "G.B.H.C Soap",
    },
    {
      nom: "Glimulin MV 1 Tablet ER",
    },
    {
      nom: "Gabalent 100 Tablet",
    },
    {
      nom: "Glimulin-2 MF Tablet PR",
    },
    {
      nom: "Goldclav 625 Tablet",
    },
    {
      nom: "Gefitero Tablet",
    },
    {
      nom: "Glimisave M1 750 Tablet PR",
    },
    {
      nom: "Glytrin Tablet",
    },
    {
      nom: "Glisen-PM 1mg/500mg/15mg Tablet",
    },
    {
      nom: "Glynamic M 2mg/500mg Tablet",
    },
    {
      nom: "Gcolate 1mg Tablet",
    },
    {
      nom: "Glimser 1 Tablet PR",
    },
    {
      nom: "Glimison-M 2 Forte Tablet",
    },
    {
      nom: "Glypten-M Forte 1000mg/20mg Tablet",
    },
    {
      nom: "Glaritus 100IU/ml Injection",
    },
    {
      nom: "Gabacnx NT 400mg/10mg Tablet",
    },
    {
      nom: "Glimisave M2 750 Tablet PR",
    },
    {
      nom: "Geritam 0.4 Tablet ER",
    },
    {
      nom: "Gride-M Forte Tablet PR",
    },
    {
      nom: "Gastrozin 75mg Tablet",
    },
    {
      nom: "Gam-DSR Capsule",
    },
    {
      nom: "Gamma I.V. 5gm Infusion",
    },
    {
      nom: "Galamer 8 Tablet",
    },
    {
      nom: "Glutowin Forte Tablet SR",
    },
    {
      nom: "Guficol Plus 2MIU Injection",
    },
    {
      nom: "Glospor Capsule",
    },
    {
      nom: "Glimulin 1 Tablet",
    },
    {
      nom: "Gabacnx NT 100 Tablet",
    },
    {
      nom: "Glucoryl-M 3 Forte Tablet PR",
    },
    {
      nom: "Glenpar 650mg Tablet",
    },
    {
      nom: "Glitaray M 2mg/500mg Tablet",
    },
    {
      nom: "Glisen MF Forte 1 Tablet",
    },
    {
      nom: "Gee-X  Pain Relieving Gel",
    },
    {
      nom: "GeneVac-B Paediatric Injection",
    },
    {
      nom: "Gabawin M 500mcg/75mg Tablet",
    },
    {
      nom: "Gluconorm-G Plus 3 Tablet PR",
    },
    {
      nom: "Gabrica AT Capsule",
    },
    {
      nom: "Glitaris M 15 Tablet SR",
    },
    {
      nom: "Geftib Tablet",
    },
    {
      nom: "Gastrazole Plus Capsule",
    },
    {
      nom: "Glitaray MP 2mg/500mg/15mg Tablet PR",
    },
    {
      nom: "Glisen VM 1 Tablet SR",
    },
    {
      nom: "Goodflo 150mg Capsule",
    },
    {
      nom: "Genorox 250mg Tablet",
    },
    {
      nom: "Greatcef CV Tablet",
    },
    {
      nom: "Galbact Ointment",
    },
    {
      nom: "Glotret 30mg Tablet",
    },
    {
      nom: "Grantin Capsule",
    },
    {
      nom: "Glucored Forte SR Tablet",
    },
    {
      nom: "Gabawin 50M Tablet",
    },
    {
      nom: "Glimulin 2 Tablet",
    },
    {
      nom: "Gestmate SR 200 Tablet",
    },
    {
      nom: "Glimchek M 2mg/500mg Tablet",
    },
    {
      nom: "Glitaris 15 Tablet",
    },
    {
      nom: "Glimaday-Forte 3 Tablet PR",
    },
    {
      nom: "Glucagen 1mg Injection",
    },
    {
      nom: "Gkn-Plus Tablet",
    },
    {
      nom: "Glorimet PG 2 Tablet",
    },
    {
      nom: "Gutfeel  Granules",
    },
    {
      nom: "Glitaris 7.5 Tablet",
    },
    {
      nom: "Gomo Tablet",
    },
    {
      nom: "Glospor-DS Capsule",
    },
    {
      nom: "Glisen 1 Tablet",
    },
    {
      nom: "Gepride 2 Tablet",
    },
    {
      nom: "Glimser-P1 Tablet SR",
    },
    {
      nom: "Glimipack M 1mg/500mg Tablet",
    },
    {
      nom: "Glimser-P 2 Tablet SR",
    },
    {
      nom: "Gloristat 40 Tablet",
    },
    {
      nom: "Gainehair 5% Spray",
    },
    {
      nom: "Grandcef 100 Oral Suspension",
    },
    {
      nom: "Gride-M 1mg/500mg Tablet",
    },
    {
      nom: "Gride 1mg Tablet",
    },
    {
      nom: "Glorimet VG2 Tablet SR",
    },
    {
      nom: "Glimisave Max 2 Tablet PR",
    },
    {
      nom: "Gestmate 200mg Capsule",
    },
    {
      nom: "Glador M4 Forte Tablet PR",
    },
    {
      nom: "Gemtaz 1gm Injection",
    },
    {
      nom: "Glimisave Max 1 Tablet PR",
    },
    {
      nom: "G-Cerin Tablet",
    },
    {
      nom: "Gamabiol Lotion",
    },
    {
      nom: "Glimisave Max Forte 2 Tablet PR",
    },
    {
      nom: "Gental Cream",
    },
    {
      nom: "Glez 2.5mg Tablet",
    },
    {
      nom: "Gretacal Injection",
    },
    {
      nom: "Glucut 1 MT Tablet",
    },
    {
      nom: "Gluconorm G2 D Tablet SR",
    },
    {
      nom: "Greatcef 200 Tablet",
    },
    {
      nom: "Glimulin MF Forte Tablet PR",
    },
    {
      nom: "Glucowise 20mg Tablet",
    },
    {
      nom: "Gabastar-M 300mg/500mcg Tablet",
    },
    {
      nom: "Glybovin 1.25mg Tablet",
    },
    {
      nom: "Glimaday -HS Tablet PR",
    },
    {
      nom: "Glimisave Max Forte 1 Tablet PR",
    },
    {
      nom: "Grafnos 0.5 Capsule",
    },
    {
      nom: "Goefibro-U Tablet",
    },
    {
      nom: "Genexglob Infusion",
    },
    {
      nom: "Glimser Forte 2 Tablet PR",
    },
    {
      nom: "Gamamed Soap",
    },
    {
      nom: "Glimric-M3 Tablet SR",
    },
    {
      nom: "Glipti Next Tablet",
    },
    {
      nom: "Gainehair 2% Topical Solution",
    },
    {
      nom: "Glyvas F Tablet",
    },
    {
      nom: "Glynova-M 2 Tablet SR",
    },
    {
      nom: "Glitaray M 1 Plus Tablet PR",
    },
    {
      nom: "GM SR2 Forte Tablet",
    },
    {
      nom: "Grafnos 1 Capsule",
    },
    {
      nom: "Glypan-M Tablet",
    },
    {
      nom: "Gylis M 80mg/500mg Tablet",
    },
    {
      nom: "Gloristat 10 Tablet",
    },
    {
      nom: "Gamalice Lotion",
    },
    {
      nom: "Glimed 4 Tablet",
    },
    {
      nom: "Gelofast Gel",
    },
    {
      nom: "Glifil M 2.5mg/250mg Tablet",
    },
    {
      nom: "Gloritel CT 40 Tablet",
    },
    {
      nom: "Glimzen-MV2 Forte Tablet SR",
    },
    {
      nom: "Glitaris 30 Tablet",
    },
    {
      nom: "Gutwin 550 Tablet",
    },
    {
      nom: "Genericart Amlodipine+Lisinopril 5mg/5mg Tablet",
    },
    {
      nom: "Gama Soap",
    },
    {
      nom: "Glupride-M2 Tablet SR",
    },
    {
      nom: "Gabrica Capsule SR",
    },
    {
      nom: "Glorimet PG 1 Tablet SR",
    },
    {
      nom: "Glinate 120 Tablet",
    },
    {
      nom: "GM SR1 Forte Tablet",
    },
    {
      nom: "Genericart Glimepiride+Metformin Hydrochloride 4mg/1000mg Tablet PR",
    },
    {
      nom: "Gabanev-NT 400mg/10mg Tablet",
    },
    {
      nom: "Gloritel  40 Tablet",
    },
    {
      nom: "Glimcip 3 Tablet",
    },
    {
      nom: "Gloristat Trio Capsule",
    },
    {
      nom: "Gloritel M  40 Tablet",
    },
    {
      nom: "Gloritel M  40 Tablet",
    },
    {
      nom: "Genericart Voglibose+Metformin Hydrochloride+Gliclazide 0.2mg/500mg/40mg Tablet",
    },
    {
      nom: "Gloritel AM  40 Tablet",
    },
    {
      nom: "Hifenac-P Tablet",
    },
    {
      nom: "HCQS 200 Tablet",
    },
    {
      nom: "Headset Tablet",
    },
    {
      nom: "HP Kit",
    },
    {
      nom: "Hepamerz Tablet",
    },
    {
      nom: "Hifenac-MR Tablet",
    },
    {
      nom: "Hepamerz Infusion",
    },
    {
      nom: "Hyocimax-S Tablet",
    },
    {
      nom: "Heptral 400mg Tablet",
    },
    {
      nom: "Histafree-M Tablet",
    },
    {
      nom: "Hicope Syrup",
    },
    {
      nom: "Human Actrapid 40IU/ml Solution for Injection",
    },
    {
      nom: "Histafree 120 Tablet",
    },
    {
      nom: "HUCOG 5000 HP Injection",
    },
    {
      nom: "Hexigel Mouth Gel",
    },
    {
      nom: "Hyponat-O 15 Tablet",
    },
    {
      nom: "Human Mixtard 70/30 Suspension for Injection 40IU/ml",
    },
    {
      nom: "Human Mixtard 70/30 Suspension for Injection 100IU/ml",
    },
    {
      nom: "Hadensa Ointment",
    },
    {
      nom: "Hicope 25 Tablet",
    },
    {
      nom: "Happi-D Capsule SR",
    },
    {
      nom: "Histafree Suspension Raspberry &amp; Vanilla",
    },
    {
      nom: "Hylosoft Eye Drop",
    },
    {
      nom: "Haemaccel Infusion",
    },
    {
      nom: "Huminsulin  30/70 100IU/ml Cartridge 3ml",
    },
    {
      nom: "Hifenac Tablet",
    },
    {
      nom: "Hydrocort 100mg Injection",
    },
    {
      nom: "Hifenac-D  Tablet",
    },
    {
      nom: "HH Sone Cream",
    },
    {
      nom: "Hepakind 300mg Tablet",
    },
    {
      nom: "Herpex 5% Cream",
    },
    {
      nom: "HCQS 300 Tablet",
    },
    {
      nom: "Hhfudic Cream",
    },
    {
      nom: "Hexidine Mouth Wash",
    },
    {
      nom: "Hepamerz Granules",
    },
    {
      nom: "Hicope Drop",
    },
    {
      nom: "HHzole Cream",
    },
    {
      nom: "Hifenac TH Tablet",
    },
    {
      nom: "Hepakind 150 Tablet",
    },
    {
      nom: "Halovate Cream",
    },
    {
      nom: "Hicope 10 Tablet",
    },
    {
      nom: "Hifenac SR Tablet",
    },
    {
      nom: "Hansepran 100 Capsule",
    },
    {
      nom: "Hexilak Gel",
    },
    {
      nom: "Herpikind 400 Tablet DT",
    },
    {
      nom: "Herpikind Ointment",
    },
    {
      nom: "Hydrogen Peroxide Solution",
    },
    {
      nom: "Hisone 10 Tablet",
    },
    {
      nom: "Hifenac Max Tablet",
    },
    {
      nom: "Hhderm Cream",
    },
    {
      nom: "Humalog 100IU/ml Solution for Injection",
    },
    {
      nom: "Hyocimax MF  Tablet",
    },
    {
      nom: "HCQS 400 Tablet",
    },
    {
      nom: "Histo Calamine Lotion",
    },
    {
      nom: "Humalog Mix 25 100IU/ml Cartridge",
    },
    {
      nom: "HHLite Cream",
    },
    {
      nom: "Histafree 180 Tablet",
    },
    {
      nom: "HHLEVO Tablet",
    },
    {
      nom: "Hylosurge Eye Drop",
    },
    {
      nom: "Histafree Eye Drops",
    },
    {
      nom: "Hemolit Cream",
    },
    {
      nom: "Hisone 5 Tablet",
    },
    {
      nom: "Huminsulin R 40IU/ml Injection",
    },
    {
      nom: "Harmoni-F Tablet",
    },
    {
      nom: "Hirudal Cream",
    },
    {
      nom: "Hyla PF Eye Drop",
    },
    {
      nom: "Hexidine Mouth Wash",
    },
    {
      nom: "Human Mixtard 50 Injection 40IU/ml",
    },
    {
      nom: "HH Linctus Cough Syrup",
    },
    {
      nom: "Histakind-M Tablet",
    },
    {
      nom: "Hexaxim Vaccine",
    },
    {
      nom: "Hicet-DC Tablet",
    },
    {
      nom: "Herpikind 800mg Tablet",
    },
    {
      nom: "HUCOG 10000 HP Injection",
    },
    {
      nom: "Hypersol Ophthalmic Solution",
    },
    {
      nom: "Hyvet  Eye Drop",
    },
    {
      nom: "Hatric Tablet",
    },
    {
      nom: "Hungree Syrup",
    },
    {
      nom: "Hatric 3 Suspension",
    },
    {
      nom: "Halox S Ointment",
    },
    {
      nom: "Happi-L Capsule SR",
    },
    {
      nom: "Hyane Eye Drop",
    },
    {
      nom: "Halox Cream",
    },
    {
      nom: "HH Salic Ointment",
    },
    {
      nom: "Hexidine Mouth Wash",
    },
    {
      nom: "Hifenac Spas Tablet",
    },
    {
      nom: "Hepbest Tablet",
    },
    {
      nom: "Hhfexo 180 Tablet",
    },
    {
      nom: "Hydroxyl  Mouth Wash",
    },
    {
      nom: "Hyla Fusion Eye Drop",
    },
    {
      nom: "Healtears Eye Drop",
    },
    {
      nom: "Hhamclav 625 Tablet",
    },
    {
      nom: "Hyla Eye Drop",
    },
    {
      nom: "Hyalgan Injection",
    },
    {
      nom: "Humog 75 Injection",
    },
    {
      nom: "Hyadry 0.1% Eye Drop",
    },
    {
      nom: "Humog 150 HP Injection",
    },
    {
      nom: "Human Insulatard 40IU/ml Suspension for Injection",
    },
    {
      nom: "Huminsulin R 100IU Cartridge",
    },
    {
      nom: "Halotop-S Ointment",
    },
    {
      nom: "Histabil Tablet",
    },
    {
      nom: "HHCepo 200 Tablet",
    },
    {
      nom: "HHlevo-M Tablet",
    },
    {
      nom: "Halovate Ointment",
    },
    {
      nom: "Hydroeyes 0.05% Eye Drop",
    },
    {
      nom: "Herperax Ointment",
    },
    {
      nom: "Halotop Cream",
    },
    {
      nom: "Hhazi 500 Tablet",
    },
    {
      nom: "Hypersol 6 Eye Ointment",
    },
    {
      nom: "Hepcvel Tablet",
    },
    {
      nom: "Halox Lotion",
    },
    {
      nom: "Humalog 100IU/ml Kwikpen",
    },
    {
      nom: "Humalog Mix 50 100IU/ml Cartridge",
    },
    {
      nom: "Hairjoy Foam",
    },
    {
      nom: "Hald SR 200 Tablet",
    },
    {
      nom: "Hedfree Tablet",
    },
    {
      nom: "Hipres 50 Tablet",
    },
    {
      nom: "Hicet Tablet",
    },
    {
      nom: "Hepasil Syrup",
    },
    {
      nom: "Huminsulin  30/70 Solution for Injection 40IU/ml",
    },
    {
      nom: "HH Linctus-LS Expectorant",
    },
    {
      nom: "Histakind 30mg/5ml Syrup",
    },
    {
      nom: "Halox Ointment",
    },
    {
      nom: "Hemsyl 500mg Tablet",
    },
    {
      nom: "Hyal Oral Tablet",
    },
    {
      nom: "HY 5  Eye Drop",
    },
    {
      nom: "Helirab-D Capsule SR",
    },
    {
      nom: "Hizet 25mg Tablet",
    },
    {
      nom: "Hylu Fresh Eye Drop",
    },
    {
      nom: "Hhcepo-CV Tablet",
    },
    {
      nom: "Healex Plus Spray",
    },
    {
      nom: "Histakem 120mg Tablet",
    },
    {
      nom: "Happi-IT Capsule PR",
    },
    {
      nom: "Halox S Lotion",
    },
    {
      nom: "Hepalair  150 mg/100 mg Tablet",
    },
    {
      nom: "HYQ 400 Tablet",
    },
    {
      nom: "Hhcefi 200 Tablet",
    },
    {
      nom: "Herperax 400 Tablet",
    },
    {
      nom: "HH Sone Cream",
    },
    {
      nom: "HH Linctus-Ex Expectorant",
    },
    {
      nom: "Herpival 1000mg Tablet",
    },
    {
      nom: "Hopace 2.5 Tablet",
    },
    {
      nom: "HH Linctus Junior Syrup Alcohol Free",
    },
    {
      nom: "HH Salic Lotion",
    },
    {
      nom: "Hatric Syrup",
    },
    {
      nom: "Hatric 2 Syrup",
    },
    {
      nom: "Halobet Cream",
    },
    {
      nom: "Hifenac TH8 Tablet",
    },
    {
      nom: "Hald SR 300 Tablet",
    },
    {
      nom: "Hqtor Tablet",
    },
    {
      nom: "Halobet S Ointment",
    },
    {
      nom: "HHlevo-M Kid Suspension",
    },
    {
      nom: "Hytrin 1 Tablet",
    },
    {
      nom: "Halox ES Ointment",
    },
    {
      nom: "Hhmus 0.1% Ointment",
    },
    {
      nom: "Hhfexo M 10mg/120mg Tablet",
    },
    {
      nom: "Hyde Cream",
    },
    {
      nom: "Halotop-S Lotion",
    },
    {
      nom: "HUCOG 2000 HP Injection",
    },
    {
      nom: "Hadensa Ointment",
    },
    {
      nom: "Humog 75 HP Injection",
    },
    {
      nom: "HH Sone Lotion",
    },
    {
      nom: "Hairizer Hair Growth Treatment",
    },
    {
      nom: "Halonext-S Ointment",
    },
    {
      nom: "Hizet 10mg Tablet",
    },
    {
      nom: "Halosys -S Ointment",
    },
    {
      nom: "Hydrazide 12.5 Tablet",
    },
    {
      nom: "Huminsulin  30/70 Suspension for Injection 100IU/ml",
    },
    {
      nom: "Honvan Tablet",
    },
    {
      nom: "Hymoist Eye Drop",
    },
    {
      nom: "Heximar-B Ointment",
    },
    {
      nom: "Hipress 50 Tablet",
    },
    {
      nom: "Herperax 800 Tablet",
    },
    {
      nom: "Hatric 3 Drops",
    },
    {
      nom: "Herpex 200mg Tablet",
    },
    {
      nom: "Hairmax Forte Solution",
    },
    {
      nom: "Heparid Syrup",
    },
    {
      nom: "Hipres 25 Tablet",
    },
    {
      nom: "Humalog Mix 25 Kwikpen 100IU/ml",
    },
    {
      nom: "Hydrazide 25 Tablet",
    },
    {
      nom: "Huminsulin N 40IU/ml Injection",
    },
    {
      nom: "Hepagard  Granules",
    },
    {
      nom: "Huminsulin R 100IU/ml Solution for Injection",
    },
    {
      nom: "Huminsulin  50/50 Suspension for Injection 40IU/ml",
    },
    {
      nom: "Halovate Lotion",
    },
    {
      nom: "Halotop Lotion",
    },
    {
      nom: "Hhfexo 120mg Tablet",
    },
    {
      nom: "Haloderm Cream",
    },
    {
      nom: "Hydroeyes HS Eye Drop",
    },
    {
      nom: "Hirudal Cream",
    },
    {
      nom: "Heximar Ointment",
    },
    {
      nom: "Histakem 180mg Tablet",
    },
    {
      nom: "Hydrogem 500mg Capsule",
    },
    {
      nom: "Hylogel Gel",
    },
    {
      nom: "Happi 40 Tablet",
    },
    {
      nom: "Halonova S Ointment",
    },
    {
      nom: "Hemsyl Cvp Tablet",
    },
    {
      nom: "Hytrin 2 Tablet",
    },
    {
      nom: "Hosit-L Tablet",
    },
    {
      nom: "Hepabsv 100IU Injection",
    },
    {
      nom: "HH Salic 6 Ointment",
    },
    {
      nom: "Hep Lock Solution",
    },
    {
      nom: "Humstard 30/70 Injection 40IU/ml",
    },
    {
      nom: "Herpikind 200 Tablet DT",
    },
    {
      nom: "Hexilak Gel",
    },
    {
      nom: "Hilin 50 Capsule",
    },
    {
      nom: "Hopace-MT 50 Tablet ER",
    },
    {
      nom: "HHCepo 100mg Dry Syrup",
    },
    {
      nom: "Hylo Grev Eye Drop",
    },
    {
      nom: "Halox S Ointment",
    },
    {
      nom: "Hyphoral Tablet",
    },
    {
      nom: "Hyrax 10mg Syrup",
    },
    {
      nom: "Hycort 100mg Injection",
    },
    {
      nom: "Halonova Cream",
    },
    {
      nom: "Hatric 2 Oral Drops",
    },
    {
      nom: "HH Salic Ointment",
    },
    {
      nom: "Humog 150 Injection",
    },
    {
      nom: "Hhamclav Dry Syrup",
    },
    {
      nom: "Hylowell Eye Drop",
    },
    {
      nom: "Hista 3G Tablet",
    },
    {
      nom: "Humalog Mix 50 Kwikpen 100IU/ml",
    },
    {
      nom: "Hylumax Eye Drop",
    },
    {
      nom: "Helirab 20 Tablet",
    },
    {
      nom: "Hicet Syrup",
    },
    {
      nom: "Halosys-S Lotion",
    },
    {
      nom: "Hi-D3 60K Capsule",
    },
    {
      nom: "Hexidine -EP Mouth Wash",
    },
    {
      nom: "Hepexa 300 Tablet",
    },
    {
      nom: "Hifenac Gel",
    },
    {
      nom: "Hopace 1.25 Tablet",
    },
    {
      nom: "Hepasil 140mg Tablet",
    },
    {
      nom: "Hytel 40mg Tablet",
    },
    {
      nom: "Huminsulin N 100IU/ml Cartridge",
    },
    {
      nom: "Hisone 20mg Tablet",
    },
    {
      nom: "Haloderm S Ointment",
    },
    {
      nom: "Hald SR 400 Tablet",
    },
    {
      nom: "Hyaluron 200mg Tablet",
    },
    {
      nom: "Haloderm Cream",
    },
    {
      nom: "Habiccor Ointment",
    },
    {
      nom: "Hqtor 400 Tablet",
    },
    {
      nom: "Hairlife 5% Solution",
    },
    {
      nom: "Hepcinat Tablet",
    },
    {
      nom: "Humalog 200IU/ml Kwikpen",
    },
    {
      nom: "HHlevo-M Kid Tablet DT",
    },
    {
      nom: "Habiccor Ointment",
    },
    {
      nom: "Hep 25 Injection",
    },
    {
      nom: "Hypig Cream",
    },
    {
      nom: "Halobet Cream",
    },
    {
      nom: "Hopace-H 5 Capsule",
    },
    {
      nom: "Hipril A Tablet",
    },
    {
      nom: "Hairjoy 2% Solution",
    },
    {
      nom: "Happicid Oral Gel Ice Mint Sugar Free",
    },
    {
      nom: "Halofast S Ointment",
    },
    {
      nom: "Hicet-AX Tablet SR",
    },
    {
      nom: "Hysoft Moisturizing Cream",
    },
    {
      nom: "Hemocit-P Tablet",
    },
    {
      nom: "Halonext 0.05% Lotion",
    },
    {
      nom: "Halomesh Cream",
    },
    {
      nom: "H-One Cream",
    },
    {
      nom: "Halostrol S 6% Ointment",
    },
    {
      nom: "Histacross L 10mg Tablet",
    },
    {
      nom: "Hep Grow Tablet",
    },
    {
      nom: "Hicool PF Eye Gel",
    },
    {
      nom: "Hmet Trio 2mg/500mg/0.3mg Tablet",
    },
    {
      nom: "Hopecard 5 Capsule",
    },
    {
      nom: "Hexab Emulsion",
    },
    {
      nom: "Hopecard 2.5 Capsule",
    },
    {
      nom: "Hivus-LR 50mg/200mg Tablet",
    },
    {
      nom: "Hyde Solution",
    },
    {
      nom: "H-Quine Tablet",
    },
    {
      nom: "Hical Suspension",
    },
    {
      nom: "Hexolip 500 Tablet",
    },
    {
      nom: "Histaban 5mg Tablet",
    },
    {
      nom: "HMET-Forte Tablet SR",
    },
    {
      nom: "Hypig 15 Cream",
    },
    {
      nom: "Hairshine Ktz Soap",
    },
    {
      nom: "Hairouse-MX 2% Solution",
    },
    {
      nom: "Hare 10 Spray",
    },
    {
      nom: "Hopecard-H 5/12.5 Capsule",
    },
    {
      nom: "Hibesor 50mg Tablet",
    },
    {
      nom: "Heptilose Oral Solution",
    },
    {
      nom: "Imatib 100 Tablet",
    },
    {
      nom: "IPCA MMF 500 Tablet",
    },
    {
      nom: "Inderal LA 20 Tablet SR",
    },
    {
      nom: "Imdur 30mg Tablet PR",
    },
    {
      nom: "Istavel 100mg Tablet",
    },
    {
      nom: "Inderal 40 Tablet",
    },
    {
      nom: "ITR Plus Eye Drop",
    },
    {
      nom: "Idrofos 150 Tablet",
    },
    {
      nom: "Indocap Capsule",
    },
    {
      nom: "Istamet 50mg/1000mg Tablet",
    },
    {
      nom: "Igurati 25mg Tablet",
    },
    {
      nom: "IT-Mac 100 Capsule",
    },
    {
      nom: "Intacoxia 90 Tablet",
    },
    {
      nom: "Ivoral Forte Tablet",
    },
    {
      nom: "Indclav 625 Tablet",
    },
    {
      nom: "Inderal 20mg Tablet",
    },
    {
      nom: "Intimacy Plus 2 Tablet",
    },
    {
      nom: "Itralase 100 Capsule",
    },
    {
      nom: "Istavel 50mg Tablet",
    },
    {
      nom: "Iotim Eye Drop",
    },
    {
      nom: "Isordil 5 Sublingual tablet",
    },
    {
      nom: "Inderal LA 40 Tablet SR",
    },
    {
      nom: "Invokana  100mg Tablet",
    },
    {
      nom: "Isolazine Tablet",
    },
    {
      nom: "Imiquad Cream (0.25gm Each)",
    },
    {
      nom: "Isryl-M2 Tablet SR",
    },
    {
      nom: "Intacoxia MR 60mg/4mg Tablet",
    },
    {
      nom: "Ivepred 4 Tablet",
    },
    {
      nom: "Isryl-M1 Tablet SR",
    },
    {
      nom: "Ipravent Respules 2ml",
    },
    {
      nom: "Inapure 5 Tablet",
    },
    {
      nom: "Intaglip-M Tablet",
    },
    {
      nom: "Itromed 200 Capsule",
    },
    {
      nom: "Ismo 20 Tablet",
    },
    {
      nom: "Isofer Injection",
    },
    {
      nom: "Imidil Cream",
    },
    {
      nom: "Ivabid 5 Tablet",
    },
    {
      nom: "Itaspor 200 Capsule",
    },
    {
      nom: "Ivepred 8 Tablet",
    },
    {
      nom: "Incid-L Tablet",
    },
    {
      nom: "Inderal F 10 Tablet SR",
    },
    {
      nom: "Imxia 5 Solution",
    },
    {
      nom: "Irban 5mg Tablet",
    },
    {
      nom: "Idrofos Kit",
    },
    {
      nom: "Ibugesic ASP Tablet",
    },
    {
      nom: "Immunorel 5gm Solution for Infusion",
    },
    {
      nom: "Imol Suspension",
    },
    {
      nom: "Itaspor-SB Capsule",
    },
    {
      nom: "I Soft Ophthalmic Solution",
    },
    {
      nom: "Impulog Tablet",
    },
    {
      nom: "I-Dew DS Aquagel",
    },
    {
      nom: "Ivrea 1 Cream",
    },
    {
      nom: "Imograf Forte Ointment",
    },
    {
      nom: "Ivepred 16 Tablet",
    },
    {
      nom: "Instaflex P Tablet SR",
    },
    {
      nom: "Itrasys 100 Capsule",
    },
    {
      nom: "Inhalex Respules",
    },
    {
      nom: "Isordil 10 Tablet",
    },
    {
      nom: "Ivanode 5 Tablet",
    },
    {
      nom: "Intalith CR 450 Tablet",
    },
    {
      nom: "Itrostred 200 Capsule",
    },
    {
      nom: "Insugen-R 40IU/ml Solution for Injection",
    },
    {
      nom: "Inzit 4 Tablet",
    },
    {
      nom: "Itromed 100 Capsule",
    },
    {
      nom: "Iobet Eye Drop",
    },
    {
      nom: "Involym Capsule",
    },
    {
      nom: "Ipravent Respirator Solution",
    },
    {
      nom: "Ilapro 10 Tablet",
    },
    {
      nom: "Imdur 60mg Tablet PR",
    },
    {
      nom: "IF 2 Eye Drop",
    },
    {
      nom: "Intimacy Plus 0.03 mg/0.15 mg Tablet",
    },
    {
      nom: "Ivamac 5 Tablet",
    },
    {
      nom: "I-Win 100 Capsule",
    },
    {
      nom: "Itzhh 200 Capsule",
    },
    {
      nom: "Intacept 50mg Injection",
    },
    {
      nom: "I-Dew Soothe Eye Drop",
    },
    {
      nom: "Itrop Plus  Eye Drop",
    },
    {
      nom: "Isonorm 30 SR Tablet",
    },
    {
      nom: "Itradila 200 Capsule",
    },
    {
      nom: "Imidil-C Vaginal Suppository",
    },
    {
      nom: "Ifin 250mg Tablet",
    },
    {
      nom: "Ifin 500 Tablet",
    },
    {
      nom: "I-Win 200 Capsule",
    },
    {
      nom: "Itrafix 200 Capsule",
    },
    {
      nom: "Intacoxia 120 Tablet",
    },
    {
      nom: "Ismo Retard Tablet ER",
    },
    {
      nom: "Infen P Tablet",
    },
    {
      nom: "Insugen 30/70 100IU Refil Cartridge",
    },
    {
      nom: "Itratuf Oral Solution",
    },
    {
      nom: "Immulina Liquid",
    },
    {
      nom: "Ilevro Ophthalmic Suspension",
    },
    {
      nom: "Isolin 2mg Injection",
    },
    {
      nom: "Isoin 20 Capsule",
    },
    {
      nom: "Imat 400 Tablet",
    },
    {
      nom: "Insugen-R 100IU/ml Refil",
    },
    {
      nom: "Iminoral 100 Capsule",
    },
    {
      nom: "Isotroin 5 Capsule",
    },
    {
      nom: "Intasporin Powder",
    },
    {
      nom: "Ivabeat 5 Tablet",
    },
    {
      nom: "Ivecop 12 Tablet",
    },
    {
      nom: "Inditel 40 Tablet",
    },
    {
      nom: "Intacoxia 60mg Tablet",
    },
    {
      nom: "Irivisc DS Eye Drop",
    },
    {
      nom: "Inderal F 5 Tablet SR",
    },
    {
      nom: "Itragreat 100 Capsule",
    },
    {
      nom: "Inramed 5 Tablet",
    },
    {
      nom: "Izra- D40 Capsule SR",
    },
    {
      nom: "Itrazole 100 Capsule",
    },
    {
      nom: "Itromed 200 Capsule",
    },
    {
      nom: "Insuman Rapid 100IU/ml Solution for Injection",
    },
    {
      nom: "Itrason 200 Capsule",
    },
    {
      nom: "Imacin-SR 75 Capsule",
    },
    {
      nom: "I-Tyza Capsule",
    },
    {
      nom: "Itragreat 200 Capsule",
    },
    {
      nom: "Irimist Ophthalmic Solution",
    },
    {
      nom: "Immutil-S 360 Tablet DR",
    },
    {
      nom: "Intacoxia P 60mg/325mg Tablet",
    },
    {
      nom: "Isotane 20 Capsule",
    },
    {
      nom: "Iotim Plus Eye Drop",
    },
    {
      nom: "Insugen 50/50 Injection 100IU/ml",
    },
    {
      nom: "Infinair 10/5mg Tablet",
    },
    {
      nom: "Immutil Tablet",
    },
    {
      nom: "Inosert 50 Tablet",
    },
    {
      nom: "Insuman Comb 25 Injection",
    },
    {
      nom: "Ivabrad 7.5 Tablet",
    },
    {
      nom: "Insuman Comb 25 Injection",
    },
    {
      nom: "Iotim B Ophthalmic Solution",
    },
    {
      nom: "Irovel 150 Tablet",
    },
    {
      nom: "Insugen 30/70 Solution for Injection 40IU/ml",
    },
    {
      nom: "Irovel H Tablet",
    },
    {
      nom: "ITRAGEN 200MG CAPSULE",
    },
    {
      nom: "Iladac 10 Tablet",
    },
    {
      nom: "Inzit 8 Tablet",
    },
    {
      nom: "Itaspor Capsule",
    },
    {
      nom: "Imograf Forte Ointment",
    },
    {
      nom: "Intalfa 3miu Injection",
    },
    {
      nom: "Ibuflamar-P 400mg/325mg Tablet",
    },
    {
      nom: "Inditel AM Tablet",
    },
    {
      nom: "Immulina 800 Tablet",
    },
    {
      nom: "Iban Plus Tablet",
    },
    {
      nom: "Isoin 10 Capsule",
    },
    {
      nom: "Involym Capsule",
    },
    {
      nom: "Inmecin P 25mg/325mg Capsule",
    },
    {
      nom: "Isotroin 30 Capsule",
    },
    {
      nom: "Innomune Tablet",
    },
    {
      nom: "Istaphase MG 2 Tablet PR",
    },
    {
      nom: "Inmecin 50mg Capsule",
    },
    {
      nom: "I Nem 500mg/500mg Injection",
    },
    {
      nom: "Isryl 1 Tablet",
    },
    {
      nom: "Insugen-N 40IU/ml Injection",
    },
    {
      nom: "Ibucon Plus Suspension",
    },
    {
      nom: "Iminoral 50 Capsule",
    },
    {
      nom: "Immulina 400 Tablet",
    },
    {
      nom: "Isryl 2 Tablet",
    },
    {
      nom: "Incid-MD Tablet",
    },
    {
      nom: "Itrasys CF 100 Capsule",
    },
    {
      nom: "Itzhh Capsule",
    },
    {
      nom: "Irimist Gel",
    },
    {
      nom: "Iobrim Eye Drop",
    },
    {
      nom: "IDEBEST 45MG TABLET",
    },
    {
      nom: "Ivf M  150IU Injection",
    },
    {
      nom: "Imxia 10% Solution",
    },
    {
      nom: "Itraclar 100mg Capsule",
    },
    {
      nom: "Intacept 25 Solution for Injection",
    },
    {
      nom: "Inac 50 Tablet",
    },
    {
      nom: "Inogla-M 500 Tablet SR",
    },
    {
      nom: "Ivecop 6 Tablet",
    },
    {
      nom: "Itracip 100 Capsule",
    },
    {
      nom: "Ibugesic AP  Tablet",
    },
    {
      nom: "Itragen 100 Capsule",
    },
    {
      nom: "Itratop 200mg Capsule",
    },
    {
      nom: "Infura 100mg Tablet",
    },
    {
      nom: "Itratuf Capsule",
    },
    {
      nom: "Imograf Forte Lotion",
    },
    {
      nom: "Indclav Bid 228 Dry Syrup",
    },
    {
      nom: "Isryl-M 4 Forte Tablet PR",
    },
    {
      nom: "Instaflex AR 200mg/20mg Capsule SR",
    },
    {
      nom: "Ipravent Rotacaps",
    },
    {
      nom: "Ixarola 15mg Tablet",
    },
    {
      nom: "Ivnex 5gm Infusion",
    },
    {
      nom: "Ismigen Tablet",
    },
    {
      nom: "Itral 1% Ointment",
    },
    {
      nom: "Ibukind Plus 100 mg/162.5 mg Suspension",
    },
    {
      nom: "Inhipraz 40mg Tablet",
    },
    {
      nom: "IT Mac 400mg Tablet SR",
    },
    {
      nom: "IBU-C Tablet",
    },
    {
      nom: "Isonorm 20 Tablet",
    },
    {
      nom: "Imidil Dusting Powder",
    },
    {
      nom: "Iladac DSR Capsule PR",
    },
    {
      nom: "Isozole- DSR Capsule",
    },
    {
      nom: "Imferon S 20mg Injection",
    },
    {
      nom: "Isotane 10 Capsule",
    },
    {
      nom: "Insulate-NP Tablet",
    },
    {
      nom: "Iverscab 12mg Dispersible Tablet",
    },
    {
      nom: "Inditel CH 40 Tablet",
    },
    {
      nom: "Inditel H 40 Tablet",
    },
    {
      nom: "Ivabratco 5 Tablet",
    },
    {
      nom: "Inditel D Capsule SR",
    },
    {
      nom: "Intalith 300 Tablet",
    },
    {
      nom: "Itrasys 400 Capsule",
    },
    {
      nom: "Insulatard 100IU/ml Flexpen",
    },
    {
      nom: "Insulatard HM 100IU/ml Penfill",
    },
    {
      nom: "Itralent 100mg Capsule",
    },
    {
      nom: "Infen Plaster",
    },
    {
      nom: "Iso Aret 20mg Capsule",
    },
    {
      nom: "Infa  -VT Ointment",
    },
    {
      nom: "Itaphyte 200 Capsule",
    },
    {
      nom: "Itrabond 100 Capsule",
    },
    {
      nom: "Itralent 200 Capsule",
    },
    {
      nom: "Itral Eye/Ear Drops",
    },
    {
      nom: "Itrafix 100 Capsule",
    },
    {
      nom: "Irovel 300 Tablet",
    },
    {
      nom: "Inogla Tablet",
    },
    {
      nom: "Iycotic Cream",
    },
    {
      nom: "I-Gesic Eye Drop",
    },
    {
      nom: "Itromed Gel",
    },
    {
      nom: "Iconac MR 8 Tablet",
    },
    {
      nom: "Inditel 20 Tablet",
    },
    {
      nom: "Ivepred 500mg Injection",
    },
    {
      nom: "Itrafix 100 Capsule",
    },
    {
      nom: "Intrazole 200 Capsule",
    },
    {
      nom: "Inosert 25 Tablet",
    },
    {
      nom: "Inosert 100 Tablet",
    },
    {
      nom: "Iladac L Capsule PR",
    },
    {
      nom: "Inditel CH 80 Tablet",
    },
    {
      nom: "Istavel 25mg Tablet",
    },
    {
      nom: "Insugen-R 100IU/ml Solution for Injection",
    },
    {
      nom: "Itrabond 200 Capsule",
    },
    {
      nom: "Itracoe 200 Capsule",
    },
    {
      nom: "Isofeel 0.025 Cream",
    },
    {
      nom: "Irivisc Liquigel",
    },
    {
      nom: "Itrazole 200 Capsule",
    },
    {
      nom: "Itracoe Gel",
    },
    {
      nom: "Ivazine 5 Tablet",
    },
    {
      nom: "Inogla-M 1000 Tablet SR",
    },
    {
      nom: "Isonorm 60 SR Tablet",
    },
    {
      nom: "Inditel AH 40 Tablet",
    },
    {
      nom: "Isomin 20mg Tablet",
    },
    {
      nom: "Ivermect 12mg Tablet",
    },
    {
      nom: "IZ K Soap",
    },
    {
      nom: "Itaspor Powder",
    },
    {
      nom: "Ilosure 4 Tablet",
    },
    {
      nom: "Ivepred 1000mg Injection",
    },
    {
      nom: "Isorus Tablet",
    },
    {
      nom: "Intadine 5% Ointment",
    },
    {
      nom: "Ishape 120mg Capsule",
    },
    {
      nom: "ILet B 2 Tablet PR",
    },
    {
      nom: "Indikof LS Syrup Sugar Free",
    },
    {
      nom: "Ixarola 20mg Tablet",
    },
    {
      nom: "Ilapro D Capsule PR",
    },
    {
      nom: "Intawin 400 Tablet",
    },
    {
      nom: "Ibrex-MT Tablet",
    },
    {
      nom: "Intagesic 50 mg/325 mg Tablet",
    },
    {
      nom: "Irinotel 100mg Injection",
    },
    {
      nom: "I-Sure Capsule",
    },
    {
      nom: "Ibilul Cream",
    },
    {
      nom: "Intrazole 100 Capsule",
    },
    {
      nom: "Ixza 1000mg Injection",
    },
    {
      nom: "Isolor 5 Tablet",
    },
    {
      nom: "Itracip 200mg Capsule",
    },
    {
      nom: "Itraconol 200 Capsule",
    },
    {
      nom: "Isonise 10mg Capsule",
    },
    {
      nom: "Immulina Liquid",
    },
    {
      nom: "Ibvilda M 500 Tablet",
    },
    {
      nom: "Insugen 50/50 Injection 100IU/ml",
    },
    {
      nom: "Itrostred 200 Capsule",
    },
    {
      nom: "I Lax 20mg Capsule",
    },
    {
      nom: "Izra-L Capsule SR",
    },
    {
      nom: "Insugen-N 100IU/ml Injection",
    },
    {
      nom: "Imunotac 0.5 Capsule",
    },
    {
      nom: "Ibitra 100mg Capsule",
    },
    {
      nom: "Isokon 20mg Capsule",
    },
    {
      nom: "Ibitret 10mg Soft Gelatin Capsule",
    },
    {
      nom: "Insugen-N 100IU/ml Refil Injection",
    },
    {
      nom: "Inditel MX 50 Tablet ER",
    },
    {
      nom: "Itra RD 200 Capsule",
    },
    {
      nom: "Iconac Spt Tablet",
    },
    {
      nom: "IZ K Lotion",
    },
    {
      nom: "Itrastar 100mg Capsule",
    },
    {
      nom: "Itracat 200 Capsule",
    },
    {
      nom: "Iversafe Cream",
    },
    {
      nom: "Imulast 200mg Tablet",
    },
    {
      nom: "Iphytoral 100mg Capsule",
    },
    {
      nom: "Itrafung 100 Capsule",
    },
    {
      nom: "Ibitra 200mg Capsule",
    },
    {
      nom: "Instaflex Nano Gel",
    },
    {
      nom: "Ibflux Oral Solution",
    },
    {
      nom: "Itgo-MT Cream",
    },
    {
      nom: "Isokon 10mg Capsule",
    },
    {
      nom: "Itriben 100mg Tablet",
    },
    {
      nom: "Insuman Basal 40IU/ml Injection",
    },
    {
      nom: "Intadine Solution",
    },
    {
      nom: "Itranext Capsule",
    },
    {
      nom: "Induz Capsule",
    },
    {
      nom: "Irimist V Eye Drop",
    },
    {
      nom: "Itraderm DS Capsule",
    },
    {
      nom: "Instigo-D Tablet",
    },
    {
      nom: "Ilosure 6mg Tablet",
    },
    {
      nom: "Ismet 500mg Tablet",
    },
    {
      nom: "Ismet 500mg Tablet",
    },
    {
      nom: "Itraclar 200 Capsule",
    },
    {
      nom: "Itrostred 100 Capsule",
    },
    {
      nom: "Iversafe Lotion",
    },
    {
      nom: "Itorate Capsule",
    },
    {
      nom: "Isoperio 10mg Capsule",
    },
    {
      nom: "Inovas F Tablet",
    },
    {
      nom: "Itracutis  100 Capsule",
    },
    {
      nom: "Intalon  Liquid",
    },
    {
      nom: "Instacam Mouth Gel",
    },
    {
      nom: "Itgo-O2 Tablet",
    },
    {
      nom: "Itgo 50DT Tablet",
    },
    {
      nom: "Ibithral 500mg Tablet",
    },
    {
      nom: "Itriben 200 Capsule",
    },
    {
      nom: "Itracoe 400 SR Tablet",
    },
    {
      nom: "Isofeel 0.1 Gel",
    },
    {
      nom: "Itraderm Capsule",
    },
    {
      nom: "Ivables 7.5 Tablet",
    },
    {
      nom: "Itratuf Capsule",
    },
    {
      nom: "Isopil 5 Tablet",
    },
    {
      nom: "Ibgliptin 20 Tablet",
    },
    {
      nom: "Intalon  Liquid",
    },
    {
      nom: "Itracyp 200mg Capsule",
    },
    {
      nom: "Itsbest 200 Capsule",
    },
    {
      nom: "Junior Lanzol 15mg Tablet DT",
    },
    {
      nom: "Janumet 50mg/500mg Tablet",
    },
    {
      nom: "Jardiance 25mg Tablet",
    },
    {
      nom: "Jalra-M  50mg/500mg Tablet",
    },
    {
      nom: "Just Tears Eye Drop",
    },
    {
      nom: "Januvia 100mg Tablet",
    },
    {
      nom: "Janumet 50mg/1000mg Tablet",
    },
    {
      nom: "Jardiance 10mg Tablet",
    },
    {
      nom: "Jalra 50mg Tablet",
    },
    {
      nom: "Junior Lanzol 30mg Tablet DT",
    },
    {
      nom: "Jointace DN Tablet",
    },
    {
      nom: "Januvia 50mg Tablet",
    },
    {
      nom: "Janumet XR CP Tablet",
    },
    {
      nom: "Jardiance Met 12.5mg/500mg Tablet",
    },
    {
      nom: "Jectocos Plus Injection 1.5ml",
    },
    {
      nom: "Jupiros 10 Tablet",
    },
    {
      nom: "Juvobin 40 Injection",
    },
    {
      nom: "Jalra-M  50mg/1000mg Tablet",
    },
    {
      nom: "Jupiros-F Tablet",
    },
    {
      nom: "Jardiance Met 12.5mg/1000mg Tablet",
    },
    {
      nom: "Jointace OD Tablet",
    },
    {
      nom: "Jilazo Solution for Injection",
    },
    {
      nom: "Justin 12.5mg Suppository",
    },
    {
      nom: "Just Tears Liquigel",
    },
    {
      nom: "Jenvac Vaccine",
    },
    {
      nom: "Jointace-DN Super Tablet",
    },
    {
      nom: "Julax 10mg Tablet",
    },
    {
      nom: "Jectocos 50mg Injection",
    },
    {
      nom: "Juliana Tablet",
    },
    {
      nom: "Jupiros Gold 10 Capsule",
    },
    {
      nom: "Jubira 10 Tablet",
    },
    {
      nom: "Joincerin M  Tablet",
    },
    {
      nom: "Jupiros 20 Tablet",
    },
    {
      nom: "Joykem ODT 50 Tablet",
    },
    {
      nom: "Junior Cipeg Powder for Oral Solution",
    },
    {
      nom: "Jupiros 5 Tablet",
    },
    {
      nom: "Jalra-M  50mg/850mg Tablet",
    },
    {
      nom: "Joykem ODT 200 Tablet",
    },
    {
      nom: "Justin 25mg Suppository",
    },
    {
      nom: "Januvia 25mg Tablet",
    },
    {
      nom: "Joten M Tablet",
    },
    {
      nom: "Jupicid DSR 30mg/40mg Capsule",
    },
    {
      nom: "Jubiglim Trio 2 Tablet PR",
    },
    {
      nom: "Jimlig 100 Capsule",
    },
    {
      nom: "Jubiglim M 2 Tablet PR",
    },
    {
      nom: "Jonac Gel",
    },
    {
      nom: "Joten 20mg Tablet",
    },
    {
      nom: "Justaday Capsule",
    },
    {
      nom: "Jubiglim MV 2 Tablet SR",
    },
    {
      nom: "Jubira F 5 Tablet",
    },
    {
      nom: "Jubiflam Plus Tablet",
    },
    {
      nom: "Jubira 5 Tablet",
    },
    {
      nom: "Joykem ODT 400mg Tablet",
    },
    {
      nom: "J-Ring M Forte Tablet ER",
    },
    {
      nom: "Joxcy 500mg Tablet",
    },
    {
      nom: "Jotair L Tablet",
    },
    {
      nom: "Joykem ODT 300 Tablet",
    },
    {
      nom: "Joyneca Anti fungal Soap",
    },
    {
      nom: "Jidox 200mg Tablet",
    },
    {
      nom: "Joyace Nano Gel 2X",
    },
    {
      nom: "Jifon 200 Tablet",
    },
    {
      nom: "Joypride 400mg Tablet",
    },
    {
      nom: "Jufate O 1000 mg/20 mg Suspension Sugar Free",
    },
    {
      nom: "Januric SR 250 Tablet",
    },
    {
      nom: "Jufate O 1000 mg/20 mg Suspension",
    },
    {
      nom: "Ketoscalp Shampoo from Leeford for Antifungal Infections",
    },
    {
      nom: "Ketostar Cream",
    },
    {
      nom: "Kidpred Syrup",
    },
    {
      nom: "Ketoflam-P Tablet",
    },
    {
      nom: "Keto Cream",
    },
    {
      nom: "Ketostar Soap",
    },
    {
      nom: "Ketofly Soap from Leeford for Skin Infections",
    },
    {
      nom: "Kutub 30 X Tablet",
    },
    {
      nom: "Keralin Ointment",
    },
    {
      nom: "Kufril LS Drop",
    },
    {
      nom: "Ketanov 10mg Tablet",
    },
    {
      nom: "Ketocip 2% Shampoo from Cipla for Antifungal Infections",
    },
    {
      nom: "Kefpod CV 200 Tablet",
    },
    {
      nom: "Kinpride Tablet",
    },
    {
      nom: "Ketostar Anti Dandruff Lotion",
    },
    {
      nom: "K-Trip Forte Tablet",
    },
    {
      nom: "KZ Plus Lotion",
    },
    {
      nom: "K-Glim-M 1mg Tablet PR",
    },
    {
      nom: "Kefpod 200mg Tablet",
    },
    {
      nom: "Ketorol Injection",
    },
    {
      nom: "Ketasma Tablet",
    },
    {
      nom: "Kineto-DP Capsule",
    },
    {
      nom: "Kofarest-PD Drop",
    },
    {
      nom: "K20 Soap",
    },
    {
      nom: "Keto-B Lotion",
    },
    {
      nom: "Keto-AZ Lotion",
    },
    {
      nom: "Keppra 500mg Tablet",
    },
    {
      nom: "K-Stat 500mg Tablet",
    },
    {
      nom: "Ketanov Injection",
    },
    {
      nom: "Ketocip Tablet",
    },
    {
      nom: "Kinetozyme Tablet",
    },
    {
      nom: "K-Glim-M 2mg Tablet PR",
    },
    {
      nom: "Kevon Lotion",
    },
    {
      nom: "Kevon Lotion",
    },
    {
      nom: "Ketanov DT 10mg Tablet",
    },
    {
      nom: "Ketoplast Plaster",
    },
    {
      nom: "Kenozole Cream",
    },
    {
      nom: "Ketoalfa  Tablet",
    },
    {
      nom: "Kenacort 10mg Injection",
    },
    {
      nom: "Keto Soap",
    },
    {
      nom: "K-Cit Oral Solution",
    },
    {
      nom: "Ketomar  Ophthalmic Solution",
    },
    {
      nom: "Kofarest-LS Syrup",
    },
    {
      nom: "Korandil 10 Tablet",
    },
    {
      nom: "Konaz Antifungal Cream",
    },
    {
      nom: "Kofarest Syrup",
    },
    {
      nom: "Kenz Soap",
    },
    {
      nom: "Katadol Capsule",
    },
    {
      nom: "Kitmox  Eye Drop",
    },
    {
      nom: "KLM-D3 Nano Drops",
    },
    {
      nom: "KLM-FX 180 Tablet",
    },
    {
      nom: "Kineto Forte Tablet",
    },
    {
      nom: "K-Gem Tablet",
    },
    {
      nom: "Konaz -CT Lotion",
    },
    {
      nom: "Ktc Medicated Shampoo",
    },
    {
      nom: "K-Ion 10mg Tablet",
    },
    {
      nom: "Kimet XL 25 Tablet",
    },
    {
      nom: "Keto Gold Soap",
    },
    {
      nom: "KZ-XL Cream",
    },
    {
      nom: "Kenz Lotion",
    },
    {
      nom: "Keto SZ Hair Wash",
    },
    {
      nom: "Kufril D Syrup",
    },
    {
      nom: "K-Cor 10 Tablet",
    },
    {
      nom: "K-Glim 1mg Tablet",
    },
    {
      nom: "Kerashine-F  Tablet",
    },
    {
      nom: "Ketoflox Ophthalmic Solution",
    },
    {
      nom: "K-Pio-Gm Tablet ER",
    },
    {
      nom: "KZ Dusting Powder",
    },
    {
      nom: "Ketograce Tablet",
    },
    {
      nom: "Kera XL M Solution",
    },
    {
      nom: "Kelfer 500 Capsule",
    },
    {
      nom: "Ketorol Gel",
    },
    {
      nom: "Ketofly 200mg Tablet",
    },
    {
      nom: "Ketonate Cream",
    },
    {
      nom: "K20 Cream",
    },
    {
      nom: "Kefpod Suspension Orange",
    },
    {
      nom: "Kinetozyme-D Tablet",
    },
    {
      nom: "Ketoflam T 4 Tablet",
    },
    {
      nom: "Kitmox-LD  Opthalmic Suspension",
    },
    {
      nom: "Kipnol TR 40 Capsule",
    },
    {
      nom: "Keppra 100mg Syrup",
    },
    {
      nom: "Kneejoint Care Tablet",
    },
    {
      nom: "Kinpride SR Tablet",
    },
    {
      nom: "Kofarest Drop",
    },
    {
      nom: "Ktc Soap",
    },
    {
      nom: "Kidodent Mouth Wash Bubble Fruit",
    },
    {
      nom: "Kenz Tablet",
    },
    {
      nom: "Kojiplus-TX Cream",
    },
    {
      nom: "Kenozole Shampoo",
    },
    {
      nom: "Ketoneph Tablet",
    },
    {
      nom: "Keto Dusting Powder",
    },
    {
      nom: "Ketoflam SR Tablet",
    },
    {
      nom: "Ketodel Tablet",
    },
    {
      nom: "Ketafung CT Lotion",
    },
    {
      nom: "Kosat Syrup Alcohol &amp; Sugar Free",
    },
    {
      nom: "Ketonext CT Shampoo",
    },
    {
      nom: "Ketafung-Z Plus Lotion",
    },
    {
      nom: "Klm Klin  Soap",
    },
    {
      nom: "K-Stat-ET Tablet",
    },
    {
      nom: "Kombiglyze  XR 5mg/1000mg Tablet",
    },
    {
      nom: "Kefpod O 200 mg/200 mg Tablet",
    },
    {
      nom: "Kansel -DS Gel",
    },
    {
      nom: "K-Pio-Gm 1mg Tablet ER",
    },
    {
      nom: "Kleangut Plus Oral Emulsion Peppermint",
    },
    {
      nom: "Kansel-B Cream",
    },
    {
      nom: "Kiofiber Powder",
    },
    {
      nom: "Kyrah Tablet",
    },
    {
      nom: "K2-Zole Soap",
    },
    {
      nom: "Keppra 250mg Tablet",
    },
    {
      nom: "Kimet XL 50 Tablet",
    },
    {
      nom: "Klean Tears Ultra Eye Drop",
    },
    {
      nom: "Klinface-A Gel",
    },
    {
      nom: "Kinlax Oral Suspension Mint Sugar Free",
    },
    {
      nom: "Keppra 750mg Tablet",
    },
    {
      nom: "K-Met 500mg Tablet PR",
    },
    {
      nom: "Kombiglyze  XR 5mg/500mg Tablet",
    },
    {
      nom: "Kansel -DS Lotion",
    },
    {
      nom: "Ketamide Soap",
    },
    {
      nom: "K2-Zole Solution",
    },
    {
      nom: "Ksan Tablet",
    },
    {
      nom: "Ketovate Cream",
    },
    {
      nom: "K-Pio 15 Tablet",
    },
    {
      nom: "Kevon Tablet",
    },
    {
      nom: "Kanamac 1000 Injection",
    },
    {
      nom: "Kilfat Tablet",
    },
    {
      nom: "Kofover Expectorant Raspberry Strawberry",
    },
    {
      nom: "Ketafung Cream",
    },
    {
      nom: "Ketograce Sachet",
    },
    {
      nom: "Keto Cream",
    },
    {
      nom: "Klox-D 500 Capsule",
    },
    {
      nom: "Ktl-Plus Eye Drops",
    },
    {
      nom: "Keto Lotion",
    },
    {
      nom: "Kanamac 750 Injection",
    },
    {
      nom: "Keppra 1000mg Tablet",
    },
    {
      nom: "Kerashine-CT Anti-Dandruff Lotion",
    },
    {
      nom: "Ketol DT Tablet",
    },
    {
      nom: "K-Glim 2mg Tablet",
    },
    {
      nom: "Kchek 15gm Sachet",
    },
    {
      nom: "Kitnor Shampoo",
    },
    {
      nom: "Kelvin 500mg Tablet",
    },
    {
      nom: "Keto-B Lotion",
    },
    {
      nom: "Ketafung Lotion",
    },
    {
      nom: "K-Glim-M Forte 1mg Tablet PR",
    },
    {
      nom: "Ketofast Shampoo",
    },
    {
      nom: "Kevon Cream",
    },
    {
      nom: "Ketzz 2% Cream",
    },
    {
      nom: "Ketar Scalp Solution",
    },
    {
      nom: "Kevon Zip Hair Conditioner",
    },
    {
      nom: "Ketonext Shampoo",
    },
    {
      nom: "Kevon Zip Hair Conditioner",
    },
    {
      nom: "Ketotreat Tablet",
    },
    {
      nom: "Ketobact Cream",
    },
    {
      nom: "Kimet XL 12.5 Tablet",
    },
    {
      nom: "Ketol-Z Lotion",
    },
    {
      nom: "Klarim 250mg Tablet",
    },
    {
      nom: "Ketofine Cream",
    },
    {
      nom: "Ketofast Soap",
    },
    {
      nom: "Kanamac 500 Injection",
    },
    {
      nom: "Kurazol Shampoo",
    },
    {
      nom: "Kamrab Injection",
    },
    {
      nom: "Ktl  Eye Drop",
    },
    {
      nom: "Kozol Lotion",
    },
    {
      nom: "Ketonext AF Lotion",
    },
    {
      nom: "Kitnor Soap",
    },
    {
      nom: "Ketofine-B Cream",
    },
    {
      nom: "Ktc 2% Cream",
    },
    {
      nom: "Kaycut Powder",
    },
    {
      nom: "Kalzin 6L Injection",
    },
    {
      nom: "Ketovate Tablet",
    },
    {
      nom: "Ketosh Shampoo",
    },
    {
      nom: "Ketonext Cream",
    },
    {
      nom: "Kozol ZP Shampoo",
    },
    {
      nom: "Kidnymax Tablet",
    },
    {
      nom: "K2-Ziv Shampoo",
    },
    {
      nom: "Ketomed Plus Soap",
    },
    {
      nom: "Ketoliz 2% Cream",
    },
    {
      nom: "Keycept S 360 Tablet",
    },
    {
      nom: "Kronostar 300 Tablet CR",
    },
    {
      nom: "Kayavate S Lotion",
    },
    {
      nom: "K Shine Lotion",
    },
    {
      nom: "Kozol Zpto Lotion",
    },
    {
      nom: "Kronostar 500 Tablet CR",
    },
    {
      nom: "Ketonext Soap",
    },
    {
      nom: "Ketomega Tablet",
    },
    {
      nom: "Ketox Cream",
    },
    {
      nom: "Ketonol Shampoo",
    },
    {
      nom: "Ketoff Lotion",
    },
    {
      nom: "Ketogold Medicated Soap",
    },
    {
      nom: "Ketogold Medicated Soap",
    },
    {
      nom: "Ketral  2% Scalp Solution",
    },
    {
      nom: "Ketoberg Soap",
    },
    {
      nom: "Ketofine Soap",
    },
    {
      nom: "K Terbimax Cream",
    },
    {
      nom: "Ketodust 200mg Tablet",
    },
    {
      nom: "Ketovate Soap",
    },
    {
      nom: "Ketofine Lotion",
    },
    {
      nom: "Kozol-B Cream",
    },
    {
      nom: "Ketotek Soap",
    },
    {
      nom: "Ketopan Soap",
    },
    {
      nom: "Ketzi Cream",
    },
    {
      nom: "Klinique Shampoo",
    },
    {
      nom: "Kozol Soap",
    },
    {
      nom: "Kneesafe-GM Tablet",
    },
    {
      nom: "K2-Zole LD Solution",
    },
    {
      nom: "Kudzuflam 100mg/325mg/15mg Tablet",
    },
    {
      nom: "Klinique Forte  Anti-Dandruff Shampoo",
    },
    {
      nom: "Keyzol Cream",
    },
    {
      nom: "Ketodust Soap",
    },
    {
      nom: "Klinique Plus  Lotion",
    },
    {
      nom: "Ketonex Shampoo",
    },
    {
      nom: "Kerashine-K Lotion",
    },
    {
      nom: "Kansel-IT 200 Capsule",
    },
    {
      nom: "Ketoday Shampoo",
    },
    {
      nom: "Kneox Tablet",
    },
    {
      nom: "Ketodust Cream",
    },
    {
      nom: "Ketoya 2% Cream",
    },
    {
      nom: "Ketodust Cream",
    },
    {
      nom: "Ketonite Cream",
    },
    {
      nom: "Ketoya 2% Cream",
    },
    {
      nom: "Keyzol Soap",
    },
    {
      nom: "Kayavate  Lotion",
    },
    {
      nom: "Ketofine Lotion",
    },
    {
      nom: "Kezop Soap",
    },
    {
      nom: "Ketocaa Soap",
    },
    {
      nom: "Lasilactone  50 Tablet",
    },
    {
      nom: "Levoflox 500 Tablet",
    },
    {
      nom: "Lubrex Eye Drop",
    },
    {
      nom: "Levolin 1mg Syrup",
    },
    {
      nom: "Lasix Tablet",
    },
    {
      nom: "Lipaglyn Tablet",
    },
    {
      nom: "Levocet Tablet",
    },
    {
      nom: "Lanol ER Tablet",
    },
    {
      nom: "Levocet M Tablet",
    },
    {
      nom: "Levera 500 Tablet",
    },
    {
      nom: "Lizolid 600 Tablet",
    },
    {
      nom: "Liofen 10 Tablet",
    },
    {
      nom: "Letroz Tablet",
    },
    {
      nom: "Lox 2% Jelly",
    },
    {
      nom: "Lulifin Cream",
    },
    {
      nom: "Lopamide Tablet",
    },
    {
      nom: "Lumerax 80 Tablet",
    },
    {
      nom: "Lyrica 75mg Capsule",
    },
    {
      nom: "Levolin 0.63mg Respules",
    },
    {
      nom: "Lysoflam Tablet",
    },
    {
      nom: "Lantus 100IU/ml Solution for Injection",
    },
    {
      nom: "Lesuride Tablet",
    },
    {
      nom: "L-Cin 500 Tablet",
    },
    {
      nom: "Lecope Tablet",
    },
    {
      nom: "Lariago 250mg Tablet",
    },
    {
      nom: "Lactifiber  Granules",
    },
    {
      nom: "Levocet Syrup",
    },
    {
      nom: "Lariago-DS Tablet",
    },
    {
      nom: "L-Hist Mont Tablet",
    },
    {
      nom: "Lasix Injection",
    },
    {
      nom: "LCZ Tablet",
    },
    {
      nom: "Lupi-HCG 5000 Injection",
    },
    {
      nom: "Lubistar 0.5% Eye Drop",
    },
    {
      nom: "Lactihep Syrup",
    },
    {
      nom: "Locula 20% Eye Drop",
    },
    {
      nom: "Linid Tablet",
    },
    {
      nom: "Loxof 500mg Tablet",
    },
    {
      nom: "Levosiz-M Tablet",
    },
    {
      nom: "Lanoxin Tablet",
    },
    {
      nom: "Lantus 100IU/ml Solution for Injection",
    },
    {
      nom: "Lulican Cream",
    },
    {
      nom: "Levolin 50mcg Inhaler",
    },
    {
      nom: "Lizoforce 600 Tablet",
    },
    {
      nom: "Lupituss Oral Suspension",
    },
    {
      nom: "Losar 50 Tablet",
    },
    {
      nom: "Levolin Plus Syrup",
    },
    {
      nom: "Losar-H Tablet",
    },
    {
      nom: "Laveta M  Tablet",
    },
    {
      nom: "Lecope-M Tablet",
    },
    {
      nom: "Lipicard 160 Tablet",
    },
    {
      nom: "L Montus Tablet",
    },
    {
      nom: "Lecope-AD Tablet",
    },
    {
      nom: "Lotepred T Eye Drop",
    },
    {
      nom: "Lubimoist Eye Drop",
    },
    {
      nom: "Letoval Tablet",
    },
    {
      nom: "Lipikind 10 Tablet",
    },
    {
      nom: "Lemolate Gold  Tablet",
    },
    {
      nom: "Lactihep Plus Oral Emulsion",
    },
    {
      nom: "Liv-Cet 5 Tablet",
    },
    {
      nom: "Lantus Solostar 100IU/ml Solution for Injection",
    },
    {
      nom: "Linox 600 Tablet",
    },
    {
      nom: "Lorfast Meltab Tablet",
    },
    {
      nom: "Lobet 100mg Tablet",
    },
    {
      nom: "Labebet 100mg Tablet",
    },
    {
      nom: "Lesuride Injection",
    },
    {
      nom: "Lulimac Cream",
    },
    {
      nom: "Lorfast-AM Tablet",
    },
    {
      nom: "Livafin Cream",
    },
    {
      nom: "Lomofen Plus Tablet",
    },
    {
      nom: "Levipil Injection",
    },
    {
      nom: "Lipvas 10 Tablet",
    },
    {
      nom: "Levozet M Tablet",
    },
    {
      nom: "Lithosun SR Tablet",
    },
    {
      nom: "Levipil Syrup",
    },
    {
      nom: "Levomac 500 Tablet",
    },
    {
      nom: "L Dio 1 Tablet",
    },
    {
      nom: "Laveta M  Syrup",
    },
    {
      nom: "Lyser D Tablet",
    },
    {
      nom: "Lupirtin-P Tablet",
    },
    {
      nom: "Lacrigel Ocular Lubricant",
    },
    {
      nom: "Levocet M Syrup",
    },
    {
      nom: "Loc Tears Fusion Eye Drop",
    },
    {
      nom: "Long Drive-Gold Tablet",
    },
    {
      nom: "Lulibet Cream",
    },
    {
      nom: "Lubrex-DS Eye Drop",
    },
    {
      nom: "Lulilok Cream",
    },
    {
      nom: "Lithosun 300 Tablet",
    },
    {
      nom: "Loette Tablet",
    },
    {
      nom: "Lyser Forte Tablet",
    },
    {
      nom: "Lanzol 30 Capsule",
    },
    {
      nom: "Lonopin 40mg Injection",
    },
    {
      nom: "Lotegate Eye Drop",
    },
    {
      nom: "Levozet Tablet",
    },
    {
      nom: "Lipirose 10 Tablet",
    },
    {
      nom: "Lactihep Syrup",
    },
    {
      nom: "Levosiz 10 Tablet",
    },
    {
      nom: "Lipvas 20 Tablet",
    },
    {
      nom: "Lacoset 100 Tablet",
    },
    {
      nom: "Lubrijoint 500 Tablet",
    },
    {
      nom: "Leon 500 Tablet",
    },
    {
      nom: "Lomela Cream",
    },
    {
      nom: "Lulizol Cream",
    },
    {
      nom: "Lexanox Plus Oral Paste Sugar Free",
    },
    {
      nom: "Lupi-HMG 150 Injection",
    },
    {
      nom: "Levocetrizen 5mg Tablet",
    },
    {
      nom: "Losar 25 Tablet",
    },
    {
      nom: "Lysatone Plus Syrup Sugar Free",
    },
    {
      nom: "Lefno 10 Tablet",
    },
    {
      nom: "Lefno 20 Tablet",
    },
    {
      nom: "Larinject 50mg Injection",
    },
    {
      nom: "Lycor 1% Cream",
    },
    {
      nom: "Levoday 500 Tablet",
    },
    {
      nom: "Levoflox 750 Tablet",
    },
    {
      nom: "Lubrijoint OD Tablet",
    },
    {
      nom: "Lizomac Tablet",
    },
    {
      nom: "L-Sys Cream",
    },
    {
      nom: "L-Cin OZ Tablet",
    },
    {
      nom: "Luliderm Cream",
    },
    {
      nom: "Lefra 20 Tablet",
    },
    {
      nom: "Laretol Capsule",
    },
    {
      nom: "Lukotas HD Tablet SR",
    },
    {
      nom: "Levoflox 250 Tablet",
    },
    {
      nom: "Lotepred LS Eye Drop",
    },
    {
      nom: "Lupi-HMG 75 Injection",
    },
    {
      nom: "Lupi-HCG 10000 Injection",
    },
    {
      nom: "Looz Oral Solution",
    },
    {
      nom: "L-pred Ophthalmic Suspension",
    },
    {
      nom: "Lupizol-ZS Anti-dandruff Shampoo",
    },
    {
      nom: "Levolin 0.31mg Respules",
    },
    {
      nom: "L-Sys Lotion",
    },
    {
      nom: "Lipirose-F 10 Tablet",
    },
    {
      nom: "Lodoz 2.5 Tablet",
    },
    {
      nom: "Levoflox 500 Infusion",
    },
    {
      nom: "Looz Enema",
    },
    {
      nom: "Levipil 250 Tablet",
    },
    {
      nom: "Laxitol Syrup",
    },
    {
      nom: "Lubistar 1% Eye Drop",
    },
    {
      nom: "Lobate Cream",
    },
    {
      nom: "Levigress 500 Tablet",
    },
    {
      nom: "Long Drive 30mg Tablet",
    },
    {
      nom: "Lipikind 20 Tablet",
    },
    {
      nom: "Lozivate-MF Ointment",
    },
    {
      nom: "Lefra 10 Tablet",
    },
    {
      nom: "Laregab NT 400mg/10mg Tablet",
    },
    {
      nom: "Liofen XL 10 Capsule",
    },
    {
      nom: "Levipil 750 Tablet",
    },
    {
      nom: "Levepsy 500 Tablet",
    },
    {
      nom: "Latoprost RT BKC Free Eye Drop",
    },
    {
      nom: "Lexanox Oral Paste",
    },
    {
      nom: "Lacosam 100 Tablet",
    },
    {
      nom: "Lipvas 40 Tablet",
    },
    {
      nom: "Lobak  Tablet",
    },
    {
      nom: "Lobate GN Skin Cream",
    },
    {
      nom: "Lupase 10000 Tablet",
    },
    {
      nom: "Loftair Capsule",
    },
    {
      nom: "Linokem 600 Tablet",
    },
    {
      nom: "Lenteclin LB 100mg Capsule",
    },
    {
      nom: "Lipikind-AS Capsule",
    },
    {
      nom: "Lactomed Suspension",
    },
    {
      nom: "Loceryl Nail Lacquer",
    },
    {
      nom: "Levera Solution",
    },
    {
      nom: "Liofen 5 Tablet",
    },
    {
      nom: "Luprodex Depot 3.75mg Injection",
    },
    {
      nom: "Lmwx 40 Injection",
    },
    {
      nom: "Lulifin Lotion",
    },
    {
      nom: "Laregab-AT Tablet",
    },
    {
      nom: "Lubowel 24 Soft Gelatin Capsule",
    },
    {
      nom: "Liquid Parafin",
    },
    {
      nom: "Lincotus DX  Dry Cough Formula",
    },
    {
      nom: "Lumigan 0.01% Ophthalmic Solution",
    },
    {
      nom: "Lizoforce Dry Syrup",
    },
    {
      nom: "Liofen XL 20 Capsule",
    },
    {
      nom: "Lulibrut Cream",
    },
    {
      nom: "Lipicard Capsule",
    },
    {
      nom: "Lysoflam-MR Tablet",
    },
    {
      nom: "Lupisulin M 30 Solution for Injection 40IU/ml",
    },
    {
      nom: "Livafin Cream",
    },
    {
      nom: "Losar-A Tablet",
    },
    {
      nom: "Lulitec Cream",
    },
    {
      nom: "Long Drive 60mg Tablet",
    },
    {
      nom: "Lesuride OD 75 Tablet",
    },
    {
      nom: "Levocet-D Tablet",
    },
    {
      nom: "Laveta-A Capsule SR",
    },
    {
      nom: "Levosiz Tablet",
    },
    {
      nom: "Livoluk Kid Oral Solution",
    },
    {
      nom: "Ldio 1 M 5mg/10mg Tablet",
    },
    {
      nom: "L-Cin Syrup",
    },
    {
      nom: "Lizomed 600 Tablet",
    },
    {
      nom: "Larinate 200 Kit Tablet",
    },
    {
      nom: "Laxit Plus Syrup",
    },
    {
      nom: "Livoluk Oral Solution",
    },
    {
      nom: "Lupi-Fsh 75 Injection",
    },
    {
      nom: "Lariago Suspension",
    },
    {
      nom: "Locula 10% Eye Drop",
    },
    {
      nom: "Linid IV 600mg Infusion",
    },
    {
      nom: "Lupirtin Capsule",
    },
    {
      nom: "Lidozone  Ear Drop",
    },
    {
      nom: "L Montus Oral Suspension",
    },
    {
      nom: "Logidruf Shampoo",
    },
    {
      nom: "Lodoz 5 Tablet",
    },
    {
      nom: "Lmwx 60 Injection",
    },
    {
      nom: "Lubrifresh Eye Drop",
    },
    {
      nom: "L-Cin 750 Tablet",
    },
    {
      nom: "Levacetam 500 Tablet",
    },
    {
      nom: "Livcare Syrup",
    },
    {
      nom: "Ludura Cream",
    },
    {
      nom: "Lariago 40mg Injection",
    },
    {
      nom: "Lobet 20mg Injection",
    },
    {
      nom: "Lupase 25000 Tablet",
    },
    {
      nom: "Lacoset 50 Tablet",
    },
    {
      nom: "Lamitor DT 100 Tablet",
    },
    {
      nom: "Levipil 1g Tablet",
    },
    {
      nom: "Lotemox Eye Drop",
    },
    {
      nom: "Lulican XL Cream",
    },
    {
      nom: "Lacrimos 0.5% Eye Drop",
    },
    {
      nom: "Laveta Tablet DT",
    },
    {
      nom: "Lecet 5mg Tablet",
    },
    {
      nom: "Losakind-H Tablet",
    },
    {
      nom: "Lobate S Ointment",
    },
    {
      nom: "Lulifin Cream",
    },
    {
      nom: "Lynx Active Gel",
    },
    {
      nom: "Lazine M Tablet",
    },
    {
      nom: "Levolin 100mcg Rotacap",
    },
    {
      nom: "Labmox 250mg Capsule",
    },
    {
      nom: "Levera 750 Tablet",
    },
    {
      nom: "Lutiderm Cream",
    },
    {
      nom: "Levazeo 25 Tablet",
    },
    {
      nom: "Looz Peg Oral Solution Orange",
    },
    {
      nom: "Lubrijoint Pro Tablet",
    },
    {
      nom: "Levokast Tablet",
    },
    {
      nom: "Lipikind 40 Tablet",
    },
    {
      nom: "Linospan 600 Tablet",
    },
    {
      nom: "Lumerax 40mg/240mg Tablet",
    },
    {
      nom: "Loratin 10mg Tablet",
    },
    {
      nom: "Lonitab 5 Tablet",
    },
    {
      nom: "Lamitor DT 50 Tablet",
    },
    {
      nom: "Lupilyzer Oral Solution",
    },
    {
      nom: "Lactifiber  Granules",
    },
    {
      nom: "Lipitas 10 Tablet",
    },
    {
      nom: "Lupride Depot 22.5mg Injection",
    },
    {
      nom: "Latoprost Eye Drop",
    },
    {
      nom: "Lupride Depot 11.25mg Injection",
    },
    {
      nom: "Lasma LC Tablet",
    },
    {
      nom: "Lasma LC Tablet",
    },
    {
      nom: "Low-Dex Eye Drops",
    },
    {
      nom: "Lumet 80 Tablet",
    },
    {
      nom: "Lipicure Gold 40 Capsule",
    },
    {
      nom: "Letrohope 2.5 Tablet",
    },
    {
      nom: "Levolin 1 Tablet",
    },
    {
      nom: "Loceryl Cream",
    },
    {
      nom: "Levera 250 Tablet",
    },
    {
      nom: "Lulifin Cream",
    },
    {
      nom: "Lox 2% Injection",
    },
    {
      nom: "Lupin Mira 25 Tablet ER",
    },
    {
      nom: "LCF LS Syrup",
    },
    {
      nom: "Lubrijoint Activ Tablet",
    },
    {
      nom: "Lipocut 120 Capsule",
    },
    {
      nom: "Loxof 750mg Tablet",
    },
    {
      nom: "Lupisoz-D Capsule SR",
    },
    {
      nom: "Levorid D Tablet",
    },
    {
      nom: "Levolin Plus Jr Expectorant",
    },
    {
      nom: "Levorid Tablet",
    },
    {
      nom: "Lecope Syrup",
    },
    {
      nom: "Licab Tablet",
    },
    {
      nom: "Lac Soft C Gel",
    },
    {
      nom: "Levocetrizen 10mg Tablet",
    },
    {
      nom: "Lipicure 20 Tablet",
    },
    {
      nom: "Licab XL Tablet",
    },
    {
      nom: "Lacarnit Injection",
    },
    {
      nom: "Leeford Clinsol Anti Acne Soap",
    },
    {
      nom: "Lamez 100 Tablet",
    },
    {
      nom: "Lamitor OD 100 Tablet SR",
    },
    {
      nom: "L-Cin 250 Tablet",
    },
    {
      nom: "Lipicure 40 Tablet",
    },
    {
      nom: "Lotesol-M Eye Drop",
    },
    {
      nom: "Lulibet Cream",
    },
    {
      nom: "Lezyncet Tablet",
    },
    {
      nom: "Lilituf Cream",
    },
    {
      nom: "LAN 30 Capsule",
    },
    {
      nom: "Loteflam Eye Drop",
    },
    {
      nom: "Levocet M Kid Tablet MD",
    },
    {
      nom: "Luly Cream",
    },
    {
      nom: "Letpro 2.5mg Tablet",
    },
    {
      nom: "Levotac-M Tablet",
    },
    {
      nom: "Lyrica 150mg Capsule",
    },
    {
      nom: "Luray Cream",
    },
    {
      nom: "Lulican Forte 5% Lotion",
    },
    {
      nom: "Luramax 40 Tablet",
    },
    {
      nom: "Lupinem 500mg Injection",
    },
    {
      nom: "Levenue 500 Tablet",
    },
    {
      nom: "L Cetriver 5mg Tablet",
    },
    {
      nom: "LUCEE CREAM",
    },
    {
      nom: "Lulifin Cream",
    },
    {
      nom: "Lornit 150 Tablet",
    },
    {
      nom: "Luliderm Lotion",
    },
    {
      nom: "Leezole VG Vaginal Softgel Capsule",
    },
    {
      nom: "Lobate M Cream",
    },
    {
      nom: "Lipirose 20 Tablet",
    },
    {
      nom: "Lotefast Ophthalmic Suspension",
    },
    {
      nom: "LCZ 10 Tablet",
    },
    {
      nom: "Laxil Oral Solution",
    },
    {
      nom: "Lotel Gel",
    },
    {
      nom: "Lot Eye Drop",
    },
    {
      nom: "Levomac 750 Tablet",
    },
    {
      nom: "Lipirose-Gold 10 Capsule",
    },
    {
      nom: "Lox 10% Spray",
    },
    {
      nom: "Losakind 50 Tablet",
    },
    {
      nom: "Lupituss SF Suspension",
    },
    {
      nom: "Levolin 1.25mg Respules",
    },
    {
      nom: "Lorsaid SD 8 Tablet",
    },
    {
      nom: "Locipil Tablet",
    },
    {
      nom: "Looz Fibre Granules",
    },
    {
      nom: "Loxof OZ Tablet",
    },
    {
      nom: "Loprin 75 Tablet",
    },
    {
      nom: "Lulimac Lotion",
    },
    {
      nom: "Lizomac DS Dry Syrup",
    },
    {
      nom: "LzHH Cream",
    },
    {
      nom: "Levemir 100IU/ml Flexpen",
    },
    {
      nom: "Lafaxid 10 Tablet",
    },
    {
      nom: "Lidocam Mouth Wash",
    },
    {
      nom: "Lupisulin R 40IU/ml Solution for Injection",
    },
    {
      nom: "Lupigest 200 Soft Gelatin Capsule",
    },
    {
      nom: "Leezole Mouth Paint",
    },
    {
      nom: "Leucorin Tablet",
    },
    {
      nom: "Lotel Eye Ointment",
    },
    {
      nom: "Lamitor DT 25 Tablet",
    },
    {
      nom: "Levera XR 500 Tablet",
    },
    {
      nom: "Lasma LC kid Syrup",
    },
    {
      nom: "Lozivate Cream",
    },
    {
      nom: "Luligee Cream",
    },
    {
      nom: "Laregab 100 Capsule",
    },
    {
      nom: "LCD 110 Tablet",
    },
    {
      nom: "Lorfast-AM Syrup",
    },
    {
      nom: "Lacoset 200 Tablet",
    },
    {
      nom: "Lamez 50 Tablet DT",
    },
    {
      nom: "LTK-H Tablet",
    },
    {
      nom: "Lipigo 10 Tablet",
    },
    {
      nom: "Lazine Tablet",
    },
    {
      nom: "Levipil XR 500 Tablet",
    },
    {
      nom: "Lipirose 5 Tablet",
    },
    {
      nom: "LT-Mac  Lotion",
    },
    {
      nom: "Lipicure-TG Tablet",
    },
    {
      nom: "Locula 30% Eye Drop",
    },
    {
      nom: "Lulibor Cream",
    },
    {
      nom: "LP-Mox Eye Drop",
    },
    {
      nom: "Lasma LC Kid Tablet",
    },
    {
      nom: "Lyser DP Tablet",
    },
    {
      nom: "Lipi EZ 40 Tablet",
    },
    {
      nom: "Loftair-L Capsule with Inhaler",
    },
    {
      nom: "Livoluk Fibre  Granules Lemon",
    },
    {
      nom: "Lopid Capsule",
    },
    {
      nom: "Lumerax Dry Syrup",
    },
    {
      nom: "L-Cin OZ Suspension",
    },
    {
      nom: "Lesuride MPS Chewable Tablet",
    },
    {
      nom: "Lupigest SR 200 Tablet",
    },
    {
      nom: "Livafin CP Cream",
    },
    {
      nom: "Lorsaid P 8 Tablet",
    },
    {
      nom: "Lee Dott Capsule",
    },
    {
      nom: "Lacrimos-G Eye Drop",
    },
    {
      nom: "Loceryl Cream",
    },
    {
      nom: "Lotel LS Gel",
    },
    {
      nom: "Lacotide 100mg Tablet",
    },
    {
      nom: "Liponorm F Tablet",
    },
    {
      nom: "Livial Tablet",
    },
    {
      nom: "Liofen 25 Tablet",
    },
    {
      nom: "Lysoflam Forte 100000AU Tablet",
    },
    {
      nom: "Lipi EZ 20 Tablet",
    },
    {
      nom: "Lucoz Cream",
    },
    {
      nom: "Lametec 25 DT Tablet",
    },
    {
      nom: "L Montus Kid Tablet",
    },
    {
      nom: "Lozivate-S Ointment",
    },
    {
      nom: "Lipocut 60 Capsule",
    },
    {
      nom: "Lupisulin M 30 Injection 100IU/ml",
    },
    {
      nom: "Levomac OZ Tablet",
    },
    {
      nom: "Livoluk Oral Solution",
    },
    {
      nom: "Lulibor Lotion",
    },
    {
      nom: "Laxobig  Syrup",
    },
    {
      nom: "Lactolook Oral Solution Sugar Free",
    },
    {
      nom: "Lizomed Oral Suspension",
    },
    {
      nom: "Lozivate-F Cream",
    },
    {
      nom: "Lonopin MD 300mg Injection",
    },
    {
      nom: "Lidogab Gel",
    },
    {
      nom: "Lobate-GM Neo Lotion",
    },
    {
      nom: "Lubrifresh Gel Eye Drop",
    },
    {
      nom: "Laxitol Husk  Granules Sugar Free",
    },
    {
      nom: "Lipicard-AV Tablet",
    },
    {
      nom: "Lorexane Spray",
    },
    {
      nom: "Lornit 500 Tablet",
    },
    {
      nom: "Lupin Bepogra Tablet",
    },
    {
      nom: "Lamitor OD 50 Tablet SR",
    },
    {
      nom: "L-Hist Mont FX Tablet",
    },
    {
      nom: "Lipi EZ 10 Tablet",
    },
    {
      nom: "Lubrijoint 750 Tablet",
    },
    {
      nom: "Levogastrol Tablet",
    },
    {
      nom: "Levilex 500 Tablet",
    },
    {
      nom: "Loy D3 Capsule",
    },
    {
      nom: "Leezole Gel",
    },
    {
      nom: "Listril 5 Tablet",
    },
    {
      nom: "Lupirtin -SR Tablet",
    },
    {
      nom: "Lupoxa OD Tablet SR",
    },
    {
      nom: "Lupin Acp 100mg/325mg Tablet",
    },
    {
      nom: "Lamifin Cream",
    },
    {
      nom: "Looz Fibre Granules",
    },
    {
      nom: "Lamivir HBV Tablet",
    },
    {
      nom: "Lookbrite  Cream",
    },
    {
      nom: "Levera 1000 Tablet",
    },
    {
      nom: "Lametec 100 DT Tablet",
    },
    {
      nom: "Lucrush Cream",
    },
    {
      nom: "Lametec 50 DT Tablet",
    },
    {
      nom: "Lefive M Tablet",
    },
    {
      nom: "Lornit Sachet",
    },
    {
      nom: "Lekast Tablet",
    },
    {
      nom: "L Montus Abl Tablet SR",
    },
    {
      nom: "Lacne Gel",
    },
    {
      nom: "Lotensyl 10 Tablet",
    },
    {
      nom: "Lamifin Lotion",
    },
    {
      nom: "Lurasid 40 Tablet",
    },
    {
      nom: "Lumycan Cream",
    },
    {
      nom: "Lipitas 20 Tablet",
    },
    {
      nom: "Laz 250mg Tablet",
    },
    {
      nom: "Lignox 2 % A Injection",
    },
    {
      nom: "Lupisera D Tablet",
    },
    {
      nom: "LT-Mac Cream",
    },
    {
      nom: "Lizomed 300 Tablet",
    },
    {
      nom: "Lamez 25 Tablet DT",
    },
    {
      nom: "Laxoclear Tablet",
    },
    {
      nom: "Losar-Beta Tablet",
    },
    {
      nom: "Lopres  0.5% Eye Drop",
    },
    {
      nom: "Lostat-H Tablet",
    },
    {
      nom: "Laxday Syrup",
    },
    {
      nom: "Lotesurge Ophthalmic Suspension",
    },
    {
      nom: "Losacar 50 Tablet",
    },
    {
      nom: "Lupigest SR 300 Tablet",
    },
    {
      nom: "Lupin Mira 50 Tablet ER",
    },
    {
      nom: "L-Hist Mont Syrup",
    },
    {
      nom: "Laregab 300mg Capsule",
    },
    {
      nom: "Liofen XL 30 Capsule",
    },
    {
      nom: "Lupisulin R 100IU/ml Cartridge",
    },
    {
      nom: "Livopill -DS Tablet",
    },
    {
      nom: "Lipigo F 10 Tablet",
    },
    {
      nom: "Lumigan 0.03% Ophthalmic Solution",
    },
    {
      nom: "Lacarnit 330 Tablet",
    },
    {
      nom: "Lorox P Tablet",
    },
    {
      nom: "Lupiflex 4 Tablet",
    },
    {
      nom: "Lukotas LC Tablet",
    },
    {
      nom: "Lubistar-CMC 1% Eye Drop",
    },
    {
      nom: "Lamrest 10 Tablet",
    },
    {
      nom: "Locula TR Eye Drop",
    },
    {
      nom: "LTK 50 Tablet",
    },
    {
      nom: "Lupoxa Capsule",
    },
    {
      nom: "Lipril 5 Tablet",
    },
    {
      nom: "Lupihist  Syrup",
    },
    {
      nom: "Lukotrap Tablet",
    },
    {
      nom: "Lupifos Powder",
    },
    {
      nom: "Lizoforce IV Injection",
    },
    {
      nom: "Lukotas FX Tablet",
    },
    {
      nom: "Lymzit 408mg Capsule",
    },
    {
      nom: "Looz Enema Mini",
    },
    {
      nom: "Levosiz-M Kid Tablet",
    },
    {
      nom: "Losacar-H Tablet",
    },
    {
      nom: "Levotac  5mg Tablet",
    },
    {
      nom: "Lostat 50 Tablet",
    },
    {
      nom: "Loparin 40 Injection",
    },
    {
      nom: "Levocet-D Plus Tablet",
    },
    {
      nom: "Lasma 4 Tablet",
    },
    {
      nom: "Lorvas Tablet",
    },
    {
      nom: "Lox 5% Ointment",
    },
    {
      nom: "Lorvas SR Tablet",
    },
    {
      nom: "Leset 5 Tablet",
    },
    {
      nom: "Levroxa 500mg Tablet",
    },
    {
      nom: "Lupitros-Z Eye Drop BKC Free",
    },
    {
      nom: "Luliact Cream",
    },
    {
      nom: "Lozee M Cream",
    },
    {
      nom: "Levexx 500 Tablet",
    },
    {
      nom: "Losium 50 Tablet",
    },
    {
      nom: "Lipitas 40mg Tablet",
    },
    {
      nom: "Levoquin 500mg Tablet",
    },
    {
      nom: "Lubrifresh Gel",
    },
    {
      nom: "Latocom   Eye Drops",
    },
    {
      nom: "L-Sys Cream",
    },
    {
      nom: "Levazeo SR 75 Tablet",
    },
    {
      nom: "Lethyrox 25 Tablet",
    },
    {
      nom: "Lubrigel Ocular Lubricant",
    },
    {
      nom: "Lamifin Tablet",
    },
    {
      nom: "Livopill Tablet",
    },
    {
      nom: "Lacsyp  Syrup",
    },
    {
      nom: "Logifin CL 1% Lotion",
    },
    {
      nom: "Lamifin-M Cream",
    },
    {
      nom: "Lox 2% Jelly",
    },
    {
      nom: "Lonopin 20mg Injection",
    },
    {
      nom: "Latobest Eye Drop",
    },
    {
      nom: "Logisil Capsule",
    },
    {
      nom: "Losanorm 50 Tablet",
    },
    {
      nom: "Lofecam 8 Tablet",
    },
    {
      nom: "Liofen Liquid",
    },
    {
      nom: "Lamitor OD 200 Tablet SR",
    },
    {
      nom: "Livodox Plus Tablet",
    },
    {
      nom: "Lubrinac  Eye Drop",
    },
    {
      nom: "LCZ-Cold Tablet",
    },
    {
      nom: "LCZ Plus New Tablet",
    },
    {
      nom: "Lupisoz Tablet",
    },
    {
      nom: "Lindox-L Capsule",
    },
    {
      nom: "Lincotus EX  Syrup",
    },
    {
      nom: "Levolin 2 Tablet",
    },
    {
      nom: "Listril 10 Tablet",
    },
    {
      nom: "Lilituf Cream",
    },
    {
      nom: "Lipirose-F 5 Tablet",
    },
    {
      nom: "Levera Solution",
    },
    {
      nom: "Latocom CF Eye Drop",
    },
    {
      nom: "Livolexin Suspension",
    },
    {
      nom: "Lizerton B6 Oral Solution Orange Sugar Free",
    },
    {
      nom: "Losakind 25 Tablet",
    },
    {
      nom: "Lonopin 60mg Injection",
    },
    {
      nom: "L-Cin A Tablet",
    },
    {
      nom: "Latina RT Eye Drop",
    },
    {
      nom: "Lotiviz 0.5% Eye Drop",
    },
    {
      nom: "Larentine D 5mg/5mg Tablet",
    },
    {
      nom: "Lupenox 40mg Injection",
    },
    {
      nom: "Levera XR 750 Tablet",
    },
    {
      nom: "Levesam Oral Solution",
    },
    {
      nom: "Lasma 10 Tablet",
    },
    {
      nom: "Lafaxid-D  Tablet",
    },
    {
      nom: "Levepsy 750 Tablet",
    },
    {
      nom: "Letero Tablet",
    },
    {
      nom: "Lupibose 62.5 Tablet",
    },
    {
      nom: "Lulimac XL Cream",
    },
    {
      nom: "Laxiwal Solution",
    },
    {
      nom: "Lurata 40 Tablet",
    },
    {
      nom: "Lulibet Lotion",
    },
    {
      nom: "LTK-AM Tablet",
    },
    {
      nom: "Lefumide 20 Tablet",
    },
    {
      nom: "Lulihalt Cream",
    },
    {
      nom: "Lipicure 80 Tablet",
    },
    {
      nom: "Labecor 100mg Tablet",
    },
    {
      nom: "Lotesol 5 Eye Drop",
    },
    {
      nom: "L-Sys Cream",
    },
    {
      nom: "Lipril 10 Tablet",
    },
    {
      nom: "Levipil XR 1g Tablet",
    },
    {
      nom: "Lupila 10 Tablet",
    },
    {
      nom: "Lacotide 50 Tablet",
    },
    {
      nom: "Lupitros-TZ Eye Drop",
    },
    {
      nom: "Lulizol Cream",
    },
    {
      nom: "Lamictal 50mg Tablet DT",
    },
    {
      nom: "Lofatin Cream",
    },
    {
      nom: "Luliz 1% Cream",
    },
    {
      nom: "Lamivir 150 Tablet",
    },
    {
      nom: "Lulirx Cream",
    },
    {
      nom: "Lamosyn 50 Tablet",
    },
    {
      nom: "Lamez OD 100 Tablet SR",
    },
    {
      nom: "Luhon Cream",
    },
    {
      nom: "Lulimac Cream",
    },
    {
      nom: "Lupidium Tablet",
    },
    {
      nom: "Livoluk Fibre  Granules",
    },
    {
      nom: "Lamosyn 100 Tablet",
    },
    {
      nom: "Lactifem Itch Vaginal Cream Vaginal Cream",
    },
    {
      nom: "Lamitor DT 50 Tablet",
    },
    {
      nom: "Luray Cream",
    },
    {
      nom: "Losar Beta-H Tablet",
    },
    {
      nom: "Lezyncet-M Tablet",
    },
    {
      nom: "Lorfast MT Tablet",
    },
    {
      nom: "Lozivate-MF Ointment",
    },
    {
      nom: "Laveta 10 Tablet DT",
    },
    {
      nom: "Lejet Tablet",
    },
    {
      nom: "LzHH Lotion",
    },
    {
      nom: "Lornoxi P Tablet",
    },
    {
      nom: "Lomela Lite Cream",
    },
    {
      nom: "Levigress 250 Tablet",
    },
    {
      nom: "Lacotide 200mg Tablet",
    },
    {
      nom: "Lastuss LA Syrup",
    },
    {
      nom: "Luligee Cream",
    },
    {
      nom: "Losium-H Tablet",
    },
    {
      nom: "Lacoxa 100mg Tablet",
    },
    {
      nom: "Lozivate-MF Lotion",
    },
    {
      nom: "Lukotas 10mg Tablet",
    },
    {
      nom: "Luliclinz-XL Cream",
    },
    {
      nom: "Lineca Tablet",
    },
    {
      nom: "Lumacip Plus Cream",
    },
    {
      nom: "Lubricart-D Tablet",
    },
    {
      nom: "Leptomate 50 Tablet",
    },
    {
      nom: "Lutiderm Cream",
    },
    {
      nom: "Lenalid 25 Capsule",
    },
    {
      nom: "Lyortam 1gm Injection",
    },
    {
      nom: "Luliderm Cream",
    },
    {
      nom: "Lubry-GM Tablet",
    },
    {
      nom: "Lamifin Lotion",
    },
    {
      nom: "Lupride 4mg Injection",
    },
    {
      nom: "Lipitas 5mg Tablet",
    },
    {
      nom: "Levigress 750 Tablet",
    },
    {
      nom: "Livoluk Oral Solution",
    },
    {
      nom: "Losanorm 50-H Tablet",
    },
    {
      nom: "Lovolkem 250mg Tablet",
    },
    {
      nom: "Losatan H Tablet",
    },
    {
      nom: "Lamitor DT 25 Tablet",
    },
    {
      nom: "Lacom-CV 625 Tablet",
    },
    {
      nom: "Luliderm Cream",
    },
    {
      nom: "Lamez OD 50  Tablet SR",
    },
    {
      nom: "Lipigo 5 Tablet",
    },
    {
      nom: "Lacoset 150 Tablet",
    },
    {
      nom: "Losanorm 25 Tablet",
    },
    {
      nom: "Levemex 500 Tablet",
    },
    {
      nom: "Lethyrox 12.5 Tablet",
    },
    {
      nom: "Lamictal 25mg Dispersible Tablet",
    },
    {
      nom: "Life OK  Eye Drop",
    },
    {
      nom: "Leon 750 Tablet",
    },
    {
      nom: "Lumaglo Cream",
    },
    {
      nom: "Lulifin Lotion",
    },
    {
      nom: "Lacne 20 Softgel Capsule",
    },
    {
      nom: "Limarin 140 Capsule",
    },
    {
      nom: "Levepsy 1000 Tablet",
    },
    {
      nom: "Leepure Tablet",
    },
    {
      nom: "Levepsy 250 Tablet",
    },
    {
      nom: "Laxito Plus Liquid",
    },
    {
      nom: "Losium 25 Tablet",
    },
    {
      nom: "Livafin O 200mg Capsule",
    },
    {
      nom: "Lacrisol Eye Drop",
    },
    {
      nom: "Lulisol Cream",
    },
    {
      nom: "Levera XR 1000 Tablet",
    },
    {
      nom: "Levobact 500 Tablet",
    },
    {
      nom: "Lipophage 60 Capsule",
    },
    {
      nom: "Lactolook Oral Solution Sugar Free",
    },
    {
      nom: "Lacrimos Gel",
    },
    {
      nom: "Lonitab 10 Tablet",
    },
    {
      nom: "Liketears Plus Eye Drop",
    },
    {
      nom: "Loprin-DS Tablet",
    },
    {
      nom: "Levera DT 500 Tablet",
    },
    {
      nom: "Ludura Lotion",
    },
    {
      nom: "Lidozone  Ear Drop",
    },
    {
      nom: "Lidayn Topical Mint",
    },
    {
      nom: "LN Met 50 Tablet ER",
    },
    {
      nom: "Lupiflex 8 Tablet",
    },
    {
      nom: "Levepsy 500mg Injection",
    },
    {
      nom: "Loram  5 Tablet",
    },
    {
      nom: "Lacopsy 50mg Tablet",
    },
    {
      nom: "Lupitros Eye Drop",
    },
    {
      nom: "Levotiz-A Tablet SR",
    },
    {
      nom: "Lee Dott Oral Powder",
    },
    {
      nom: "Lamosyn 25 Tablet",
    },
    {
      nom: "Lacopsy 200 Tablet",
    },
    {
      nom: "Larentine D 5mg/10mg Tablet",
    },
    {
      nom: "Levogastrol OD 75 Tablet SR",
    },
    {
      nom: "Lit M Tablet",
    },
    {
      nom: "Listril Plus Tablet",
    },
    {
      nom: "Livafin -O 100 Capsule",
    },
    {
      nom: "LCF Expectorant",
    },
    {
      nom: "Luly Cream",
    },
    {
      nom: "Lorsaid SD 4 Tablet",
    },
    {
      nom: "Lamifin Dusting Powder",
    },
    {
      nom: "Lurafic 40 Tablet",
    },
    {
      nom: "Lucoz Cream",
    },
    {
      nom: "Levigress 1000 Tablet PR",
    },
    {
      nom: "Levolin Plus Syrup Pineapple &amp; Black currant",
    },
    {
      nom: "Lupicet Tablet",
    },
    {
      nom: "Lacoma T  Eye Drop",
    },
    {
      nom: "Lactigol Granules",
    },
    {
      nom: "Losanorm 25-H Tablet",
    },
    {
      nom: "Lzhh-XL Cream",
    },
    {
      nom: "Luramax 80mg Tablet",
    },
    {
      nom: "Levokast Oral Suspension",
    },
    {
      nom: "Lofatin Lotion",
    },
    {
      nom: "Lupigest 400 Soft Gelatin Capsule",
    },
    {
      nom: "Lulizol Cream",
    },
    {
      nom: "Lotechek Eye Drop",
    },
    {
      nom: "Lipicure 5 Tablet",
    },
    {
      nom: "Lacne 10 Capsule",
    },
    {
      nom: "Lidfast 2% Jelly",
    },
    {
      nom: "Lucazole Cream",
    },
    {
      nom: "Luby Eye Drop",
    },
    {
      nom: "Levepsy Syrup",
    },
    {
      nom: "LCZ-Mont Kid Tablet",
    },
    {
      nom: "LCZ-XP Expectorant",
    },
    {
      nom: "Logidruf Lotion",
    },
    {
      nom: "Luprorin 4 Injection",
    },
    {
      nom: "Liv Daily Capsule",
    },
    {
      nom: "Lashisma  Solution (3ml Each)",
    },
    {
      nom: "Lulilok Cream",
    },
    {
      nom: "Luliyes Cream",
    },
    {
      nom: "Loparin 60 Injection",
    },
    {
      nom: "LUCEE CREAM",
    },
    {
      nom: "Lorsaid OD Tablet ER",
    },
    {
      nom: "Lupidip 5 Tablet",
    },
    {
      nom: "Lokcid-O Gel Mint Sugar Free",
    },
    {
      nom: "Luliford Cream",
    },
    {
      nom: "L-Trix Cream",
    },
    {
      nom: "Lacotab Syrup",
    },
    {
      nom: "Lycomerve Capsule",
    },
    {
      nom: "Liz-M Tablet SR",
    },
    {
      nom: "Levesam Injection",
    },
    {
      nom: "Levokon-M Tablet",
    },
    {
      nom: "Lupisulin M 50 40IU/ml Injection",
    },
    {
      nom: "Ledovanc 500 Injection",
    },
    {
      nom: "Lupipara 650mg Tablet",
    },
    {
      nom: "LTK 25mg Tablet",
    },
    {
      nom: "Lametec Kid Tablet DT",
    },
    {
      nom: "Luliz 1% Cream",
    },
    {
      nom: "Lofatin Cream",
    },
    {
      nom: "Lotechek-LS Eye Drop",
    },
    {
      nom: "Lozapin 100mg Tablet",
    },
    {
      nom: "Liofen 40mg Capsule XL",
    },
    {
      nom: "Lipophage 120 Capsule",
    },
    {
      nom: "Libset Tablet",
    },
    {
      nom: "Losar-CH 12.5 Tablet",
    },
    {
      nom: "Levozen M Tablet",
    },
    {
      nom: "Levomil 40 Capsule ER",
    },
    {
      nom: "Lupigest 100 Capsule",
    },
    {
      nom: "Lefuma  20mg Tablet",
    },
    {
      nom: "Labaneb Respules (2ml Each)",
    },
    {
      nom: "LCFEX-Mont Tablet",
    },
    {
      nom: "Liviz Tablet",
    },
    {
      nom: "Lamifin -Forte Tablet",
    },
    {
      nom: "Lumecare Advance Carmellose Soothing Eye Drop",
    },
    {
      nom: "Losacar-A  Tablet",
    },
    {
      nom: "Lamez OD 150 Tablet SR",
    },
    {
      nom: "Lobaset 10 Tablet",
    },
    {
      nom: "Luliporus Cream",
    },
    {
      nom: "Losartas 50 Tablet",
    },
    {
      nom: "Lmx Forte 500mg/125mg Tablet",
    },
    {
      nom: "LCD 275 Tablet",
    },
    {
      nom: "Lugonist Depot 3.75mg Injection",
    },
    {
      nom: "Lupidip-A Tablet",
    },
    {
      nom: "Lufen Eye Drop",
    },
    {
      nom: "Lcfex Tablet",
    },
    {
      nom: "Luprorin 3.75mg Injection",
    },
    {
      nom: "Leubine Cream",
    },
    {
      nom: "Laformin GV 2mg/500mg/0.2mg Tablet ER",
    },
    {
      nom: "Lulirx Cream",
    },
    {
      nom: "Lircetam 500 Tablet",
    },
    {
      nom: "Leveron 500 Tablet",
    },
    {
      nom: "Lamifin 125 DT Tablet",
    },
    {
      nom: "Levotiz Tablet",
    },
    {
      nom: "Leuprolide 3.75mg Depot One Combipack",
    },
    {
      nom: "Levenue 750 Tablet",
    },
    {
      nom: "Levotiz-M Tablet",
    },
    {
      nom: "Laformin-G 2 Tablet PR",
    },
    {
      nom: "Lurastar 40mg Tablet",
    },
    {
      nom: "Logispor 200 Capsule",
    },
    {
      nom: "Luporal Capsule",
    },
    {
      nom: "Laformin-G 1 Tablet PR",
    },
    {
      nom: "Lilituf Cream",
    },
    {
      nom: "Lifotonin Tablet",
    },
    {
      nom: "Levenue 250 Tablet",
    },
    {
      nom: "Lactopil Oral Solution",
    },
    {
      nom: "Letsure 2.5 Tablet",
    },
    {
      nom: "Lipril-H Tablet",
    },
    {
      nom: "Lulimac XL Lotion",
    },
    {
      nom: "Lastuss-D Syrup",
    },
    {
      nom: "Levetas 500mg Tablet",
    },
    {
      nom: "Lignoace Oral Topical Solution",
    },
    {
      nom: "Lcfex 180 Tablet",
    },
    {
      nom: "Lovax OD 600 Tablet ER",
    },
    {
      nom: "Leukocel 500mg Capsule",
    },
    {
      nom: "Lacotide 150mg Tablet",
    },
    {
      nom: "Levigress Syrup",
    },
    {
      nom: "Levilex 250 Tablet",
    },
    {
      nom: "Lumycan Cream",
    },
    {
      nom: "Luliclin Cream",
    },
    {
      nom: "Lupimon FX 10mg/120mg Tablet",
    },
    {
      nom: "Lumycan Cream",
    },
    {
      nom: "Lurace 40mg Tablet",
    },
    {
      nom: "Lamitor OD 25 Tablet SR",
    },
    {
      nom: "LzHH Cream",
    },
    {
      nom: "Lulirx Spray",
    },
    {
      nom: "Lenalid 5 Capsule",
    },
    {
      nom: "Laxitas Laxative Vanilla Sugar Free",
    },
    {
      nom: "Lurata 80 Tablet",
    },
    {
      nom: "Lamez OD 25 Tablet SR",
    },
    {
      nom: "Lamepil 50 Tablet",
    },
    {
      nom: "Lithic 400mg Tablet SR",
    },
    {
      nom: "Lioresal 25 Tablet",
    },
    {
      nom: "Lutica Cream",
    },
    {
      nom: "LCZ-Mont Suspension",
    },
    {
      nom: "Lulibrut Lotion",
    },
    {
      nom: "Lax 3 Oral Suspension Sugar Free",
    },
    {
      nom: "Lulinext Cream",
    },
    {
      nom: "Lapcort 1% Cream",
    },
    {
      nom: "Liponorm 5mg Tablet",
    },
    {
      nom: "Lacsyp  Syrup",
    },
    {
      nom: "Levtam 500 Tablet",
    },
    {
      nom: "Luliclinz Cream",
    },
    {
      nom: "Lupitros-T Eye Drop",
    },
    {
      nom: "Loram  2.5 Tablet",
    },
    {
      nom: "Levroxa 250mg Tablet",
    },
    {
      nom: "Lezyncet A Tablet",
    },
    {
      nom: "Lanfil DX 60 Capsule MR",
    },
    {
      nom: "Losartas 25 Tablet",
    },
    {
      nom: "Lulibet Cream",
    },
    {
      nom: "Lulirx Spray",
    },
    {
      nom: "Lulinext Lotion Spray",
    },
    {
      nom: "Lulihalt Cream",
    },
    {
      nom: "Leptomate 100 Tablet",
    },
    {
      nom: "Levialfa 500 Tablet",
    },
    {
      nom: "Lulilok Soap",
    },
    {
      nom: "Lozapin 50mg Tablet",
    },
    {
      nom: "Laxiwal Solution",
    },
    {
      nom: "LT-Mac Cream",
    },
    {
      nom: "Losatan 50mg Tablet",
    },
    {
      nom: "Ludura Cream",
    },
    {
      nom: "Lipicure CF 10 Capsule IR",
    },
    {
      nom: "Lue 20 Cream",
    },
    {
      nom: "Lamepil 100 Tablet",
    },
    {
      nom: "L-Sys Topical Solution",
    },
    {
      nom: "Lulibest 1% Cream",
    },
    {
      nom: "Lulipex 1% Cream",
    },
    {
      nom: "Lupila-D Capsule",
    },
    {
      nom: "Lupizol Cream",
    },
    {
      nom: "Lowprost Eye Drop",
    },
    {
      nom: "Levomil 20 Capsule ER",
    },
    {
      nom: "Lurakem 40 Tablet",
    },
    {
      nom: "Lipisafe CV 20 Capsule",
    },
    {
      nom: "Lilituf Lotion",
    },
    {
      nom: "Levexx 250 Tablet",
    },
    {
      nom: "Levilex 750 Tablet",
    },
    {
      nom: "Lurafic 80mg Tablet",
    },
    {
      nom: "Lotak-A Tablet",
    },
    {
      nom: "Lipril AM Tablet",
    },
    {
      nom: "Lulilok Cream",
    },
    {
      nom: "Loxapax 25mg Capsule",
    },
    {
      nom: "Levepsy XR 500 Tablet",
    },
    {
      nom: "Lamepil MR 100 Tablet",
    },
    {
      nom: "Laconext 150 Tablet",
    },
    {
      nom: "Lustre C Cream",
    },
    {
      nom: "Lapezil 10 Tablet",
    },
    {
      nom: "Lulipil Soap",
    },
    {
      nom: "Lucipro 500mg Tablet",
    },
    {
      nom: "Levemex Syrup",
    },
    {
      nom: "Lofatin Cream",
    },
    {
      nom: "Levenig 500 Tablet",
    },
    {
      nom: "Lulibest-XL Cream",
    },
    {
      nom: "Luliyes Cream",
    },
    {
      nom: "Levroxa 750mg Tablet",
    },
    {
      nom: "Liconpride Cream",
    },
    {
      nom: "Levilex 1000 Tablet",
    },
    {
      nom: "Limcor Chewable Tablet Orange",
    },
    {
      nom: "Limcor Chewable Tablet Orange",
    },
    {
      nom: "Livastat-EZ Tablet",
    },
    {
      nom: "Loreb-DSR Capsule",
    },
    {
      nom: "Levenue ER 1000 Tablet",
    },
    {
      nom: "Livcare Syrup",
    },
    {
      nom: "Lifepill 3 Capsule ER",
    },
    {
      nom: "leocan 150mg Tablet",
    },
    {
      nom: "Lumiza 1% Cream",
    },
    {
      nom: "Lamifin Cream",
    },
    {
      nom: "Lutriben Cream",
    },
    {
      nom: "Levtam 250 Tablet",
    },
    {
      nom: "Lexadep 10 Tablet",
    },
    {
      nom: "L-Trix Cream",
    },
    {
      nom: "Laxan Oral Solution",
    },
    {
      nom: "Lulijen Cream",
    },
    {
      nom: "Lotensyl AT Tablet",
    },
    {
      nom: "Lignopar Gel",
    },
    {
      nom: "Lucimac Cream",
    },
    {
      nom: "Levrom-M Syrup",
    },
    {
      nom: "Levocaa 10 Tablet",
    },
    {
      nom: "Lacripex Eye Drop",
    },
    {
      nom: "Lacripex Eye Drop",
    },
    {
      nom: "L-Bakterie OZ Oral Suspension",
    },
    {
      nom: "L-Bakterie OZ Oral Suspension",
    },
    {
      nom: "Myezom 2mg Injection",
    },
    {
      nom: "Meftal-Spas Tablet",
    },
    {
      nom: "Moxicip Eye Drop",
    },
    {
      nom: "Montek LC Tablet",
    },
    {
      nom: "Metrogyl 400 Tablet",
    },
    {
      nom: "Manforce 100mg Tablet",
    },
    {
      nom: "Montair-LC Tablet",
    },
    {
      nom: "Meftal-P Suspension",
    },
    {
      nom: "Mahaflox Eye Drop",
    },
    {
      nom: "Monocef-O 200 Tablet",
    },
    {
      nom: "Moxikind-CV 625 Tablet",
    },
    {
      nom: "Meftal-Forte Tablet",
    },
    {
      nom: "Mosi Eye Drop",
    },
    {
      nom: "Monocef 1gm Injection",
    },
    {
      nom: "Mucaine Gel Mint Sugar Free",
    },
    {
      nom: "Maxtra Syrup",
    },
    {
      nom: "Moximax D Eye Drop",
    },
    {
      nom: "Montina-L Tablet",
    },
    {
      nom: "Mucinac 600 Effervescent Tablet Orange Sugar Free",
    },
    {
      nom: "Monticope Tablet",
    },
    {
      nom: "Meganeuron OD Plus Capsule",
    },
    {
      nom: "Meprate 10mg Tablet",
    },
    {
      nom: "Montair LC Kid Syrup",
    },
    {
      nom: "Moxicip D Eye Drop",
    },
    {
      nom: "Mobizox Tablet",
    },
    {
      nom: "Megalis 20 Tablet",
    },
    {
      nom: "Manforce 50mg Tablet",
    },
    {
      nom: "Myospaz Forte Tablet",
    },
    {
      nom: "Montas-L Tablet",
    },
    {
      nom: "Met XL 25 Tablet",
    },
    {
      nom: "Milflox 0.5% Eye Drop",
    },
    {
      nom: "Medrol 4mg Tablet",
    },
    {
      nom: "Mezol Eye Drop",
    },
    {
      nom: "Manforce Staylong Tablet",
    },
    {
      nom: "Moxicip KT Eye Drop",
    },
    {
      nom: "Meftal 500 Tablet",
    },
    {
      nom: "Methycobal Tablet",
    },
    {
      nom: "Moxclav 625 Tablet",
    },
    {
      nom: "Mega-CV 625 Tablet",
    },
    {
      nom: "Monocef-O CV 200/125 Tablet",
    },
    {
      nom: "Mahaflox-LP Eye Drop",
    },
    {
      nom: "Mucolite Syrup",
    },
    {
      nom: "Myospas Tablet",
    },
    {
      nom: "Mox CV 625 Tablet",
    },
    {
      nom: "Meftagesic-DS Suspension",
    },
    {
      nom: "Moxiford Eye Drop",
    },
    {
      nom: "Myoril 4mg Capsule",
    },
    {
      nom: "Maxtra Oral Drops",
    },
    {
      nom: "Mox 500mg Capsule",
    },
    {
      nom: "Minipress XL 5mg Tablet",
    },
    {
      nom: "Mucopain Gel",
    },
    {
      nom: "Mondeslor Tablet",
    },
    {
      nom: "Megalis 10 Tablet",
    },
    {
      nom: "Mahacef 200 Tablet",
    },
    {
      nom: "Monocef-SB 1g Injection",
    },
    {
      nom: "Megapen Capsule",
    },
    {
      nom: "Macbery Syrup Strawberry Sugar Free",
    },
    {
      nom: "Methergin Tablet",
    },
    {
      nom: "Martifur MR 100mg Tablet",
    },
    {
      nom: "Melamet Cream",
    },
    {
      nom: "Meloset Tablet",
    },
    {
      nom: "Mintop Forte 5% Minoxidil Solution",
    },
    {
      nom: "Martifur Tablet",
    },
    {
      nom: "Metrogyl Suspension",
    },
    {
      nom: "Met XL 50 Tablet",
    },
    {
      nom: "ME 12 OD Tablet ER",
    },
    {
      nom: "M.V.I. Injection",
    },
    {
      nom: "Monticope Suspension",
    },
    {
      nom: "Metosartan 50 Tablet ER",
    },
    {
      nom: "Mucolite Drops",
    },
    {
      nom: "Melacare Cream",
    },
    {
      nom: "Movexx SP Tablet",
    },
    {
      nom: "Microdox-LBX Capsule",
    },
    {
      nom: "Moxigram Eye Drop",
    },
    {
      nom: "Montair 10 Tablet",
    },
    {
      nom: "Momate-F Cream",
    },
    {
      nom: "Montek BL Tablet",
    },
    {
      nom: "Metrogyl-P 2% Ointment",
    },
    {
      nom: "Monocef-O 50 Oral Suspension",
    },
    {
      nom: "Myotop-P Tablet",
    },
    {
      nom: "Metrogyl DG Forte Gel",
    },
    {
      nom: "Modula Tablet",
    },
    {
      nom: "Moxikind-CV Dry Syrup",
    },
    {
      nom: "Medrol 8mg Tablet",
    },
    {
      nom: "Moisol Eye Drop",
    },
    {
      nom: "Medisalic Ointment",
    },
    {
      nom: "Mefkind-DS Suspension",
    },
    {
      nom: "Maxtra P  Syrup",
    },
    {
      nom: "Mikacin 500mg Injection",
    },
    {
      nom: "Macpod 200 Tablet",
    },
    {
      nom: "Moxigram LX Eye Drop",
    },
    {
      nom: "Montemac-L Tablet",
    },
    {
      nom: "Mirago 25 Tablet ER",
    },
    {
      nom: "Montina-L Syrup",
    },
    {
      nom: "Meftal-P Dispersible Tablet",
    },
    {
      nom: "Metaspray Nasal Spray",
    },
    {
      nom: "Metosartan 25 Tablet ER",
    },
    {
      nom: "Mahaflox KT Eye Drop",
    },
    {
      nom: "Metrogyl ER Tablet",
    },
    {
      nom: "Moximax-KT Eye Drop",
    },
    {
      nom: "Moxiblu-D Eye Drop",
    },
    {
      nom: "Mucolite Tablet",
    },
    {
      nom: "Mirago 50 Tablet ER",
    },
    {
      nom: "Macbery Junior  Expectorant",
    },
    {
      nom: "Migranil EC 1mg/100mg Tablet",
    },
    {
      nom: "Monocef-O 100 Powder for Oral Suspension",
    },
    {
      nom: "Mahagaba-M 75 Capsule",
    },
    {
      nom: "Montecip LC Tablet",
    },
    {
      nom: "Metrogyl Injection",
    },
    {
      nom: "Macbery-XT Expectorant Sugar Free",
    },
    {
      nom: "Mesacol OD Tablet PR",
    },
    {
      nom: "Myotop 150 Tablet",
    },
    {
      nom: "Montek AB Tablet SR",
    },
    {
      nom: "Mac-RD Capsule SR",
    },
    {
      nom: "Mom Plus Suspension Sugar Free",
    },
    {
      nom: "Monticope-A Tablet SR",
    },
    {
      nom: "Montair LC Kid Tablet DT",
    },
    {
      nom: "Metolar XR 25 Capsule",
    },
    {
      nom: "Montek LC Kid Syrup",
    },
    {
      nom: "Migrabeta Plus Tablet",
    },
    {
      nom: "Meftagesic-P Suspension",
    },
    {
      nom: "Meganeuron PG Capsule",
    },
    {
      nom: "Maxmala  50 Capsule",
    },
    {
      nom: "Moxikind-CV 375 Tablet",
    },
    {
      nom: "Moxovas 0.3 Tablet",
    },
    {
      nom: "Met-Pco Care Tablet",
    },
    {
      nom: "Metrogyl 200 Tablet",
    },
    {
      nom: "Myoril 8mg Capsule",
    },
    {
      nom: "Mucinac AB Tablet",
    },
    {
      nom: "Mecofol 10 Tablet For Vitamin B12 Deficiency",
    },
    {
      nom: "Monit GTN 2.6 Tablet CR",
    },
    {
      nom: "Meganeuron NT 75 Tablet",
    },
    {
      nom: "Mintop Forte 5% Minoxidil Solution",
    },
    {
      nom: "Mixtard 30 HM 100IU/ml Penfill",
    },
    {
      nom: "Minipress XL 2.5mg Tablet",
    },
    {
      nom: "Migranex 10 Tablet",
    },
    {
      nom: "Metolar XR 50 Capsule",
    },
    {
      nom: "Meftagesic Tablet",
    },
    {
      nom: "Malirid-DS Tablet",
    },
    {
      nom: "Metsmall 500 Tablet SR",
    },
    {
      nom: "Meganeuron NT 50 Tablet",
    },
    {
      nom: "Meromac 1gm Injection",
    },
    {
      nom: "Macbery DX Syrup Sugar Free",
    },
    {
      nom: "Melalite 15 Cream",
    },
    {
      nom: "Metrogyl Gel",
    },
    {
      nom: "Maxgalin 50 Capsule",
    },
    {
      nom: "Montemac-FX Tablet",
    },
    {
      nom: "Moxiforce-CV 625 Tablet",
    },
    {
      nom: "Metopar Tablet",
    },
    {
      nom: "Mebiz SR Capsule",
    },
    {
      nom: "Mahacef-CV 200 Tablet",
    },
    {
      nom: "Montaz 1g Injection",
    },
    {
      nom: "MY Pill Tablet",
    },
    {
      nom: "Mefkind Forte Tablet",
    },
    {
      nom: "Megazolid 600 Tablet",
    },
    {
      nom: "Metadec 50 Injection",
    },
    {
      nom: "Montek LC Kid Tablet",
    },
    {
      nom: "Moxiblu Eye Drop",
    },
    {
      nom: "Macpod CV 200 Tablet",
    },
    {
      nom: "Moxikind-CV Kid Tablet",
    },
    {
      nom: "Melano-TX Cream",
    },
    {
      nom: "Mucomix Injection",
    },
    {
      nom: "Motogram Eye Drop",
    },
    {
      nom: "Micogel Cream",
    },
    {
      nom: "Metpure -XL 25 Tablet",
    },
    {
      nom: "Maintane 500 Injection",
    },
    {
      nom: "Melalite Forte Cream",
    },
    {
      nom: "Mucomix Tablet",
    },
    {
      nom: "Metocard XL 25 Tablet",
    },
    {
      nom: "Mesacol Tablet DR",
    },
    {
      nom: "Medrol 16mg Tablet",
    },
    {
      nom: "Megabrom Eye Drop",
    },
    {
      nom: "Melabest Cream",
    },
    {
      nom: "Macbery LS Expectorant",
    },
    {
      nom: "Mobiswift-D Tablet",
    },
    {
      nom: "Mox 250mg Capsule",
    },
    {
      nom: "Montewok-LC Tablet",
    },
    {
      nom: "Moxiflox Tablet",
    },
    {
      nom: "Myoril Injection",
    },
    {
      nom: "Myosone Plus Tablet",
    },
    {
      nom: "Myatro 0.01% Eye Drop",
    },
    {
      nom: "Mefkind Forte Suspension",
    },
    {
      nom: "Melanocyl Tablet",
    },
    {
      nom: "Myospas D Tablet",
    },
    {
      nom: "Metolar 25 Tablet",
    },
    {
      nom: "Mazetol 200 Tablet",
    },
    {
      nom: "Maxgalin NT Tablet",
    },
    {
      nom: "Maxmala  Capsule",
    },
    {
      nom: "Momeflo Nasal Spray",
    },
    {
      nom: "Maxtra P  Oral Drops",
    },
    {
      nom: "Moxclav BD 228.5mg Powder for Oral Suspension",
    },
    {
      nom: "Milflodex BKC Free Eye Drop",
    },
    {
      nom: "Montek 10 Tablet",
    },
    {
      nom: "Maxgalin ER 75 Tablet",
    },
    {
      nom: "Maintane Tablet",
    },
    {
      nom: "Minicycline Capsule",
    },
    {
      nom: "Melmet 500 SR Tablet",
    },
    {
      nom: "Myonit SR 2.6 Tablet",
    },
    {
      nom: "Mupi Ointment",
    },
    {
      nom: "Macsart 40 Tablet",
    },
    {
      nom: "Moxif 400 Tablet",
    },
    {
      nom: "Megasty 160mg Tablet",
    },
    {
      nom: "Minirin 0.1mg Tablet",
    },
    {
      nom: "Methergin Injection",
    },
    {
      nom: "Mahaflox 400 Tablet",
    },
    {
      nom: "Maxvoid 8 Tablet",
    },
    {
      nom: "Mirbeg 25 Tablet ER",
    },
    {
      nom: "Movexx MR Tablet",
    },
    {
      nom: "Moxikind-CV Forte Dry Syrup",
    },
    {
      nom: "Mero 1g Injection",
    },
    {
      nom: "Meftal 250mg Tablet DT",
    },
    {
      nom: "Metocard XL 50 Tablet",
    },
    {
      nom: "Meftal-Spas DS Tablet",
    },
    {
      nom: "Moxoft-LP Eye Drop",
    },
    {
      nom: "Monocef-O 100 Tablet",
    },
    {
      nom: "Metatop Nasal Spray",
    },
    {
      nom: "Milixim 200 Tablet",
    },
    {
      nom: "Migrabeta-TR 40 Tablet",
    },
    {
      nom: "Mupimet Ointment",
    },
    {
      nom: "Meronem 1000mg Injection",
    },
    {
      nom: "Myotop 450 SR Tablet",
    },
    {
      nom: "Menabol Tablet",
    },
    {
      nom: "Minokem-N 5% Solution",
    },
    {
      nom: "Mahagaba-M OD Tablet SR",
    },
    {
      nom: "Macprox DP 500 Tablet",
    },
    {
      nom: "Maxiflo 250 Inhaler",
    },
    {
      nom: "Microcef-CV 200 Tablet",
    },
    {
      nom: "Menactra Vaccine",
    },
    {
      nom: "Microcef 200mg Tablet DT",
    },
    {
      nom: "Minoz 100 Tablet",
    },
    {
      nom: "Mahaflox Eye Ointment",
    },
    {
      nom: "Maxgalip AT Tablet",
    },
    {
      nom: "Myosone SR Tablet",
    },
    {
      nom: "Meaxon Plus Injection",
    },
    {
      nom: "Myticom Eye Drop",
    },
    {
      nom: "MX 5 Topical Solution",
    },
    {
      nom: "Metacortil-Lite Cream",
    },
    {
      nom: "Monocef-O CV 50/31.25 Dry Syrup",
    },
    {
      nom: "Meconerv Tablet",
    },
    {
      nom: "Minichek 5% Solution",
    },
    {
      nom: "Momate Cream",
    },
    {
      nom: "Misty Eye Drop",
    },
    {
      nom: "Mahaflox 0.5% Eye Drop",
    },
    {
      nom: "Monocef 500mg Injection",
    },
    {
      nom: "Macpee Tablet",
    },
    {
      nom: "Monti-FX 10mg/120mg Tablet",
    },
    {
      nom: "Megaclox Capsule",
    },
    {
      nom: "Momate Lotion",
    },
    {
      nom: "Montina-L DT Tablet",
    },
    {
      nom: "Movexx Plus Tablet",
    },
    {
      nom: "Minolast LC 5mg/10mg Tablet",
    },
    {
      nom: "Montral Tablet",
    },
    {
      nom: "Mega-CV 228.5mg Dry Syrup",
    },
    {
      nom: "Moxovas 0.2 Tablet",
    },
    {
      nom: "Maxmala Forte  Capsule",
    },
    {
      nom: "Mirbeg 50 Tablet ER",
    },
    {
      nom: "Mucolite SR Capsule",
    },
    {
      nom: "Monotrate 10 Tablet",
    },
    {
      nom: "Metoz 5 Tablet",
    },
    {
      nom: "Morr 5% Solution",
    },
    {
      nom: "Minoz OD 100 Capsule MR",
    },
    {
      nom: "Moxicip Tablet",
    },
    {
      nom: "Milflox Plus 0.4 Sterlie Eye Drops",
    },
    {
      nom: "Metpure -XL 50 Tablet",
    },
    {
      nom: "Minolast FX 10mg/120mg Tablet",
    },
    {
      nom: "Metrogyl-M Ointment",
    },
    {
      nom: "Myocyst-M Tablet SR",
    },
    {
      nom: "Megaheal Spray",
    },
    {
      nom: "Meva SR Capsule",
    },
    {
      nom: "Monticope -Kid Tablet",
    },
    {
      nom: "Mlobe-LP Eye Drop",
    },
    {
      nom: "Macprox DP 250 Tablet",
    },
    {
      nom: "Myelostat 500mg Capsule",
    },
    {
      nom: "Melapik  -HQ Cream",
    },
    {
      nom: "Melanocyl Ointment",
    },
    {
      nom: "Monit 30 SR Tablet",
    },
    {
      nom: "Metoz 2.5 Tablet",
    },
    {
      nom: "Maxgalin M 75 Capsule",
    },
    {
      nom: "Motinorm Drops",
    },
    {
      nom: "Mamofen 20 Tablet",
    },
    {
      nom: "Montemac-L Syrup",
    },
    {
      nom: "Moza 5 Tablet",
    },
    {
      nom: "Migrabeta-TR 20 Tablet SR",
    },
    {
      nom: "Mefkind-Spas Tablet",
    },
    {
      nom: "Macbery Oral Drops",
    },
    {
      nom: "Muout Oral Solution",
    },
    {
      nom: "Mycoderm-NM Cream",
    },
    {
      nom: "Macbery PD Expectorant Strawberry",
    },
    {
      nom: "Moxikind-CV Drops",
    },
    {
      nom: "Megesta 160 Tablet",
    },
    {
      nom: "Memopi HC Cream",
    },
    {
      nom: "Methimez 10 Tablet",
    },
    {
      nom: "Monotrate 20 Tablet",
    },
    {
      nom: "Melalite XL Cream",
    },
    {
      nom: "Macsart AM Tablet",
    },
    {
      nom: "Moxigram KT Eye Drop",
    },
    {
      nom: "Melanocyl Solution",
    },
    {
      nom: "Maxtra Gargle",
    },
    {
      nom: "MDD XR 50 Tablet",
    },
    {
      nom: "Mexohar 150mg Capsule",
    },
    {
      nom: "Mucolite LS Syrup",
    },
    {
      nom: "Monlevo Tablet",
    },
    {
      nom: "Melgain Lotion",
    },
    {
      nom: "Miofree A 4mg Tablet",
    },
    {
      nom: "Mega FreeFlex Joint Health Tablet",
    },
    {
      nom: "Megacholin Plus Tablet",
    },
    {
      nom: "Mintop Eva Solution",
    },
    {
      nom: "Mfsone Cream",
    },
    {
      nom: "Maxgalin M ER 75 Tablet",
    },
    {
      nom: "Megapen Kid Tablet",
    },
    {
      nom: "Maxtra Tablet",
    },
    {
      nom: "Momesone Cream",
    },
    {
      nom: "Montemac AL Tablet",
    },
    {
      nom: "Maxtra Cold Plus Tablet",
    },
    {
      nom: "Meftal-Spas Drops",
    },
    {
      nom: "Minado 500 Tablet",
    },
    {
      nom: "Mirago S 25 Combikit",
    },
    {
      nom: "Meftal-Spas Suspension",
    },
    {
      nom: "Maxiliv Injection",
    },
    {
      nom: "Momate-XL Cream",
    },
    {
      nom: "Mucobenz Mouth Wash",
    },
    {
      nom: "Mucaine Gel Mint Sugar Free",
    },
    {
      nom: "Metolar 50 Tablet",
    },
    {
      nom: "Migon Plus Tablet",
    },
    {
      nom: "Metasone Cream",
    },
    {
      nom: "Montair 4mg Chewable Tablet",
    },
    {
      nom: "Motivyst Tablet",
    },
    {
      nom: "Macpred 4 Tablet",
    },
    {
      nom: "Macpod 50 Oral Suspension",
    },
    {
      nom: "Mildfil Tablet",
    },
    {
      nom: "Moxiblu LX Eye Drop",
    },
    {
      nom: "Myosone Tablet",
    },
    {
      nom: "Mahacort DZ 6 Tablet",
    },
    {
      nom: "Myotop-DSR Tablet",
    },
    {
      nom: "Monocef-O CV Dry Syrup",
    },
    {
      nom: "Mpx-CV 625 Tablet",
    },
    {
      nom: "Met XL AM 50/5 Tablet",
    },
    {
      nom: "Metapro -XL 25 Tablet",
    },
    {
      nom: "Miontizee-L Tablet",
    },
    {
      nom: "Monocef 2gm Injection",
    },
    {
      nom: "Mega-CV Forte 457mg Dry Syrup",
    },
    {
      nom: "Myfortic 360mg Tablet",
    },
    {
      nom: "Mycoderm-C Dusting Powder",
    },
    {
      nom: "Mext 7.5 F Combipack",
    },
    {
      nom: "Moxisurge-L Opthalmic Suspension",
    },
    {
      nom: "Metmin 500mg Tablet",
    },
    {
      nom: "MMF -S Tablet",
    },
    {
      nom: "Met-Innovfol Tablet",
    },
    {
      nom: "Monadine Tablet",
    },
    {
      nom: "Momate S Ointment",
    },
    {
      nom: "Morease Tablet",
    },
    {
      nom: "Mesacol Suppository",
    },
    {
      nom: "Metapro-XL 50 Tablet",
    },
    {
      nom: "Myoset Capsule SR",
    },
    {
      nom: "Mycept 500 Tablet",
    },
    {
      nom: "Minoz ER 65 Tablet",
    },
    {
      nom: "Metolar XR 12.5 Capsule",
    },
    {
      nom: "Megahenz 40 Tablet",
    },
    {
      nom: "MP 4mg Tablet",
    },
    {
      nom: "Melbild Solution",
    },
    {
      nom: "Microcid Capsule",
    },
    {
      nom: "Minoz-BPO Gel",
    },
    {
      nom: "M-Sys Ointment",
    },
    {
      nom: "Misopt Eye Drop",
    },
    {
      nom: "Match 150mg Injection",
    },
    {
      nom: "M-Solvin Syrup Lime",
    },
    {
      nom: "Macpred 8 Tablet",
    },
    {
      nom: "Magadol Oral Suspension",
    },
    {
      nom: "Mirabig 25mg Tablet ER",
    },
    {
      nom: "Macralfate-O Suspension Sugar Free",
    },
    {
      nom: "Mefkind-P Suspension",
    },
    {
      nom: "Mirago S 50 Combikit",
    },
    {
      nom: "Mext 7.5 Tablet",
    },
    {
      nom: "Meftal-Spas Injection",
    },
    {
      nom: "Maxtra P  DS Syrup",
    },
    {
      nom: "M-Solvin Tablet",
    },
    {
      nom: "Mega-CV Drops",
    },
    {
      nom: "Minoz 50 Tablet",
    },
    {
      nom: "MX 2 Solution",
    },
    {
      nom: "Mariliv Oral Suspension",
    },
    {
      nom: "Moxclav DS Powder for Oral Suspension",
    },
    {
      nom: "Mefast 100 Suspension",
    },
    {
      nom: "Mo-Floren 5ml Eye Drop",
    },
    {
      nom: "Morr Max 5% Serum",
    },
    {
      nom: "Montaz 500mg Injection",
    },
    {
      nom: "Moxclav DS 457mg Tablet",
    },
    {
      nom: "Metagard CR 60 Tablet",
    },
    {
      nom: "Morease- SR Capsule",
    },
    {
      nom: "Mucaine Gel Orange",
    },
    {
      nom: "Mazetol 100 Tablet",
    },
    {
      nom: "Mox Kid 250mg Tablet",
    },
    {
      nom: "Metrogyl Compound Plus  Tablet",
    },
    {
      nom: "Moisol-Z Eye Drops",
    },
    {
      nom: "Mucotab Tablet",
    },
    {
      nom: "Mesahenz 1200 Tablet PR",
    },
    {
      nom: "Maxgalin M 50 Capsule",
    },
    {
      nom: "Matiz SR Capsule",
    },
    {
      nom: "Mlobe Eye Drop",
    },
    {
      nom: "Maxiflo 250 Rotacaps",
    },
    {
      nom: "Mesacol CR 1gm Granules",
    },
    {
      nom: "Myhep All Tablet",
    },
    {
      nom: "Megatin DC Capsule",
    },
    {
      nom: "Mycofit 500 Tablet",
    },
    {
      nom: "Minirin 0.2mg Tablet",
    },
    {
      nom: "Mactor F Tablet",
    },
    {
      nom: "Mahacef-Plus 100 Tablet",
    },
    {
      nom: "Megatas 50 Tablet ER",
    },
    {
      nom: "Metadec 25 Injection",
    },
    {
      nom: "Mesacol 800 Tablet DR",
    },
    {
      nom: "Moxinow Tablet SR",
    },
    {
      nom: "Mobicam 20mg Tablet DT",
    },
    {
      nom: "Metzok 25 Tablet PR",
    },
    {
      nom: "Milflox DF Eye Drop",
    },
    {
      nom: "Migon Tablet",
    },
    {
      nom: "Mahacef Dry Syrup",
    },
    {
      nom: "Metasone F  Cream",
    },
    {
      nom: "Mupivate Ointment",
    },
    {
      nom: "Met XL 12.5 Tablet",
    },
    {
      nom: "Macfast 650 Tablet",
    },
    {
      nom: "Montair Plus Tablet",
    },
    {
      nom: "Mfsudif Cream",
    },
    {
      nom: "Moxigram Eye Ointment",
    },
    {
      nom: "Mikacin 100mg Injection",
    },
    {
      nom: "Mahacef OZ New Tablet",
    },
    {
      nom: "Moxclav 375 Tablet",
    },
    {
      nom: "Mendate 10 Tablet CR",
    },
    {
      nom: "ME-Pxl Tablet",
    },
    {
      nom: "M-Cin Tablet",
    },
    {
      nom: "Megamentin 625 Tablet",
    },
    {
      nom: "Moxisurge-D Eye Drop",
    },
    {
      nom: "Mirabet 25 Tablet ER",
    },
    {
      nom: "Motilium M Tablet",
    },
    {
      nom: "Macfast 500 Tablet",
    },
    {
      nom: "Moza MPS Chewable Tablet",
    },
    {
      nom: "Minirin Nasal Spray",
    },
    {
      nom: "Melapik  Ever New Cream",
    },
    {
      nom: "Mosi Eye Ointment",
    },
    {
      nom: "Mahacef-XL 200 New Tablet",
    },
    {
      nom: "Mycofit-S 360 Tablet",
    },
    {
      nom: "Mox CV 375 Tablet",
    },
    {
      nom: "Moximac Tablet",
    },
    {
      nom: "Microcid-SR Capsule",
    },
    {
      nom: "Melnor Cream",
    },
    {
      nom: "Miofree 4 Capsule",
    },
    {
      nom: "Momoz Cream",
    },
    {
      nom: "Moxiblu-LP Eye Drop",
    },
    {
      nom: "Monticope Suspension",
    },
    {
      nom: "Melano-TX OD Tablet SR",
    },
    {
      nom: "Mega-CV 375 Tablet",
    },
    {
      nom: "Myo Pyrolate Injection",
    },
    {
      nom: "MMS Cream",
    },
    {
      nom: "Mactor ASP 75 Capsule",
    },
    {
      nom: "Moss Plus Eye Drop",
    },
    {
      nom: "Mycept-S 360 Tablet",
    },
    {
      nom: "Metpure -XL 12.5 Tablet",
    },
    {
      nom: "Montaz 250mg Injection",
    },
    {
      nom: "Marzon Tablet",
    },
    {
      nom: "Meronem 500mg Injection",
    },
    {
      nom: "Mixtard 50 HM 100IU/ml Penfill",
    },
    {
      nom: "Mucoend 600mg Tablet Orange Sugar Free",
    },
    {
      nom: "Macsart CH 40 Tablet",
    },
    {
      nom: "Macsart CC  Tablet",
    },
    {
      nom: "Macpod 100-DT Tablet",
    },
    {
      nom: "Moiz XL Cream",
    },
    {
      nom: "Mirabig 50mg Tablet ER",
    },
    {
      nom: "Megahenz 160mg Tablet",
    },
    {
      nom: "Mahacef 100mg Tablet",
    },
    {
      nom: "Micronac PF Eye Drop",
    },
    {
      nom: "Metsmall 1000 Tablet SR",
    },
    {
      nom: "Macgest SR 200 Tablet",
    },
    {
      nom: "Metgem 500 Tablet ER",
    },
    {
      nom: "Mucotab ET Tablet Orange Sugar Free",
    },
    {
      nom: "Mox Drops Redimix",
    },
    {
      nom: "Metzok 50 Tablet PR",
    },
    {
      nom: "Magadol 50mg/325mg Tablet",
    },
    {
      nom: "Minopep 5% Solution",
    },
    {
      nom: "Methimez 5 Tablet",
    },
    {
      nom: "Minirin Melt 60mcg Tablet MD",
    },
    {
      nom: "Mintop Yuva Solution",
    },
    {
      nom: "Mupimet Ointment",
    },
    {
      nom: "Mucinac 20% Injection",
    },
    {
      nom: "Myospas TH 4 Capsule",
    },
    {
      nom: "Macgest SR 300 Tablet",
    },
    {
      nom: "Merocrit 1gm Injection",
    },
    {
      nom: "Montair 5mg Chewable Tablet Strawberry",
    },
    {
      nom: "Macsart H Tablet",
    },
    {
      nom: "Morr 2% Solution",
    },
    {
      nom: "Moxam 400 Tablet",
    },
    {
      nom: "Meb SR Capsule",
    },
    {
      nom: "Melalite 15 Cream",
    },
    {
      nom: "Montegress-XL Tablet SR",
    },
    {
      nom: "Mucinac 200 Effervescent Tablet Sugar Free",
    },
    {
      nom: "Mupisoft Ointment",
    },
    {
      nom: "Malidens 650 Tablet",
    },
    {
      nom: "Motinorm DT 10mg Tablet",
    },
    {
      nom: "Maintane 250 Injection",
    },
    {
      nom: "Mactor 10 Tablet",
    },
    {
      nom: "Macgest 200 Capsule",
    },
    {
      nom: "Mofloren KT Eye Drop",
    },
    {
      nom: "Mahacef Drop",
    },
    {
      nom: "Monotrate SR 30 Tablet",
    },
    {
      nom: "Magneon 50% Injection",
    },
    {
      nom: "Melapik Plus Cream",
    },
    {
      nom: "Matilda PG  ER Tablet",
    },
    {
      nom: "Meganano Gel",
    },
    {
      nom: "Maxgalin 150 Capsule",
    },
    {
      nom: "Megavog 0.3 Tablet MD",
    },
    {
      nom: "Morr 10% Solution",
    },
    {
      nom: "Minilactone Tablet",
    },
    {
      nom: "Moxiforce-CV 375 Tablet",
    },
    {
      nom: "Mirakem 50mg Tablet",
    },
    {
      nom: "Microgest 200mg Softgel Capsule",
    },
    {
      nom: "Mibeta SR 40 Tablet",
    },
    {
      nom: "Macitent 10mg Tablet",
    },
    {
      nom: "Mixtard 30 Suspension for Injection 100IU/ml",
    },
    {
      nom: "Mikacin 250mg Injection",
    },
    {
      nom: "Moxikind-CV 1gm Tablet",
    },
    {
      nom: "Met XL R 25mg/2.5mg Tablet",
    },
    {
      nom: "Moxifax Eye Drop",
    },
    {
      nom: "Mosi-DX Eye Drop",
    },
    {
      nom: "Macpred 16 Tablet",
    },
    {
      nom: "Myface Gel",
    },
    {
      nom: "Metocard XL 12.5 Tablet",
    },
    {
      nom: "Mycolon SR Capsule",
    },
    {
      nom: "Macsart Beta 50 Tablet ER",
    },
    {
      nom: "Medrogest 10mg Tablet",
    },
    {
      nom: "Moxikem 500mg Capsule",
    },
    {
      nom: "Metasone Plus Cream",
    },
    {
      nom: "Micogel F Ointment",
    },
    {
      nom: "MX 10 Topical Solution",
    },
    {
      nom: "Megatas 25 Tablet ER",
    },
    {
      nom: "Megazolid 100 Dry Syrup",
    },
    {
      nom: "Mirena Intrauterine Delivery System",
    },
    {
      nom: "Macralfate Suspension Sugar Free",
    },
    {
      nom: "Metolar 1mg Injection",
    },
    {
      nom: "Myestin 60mg Tablet",
    },
    {
      nom: "Microvir 500 Tablet",
    },
    {
      nom: "Moxiforce-CV Dry Syrup",
    },
    {
      nom: "Medomol 500mg Tablet",
    },
    {
      nom: "Metocard AM  Tablet PR",
    },
    {
      nom: "Melboost 5mg Solution",
    },
    {
      nom: "Melgain Lotion",
    },
    {
      nom: "ME-PR Capsule",
    },
    {
      nom: "Maxigla Soft Gelatin Capsule",
    },
    {
      nom: "Montas-L",
    },
    {
      nom: "Megaburn Capsule",
    },
    {
      nom: "Mymi Plus Capsule",
    },
    {
      nom: "Mesacol Enema",
    },
    {
      nom: "MTnL Tablet",
    },
    {
      nom: "Metpure-AM 5  Tablet MR",
    },
    {
      nom: "Melgain Lotion",
    },
    {
      nom: "Macphylline Capsule",
    },
    {
      nom: "Metolar AM  50 Tablet",
    },
    {
      nom: "Mylamin Plus Injection",
    },
    {
      nom: "Monocef 250mg Injection",
    },
    {
      nom: "Mifenti Vaginal Capsule",
    },
    {
      nom: "Mucyst Injection",
    },
    {
      nom: "Mecoblend-PSR Tablet",
    },
    {
      nom: "Melmet 1000 SR Tablet",
    },
    {
      nom: "Macflox Tablet",
    },
    {
      nom: "Montemac-FX Suspension",
    },
    {
      nom: "Mecobion-NP Tablet SR",
    },
    {
      nom: "Maxogest Tablet",
    },
    {
      nom: "Martifur MR 50mg Tablet",
    },
    {
      nom: "Magnatuss A Syrup",
    },
    {
      nom: "Mprol 25mg Tablet",
    },
    {
      nom: "Montemac A Tablet",
    },
    {
      nom: "Momoz F Ointment",
    },
    {
      nom: "Moxon 0.3 Tablet",
    },
    {
      nom: "Megagliptin Tablet",
    },
    {
      nom: "Mero 500mg Injection",
    },
    {
      nom: "Mirumigest Tablet",
    },
    {
      nom: "MO 4 Eye Drop",
    },
    {
      nom: "Myotan 40 Tablet",
    },
    {
      nom: "Metpure-Tel 40 Tablet MR",
    },
    {
      nom: "Melanorm Cream",
    },
    {
      nom: "Monit GTN 6.4 Tablet CR",
    },
    {
      nom: "Myospaz D Tablet",
    },
    {
      nom: "Misty Fresh Eye Drop",
    },
    {
      nom: "Moxifax P Eye Drop",
    },
    {
      nom: "Minoz ER 45 Tablet",
    },
    {
      nom: "Migranex 5 Tablet",
    },
    {
      nom: "Mariliv Drop",
    },
    {
      nom: "Megapen 500mg Injection",
    },
    {
      nom: "Myelogen PG 75 Tablet SR",
    },
    {
      nom: "Macsart Beta 25 Tablet ER",
    },
    {
      nom: "Mibeta SR 40 Tablet",
    },
    {
      nom: "Malirid 7.5mg Tablet",
    },
    {
      nom: "Montemac 10 Tablet",
    },
    {
      nom: "MFC-LT Eye Drop",
    },
    {
      nom: "Megagliptin MF Tablet PR",
    },
    {
      nom: "Muciday Tablet SR",
    },
    {
      nom: "Mabura 40mg Injection",
    },
    {
      nom: "Myoset-D 150mg/100mg Capsule SR",
    },
    {
      nom: "Macfast 250 Oral Suspension",
    },
    {
      nom: "Mupimesh Ointment",
    },
    {
      nom: "Mazetol 400 Tablet",
    },
    {
      nom: "Meftagesic P  50mg/125mg Tablet DT",
    },
    {
      nom: "Minoxy 5% Solution",
    },
    {
      nom: "Modlip-Asg 20 Capsule",
    },
    {
      nom: "Mofecon 500 Tablet",
    },
    {
      nom: "Malidens 500 Tablet",
    },
    {
      nom: "Mext 10 Tablet",
    },
    {
      nom: "Morease-I Granules",
    },
    {
      nom: "Mesalo Foam",
    },
    {
      nom: "Mofilet 500 Tablet",
    },
    {
      nom: "Metpure-AM 2.5 Tablet",
    },
    {
      nom: "Macsart 20 Tablet",
    },
    {
      nom: "Metride 2 Tablet PR",
    },
    {
      nom: "Montemac-L Kid  Tablet DT",
    },
    {
      nom: "Megacid Syrup",
    },
    {
      nom: "Metolar TL 25 Tablet",
    },
    {
      nom: "Metocard XL 75 Tablet",
    },
    {
      nom: "Metride 1 Tablet PR",
    },
    {
      nom: "Menopur Injection",
    },
    {
      nom: "Moxocard 0.3 Tablet",
    },
    {
      nom: "Maxiflo 125 Inhaler",
    },
    {
      nom: "Monoguard Cream",
    },
    {
      nom: "Macsart CL 10mg/40mg Tablet",
    },
    {
      nom: "Mext 15 Tablet",
    },
    {
      nom: "Muscoflex Tablet",
    },
    {
      nom: "Metadoze-IPR 850  Tablet SR",
    },
    {
      nom: "MDD XR 25 Tablet",
    },
    {
      nom: "Metabol 25 Injection",
    },
    {
      nom: "Momoz T Cream",
    },
    {
      nom: "Modlip 10 Tablet",
    },
    {
      nom: "Misty Soft Eye Drop",
    },
    {
      nom: "Monotax 1000mg Injection",
    },
    {
      nom: "Minolox 100 Tablet",
    },
    {
      nom: "Milixim-M 400mg/400mg Tablet SR",
    },
    {
      nom: "Magnova 1000 mg/125 mg Injection",
    },
    {
      nom: "Monet LC 5mg/10mg Tablet",
    },
    {
      nom: "Miofree 8mg Capsule",
    },
    {
      nom: "Montegress FX 10mg/120mg Tablet",
    },
    {
      nom: "Mac Rabonik Plus Capsule SR",
    },
    {
      nom: "Migarid 10 Tablet",
    },
    {
      nom: "Miofree A 8mg Tablet",
    },
    {
      nom: "Minesse Tablet",
    },
    {
      nom: "Myotry Pediatric Eye Drop",
    },
    {
      nom: "Minym ER 65 Tablet",
    },
    {
      nom: "Metopole 25 XL Tablet",
    },
    {
      nom: "Moxivail Eye Drop",
    },
    {
      nom: "Mixbiotic-AC Ear Drop",
    },
    {
      nom: "Mirbeg-S 25 Combo Pack",
    },
    {
      nom: "Misty Gel",
    },
    {
      nom: "Maclar 500 Tablet",
    },
    {
      nom: "Miprogen 400 Soft Gelatin Capsule",
    },
    {
      nom: "Metoder 50mg Tablet XL",
    },
    {
      nom: "Motimesh Cream",
    },
    {
      nom: "Metadoze-IPR 500 Tablet SR",
    },
    {
      nom: "Momtas Cream",
    },
    {
      nom: "Mesalo OD Tablet",
    },
    {
      nom: "Migiplex 40mg/10mg Tablet",
    },
    {
      nom: "MO 4 KT Eye Drops",
    },
    {
      nom: "Minolox 50 Tablet",
    },
    {
      nom: "Mibeta-Plus 10 Tablet SR",
    },
    {
      nom: "Monzap-LC Tablet",
    },
    {
      nom: "Mucaryl Tablet Orange Sugar Free",
    },
    {
      nom: "Maxoza Powder",
    },
    {
      nom: "Minado Tablet",
    },
    {
      nom: "Monit 10 Tablet",
    },
    {
      nom: "Mycoclear 100 Capsule",
    },
    {
      nom: "Mprol AM 5mg/50mg Tablet",
    },
    {
      nom: "Metmin-A Tablet",
    },
    {
      nom: "Mupi-XL Ointment",
    },
    {
      nom: "Mesacol CR 2gm Granules",
    },
    {
      nom: "Moxicip Infusion",
    },
    {
      nom: "Mlobe Eye Ointment",
    },
    {
      nom: "Melanorm-HC Cream",
    },
    {
      nom: "Moxclav 1gm Tablet",
    },
    {
      nom: "Maxbrim Eye Drop",
    },
    {
      nom: "Medkin AD Shampoo",
    },
    {
      nom: "Monoguard Sertaconazole &amp; Zinc Pyrithione Shampoo | Fights Dandruff",
    },
    {
      nom: "Minirin Melt 120mcg Tablet",
    },
    {
      nom: "Minosilk 5 Topical Solution",
    },
    {
      nom: "Mupinase Ointment",
    },
    {
      nom: "Maxgalin ER 100 Tablet",
    },
    {
      nom: "Maxvoid 4mg Tablet",
    },
    {
      nom: "Mega-CV 228.5mg Dry Syrup",
    },
    {
      nom: "Metol XL 50 tablet",
    },
    {
      nom: "Mactor 20 Tablet",
    },
    {
      nom: "Metolar TL 50 Tablet",
    },
    {
      nom: "Marzon Duo Tablet",
    },
    {
      nom: "Mgr 10mg Tablet",
    },
    {
      nom: "Morr 3% Solution",
    },
    {
      nom: "Miprogen 200 Soft Gelatin Capsule",
    },
    {
      nom: "MHG Lotion",
    },
    {
      nom: "Mexate 7.5 Tablet",
    },
    {
      nom: "Melmet 500 Tablet",
    },
    {
      nom: "Methypreg Tablet",
    },
    {
      nom: "Migrof 10 Capsule",
    },
    {
      nom: "Metffil G1 Tablet",
    },
    {
      nom: "Moxtif LP Ophthalmic Suspension",
    },
    {
      nom: "Maclar 250 Tablet",
    },
    {
      nom: "Melbild Solution",
    },
    {
      nom: "Mefomin 500 SR Tablet",
    },
    {
      nom: "Mighty Mox-LP Eye drop",
    },
    {
      nom: "Mepresso D 40mg Injection",
    },
    {
      nom: "Maxstine Tablet",
    },
    {
      nom: "Moza Plus Capsule SR",
    },
    {
      nom: "Montefex Tablet",
    },
    {
      nom: "Metolar AM  25 Tablet",
    },
    {
      nom: "Montu 10mg Tablet",
    },
    {
      nom: "Metomac 50 Tablet ER",
    },
    {
      nom: "Minotas 65mg Tablet ER",
    },
    {
      nom: "Metpure H Tablet",
    },
    {
      nom: "Monotrate OD 25 Tablet PR",
    },
    {
      nom: "Megavog 0.2 Tablet MD",
    },
    {
      nom: "Mefomin GZ  80 Tablet SR",
    },
    {
      nom: "Mycoclin Cream",
    },
    {
      nom: "Microgest 100mg Softgel Capsule",
    },
    {
      nom: "Melbild-XL Solution",
    },
    {
      nom: "Monolosin DFT Tablet",
    },
    {
      nom: "Mefast P Suspension",
    },
    {
      nom: "Moxon 0.2mg Tablet",
    },
    {
      nom: "Mozep 2 Tablet",
    },
    {
      nom: "Meflotas Tablet",
    },
    {
      nom: "Mosart-OD Tablet",
    },
    {
      nom: "Mucaryl LS Syrup",
    },
    {
      nom: "Mesahenz 800 Tablet",
    },
    {
      nom: "Metlong 500 Tablet SR",
    },
    {
      nom: "MY 360 Tablet",
    },
    {
      nom: "Methimercazole 10 Tablet",
    },
    {
      nom: "Mupitret Cream",
    },
    {
      nom: "Mone Cream",
    },
    {
      nom: "Morr 12.5% Solution",
    },
    {
      nom: "Melanorm-MS Cream",
    },
    {
      nom: "Maxgalin ER 150 Tablet",
    },
    {
      nom: "Maxolid Tablet",
    },
    {
      nom: "Microcef-CV 50 Dry Syrup",
    },
    {
      nom: "Materna Hmg 150i.u Injection",
    },
    {
      nom: "Moxcent 0.3 Tablet",
    },
    {
      nom: "Momate Ointment",
    },
    {
      nom: "Metolar XR 100 Capsule",
    },
    {
      nom: "Methonac Tablet",
    },
    {
      nom: "Momesone-T Cream",
    },
    {
      nom: "Mopaday Forte Tablet ER",
    },
    {
      nom: "Mitraa 200mg Capsule",
    },
    {
      nom: "Macpril 5 Tablet",
    },
    {
      nom: "Migrest Solo Tablet",
    },
    {
      nom: "Maxiflo Forte Rotacap",
    },
    {
      nom: "Met Stamlo Capsule ER",
    },
    {
      nom: "Microvir 250 Tablet",
    },
    {
      nom: "Mega-CV Kid  Tablet DT",
    },
    {
      nom: "Mtaz Cream",
    },
    {
      nom: "Merrobe 1000mg Injection",
    },
    {
      nom: "Maxvoid Plus 4mg/0.5mg Tablet",
    },
    {
      nom: "Morr F 5% Solution (60ml) Therapy Compliance Pack",
    },
    {
      nom: "Minonil ER 65 Tablet",
    },
    {
      nom: "Mesacol CR 500mg Tablet",
    },
    {
      nom: "Myospas F Tablet",
    },
    {
      nom: "Moss Fresh Gel Eye Drop",
    },
    {
      nom: "Myotan CT 40/12.5 Tablet",
    },
    {
      nom: "Morr 7.5% Solution",
    },
    {
      nom: "Momesone Cream",
    },
    {
      nom: "Meltor 10 Tablet",
    },
    {
      nom: "Metafort 500 Tablet SR",
    },
    {
      nom: "Montek 5 Chewable Tablet",
    },
    {
      nom: "Macphylline SR 200 Tablet",
    },
    {
      nom: "Milixim 100 DS Dry Syrup",
    },
    {
      nom: "Migarid 5 Tablet",
    },
    {
      nom: "Mendate 15 Tablet CR",
    },
    {
      nom: "Mycomune-S 360 Tablet",
    },
    {
      nom: "Modlip 20 Tablet",
    },
    {
      nom: "Met XL H 50 Tablet",
    },
    {
      nom: "Monovisc 88mg Injection",
    },
    {
      nom: "Metzok 12.5 Tablet PR",
    },
    {
      nom: "Moxigood Tablet",
    },
    {
      nom: "Minokem-N 2% Solution",
    },
    {
      nom: "Minopep Eva Topical Solution",
    },
    {
      nom: "Myonit SR 6.4 Tablet",
    },
    {
      nom: "Miprogen 300mg Tablet SR",
    },
    {
      nom: "Maxformin 750 Tablet PR",
    },
    {
      nom: "Melaroc Tablet",
    },
    {
      nom: "Medace Tablet",
    },
    {
      nom: "Myoprol XL 50 Tablet",
    },
    {
      nom: "Mankind's Ring-Out Dusting Powder",
    },
    {
      nom: "Metafolate Tablet",
    },
    {
      nom: "Mo-Floren Eye Ointment",
    },
    {
      nom: "Mycoclin B Cream",
    },
    {
      nom: "Melanorm-F Cream",
    },
    {
      nom: "Mucomix Injection",
    },
    {
      nom: "Miliclav Tablet",
    },
    {
      nom: "Minoqilib 5% Solution",
    },
    {
      nom: "Minscalp 5% Solution",
    },
    {
      nom: "Moxigram Tablet",
    },
    {
      nom: "Mibeta 20mg Tablet",
    },
    {
      nom: "Montegress LC 5mg/10mg Tablet",
    },
    {
      nom: "MS 240 Capsule DR",
    },
    {
      nom: "Mydrat-J Eye Drop",
    },
    {
      nom: "Montina-L Syrup",
    },
    {
      nom: "MP 8mg Tablet",
    },
    {
      nom: "Metaglez Forte Tablet",
    },
    {
      nom: "MCM Gel Eye Drop",
    },
    {
      nom: "Meganano Gel",
    },
    {
      nom: "Myfortic 180mg Tablet",
    },
    {
      nom: "Metride Plus 2 Tablet SR",
    },
    {
      nom: "Mutop Ointment",
    },
    {
      nom: "Mflotas LP Eye Drop",
    },
    {
      nom: "Maxtra-O Nasal Spray",
    },
    {
      nom: "Maxiflo 100 Rotacap",
    },
    {
      nom: "Monit 60-SR Tablet",
    },
    {
      nom: "Monit 60-SR Tablet",
    },
    {
      nom: "Modin 5 Tablet",
    },
    {
      nom: "Moxocard 0.2 Tablet",
    },
    {
      nom: "Michelle -SR Tablet",
    },
    {
      nom: "Mazetol SR 300 Tablet",
    },
    {
      nom: "Microgest SR 200 Tablet",
    },
    {
      nom: "Merislon 6 Tablet",
    },
    {
      nom: "Macgest 200mg Injection",
    },
    {
      nom: "Macfast 125 Oral Suspension",
    },
    {
      nom: "Metacortil  Cream",
    },
    {
      nom: "Mupinase Cream",
    },
    {
      nom: "Metapro 25 Tablet",
    },
    {
      nom: "Mlobe-PD Eye Drop",
    },
    {
      nom: "Myofest Tablet",
    },
    {
      nom: "Mycept 250 Capsule",
    },
    {
      nom: "Momefit Nasal Spray",
    },
    {
      nom: "Mibcal Soft Gelatin Capsule",
    },
    {
      nom: "Monoguard-B Cream",
    },
    {
      nom: "Metonce 25mg Tablet PR",
    },
    {
      nom: "Mycoclin Shampoo",
    },
    {
      nom: "Momoz S Ointment",
    },
    {
      nom: "Meslo 1200 Tablet PR",
    },
    {
      nom: "Metpure-H 50 Tablet",
    },
    {
      nom: "Montek Plus Tablet",
    },
    {
      nom: "Minokem 5% Spray",
    },
    {
      nom: "Mucocoat-O Suspension Sugar Free",
    },
    {
      nom: "Myophage Tablet SR",
    },
    {
      nom: "Metgem 1gm Tablet ER",
    },
    {
      nom: "Montemac Plus Tablet",
    },
    {
      nom: "Minscalp 5% Gel (30gm Each) Gel",
    },
    {
      nom: "Monoguard Cream",
    },
    {
      nom: "Mylimus 0.1% Ointment",
    },
    {
      nom: "Momben-F Cream",
    },
    {
      nom: "Mytiflam Tablet",
    },
    {
      nom: "Montelo LC Tablet",
    },
    {
      nom: "Monzem LC Tablet",
    },
    {
      nom: "Metromax-XL 50 Tablet",
    },
    {
      nom: "Methimercazole 5 Tablet",
    },
    {
      nom: "Meganerv G 300mg/500mcg Tablet",
    },
    {
      nom: "Momenta 50mcg Nasal Spray",
    },
    {
      nom: "Mirator 0.25 Tablet",
    },
    {
      nom: "MR Met 500mg Tablet",
    },
    {
      nom: "Magnatuss-DX Syrup Sugar Free",
    },
    {
      nom: "Metozaar XL 50 Tablet",
    },
    {
      nom: "Maxpride 50 Tablet",
    },
    {
      nom: "Monit GTN 2.6 Tablet CR",
    },
    {
      nom: "Merotrol 500mg Injection",
    },
    {
      nom: "Minotreat 5% Lotion",
    },
    {
      nom: "Metasone S Ointment",
    },
    {
      nom: "Medomol Drop",
    },
    {
      nom: "Minotas 45mg Tablet ER",
    },
    {
      nom: "Metopole-AM 5mg/50mg Tablet",
    },
    {
      nom: "Makair Tablet",
    },
    {
      nom: "Minscalp 10% Topical Solution",
    },
    {
      nom: "Merimol 650mg Tablet DT",
    },
    {
      nom: "Minolast 10 Tablet",
    },
    {
      nom: "Myonal 100mg Tablet",
    },
    {
      nom: "Micogel F Cream",
    },
    {
      nom: "Monosopt Eye Drop",
    },
    {
      nom: "Minokem-N 5% Solution",
    },
    {
      nom: "Metcy 50 Tablet SR",
    },
    {
      nom: "Mefanorm Suspension",
    },
    {
      nom: "Myket Cream",
    },
    {
      nom: "Migitus 5mg Tablet SR",
    },
    {
      nom: "Mostika-LP Eye Drop",
    },
    {
      nom: "Macorate CR 300 Tablet",
    },
    {
      nom: "Metro PV Ointment",
    },
    {
      nom: "Metacortil-C Cream",
    },
    {
      nom: "Modlip-AM Tablet",
    },
    {
      nom: "Minym 45mg Tablet ER",
    },
    {
      nom: "Myket-ZP Shampoo",
    },
    {
      nom: "Mecolab PG 750mcg/75mg Capsule",
    },
    {
      nom: "Macgest 100 Capsule",
    },
    {
      nom: "Montrelief-LC Tablet",
    },
    {
      nom: "MHG 6mg Lotion",
    },
    {
      nom: "Monteshine F 10mg/120mg Tablet",
    },
    {
      nom: "Meztec 1.2g Tablet PR",
    },
    {
      nom: "Meltor 5 Tablet",
    },
    {
      nom: "Merispas Tablet",
    },
    {
      nom: "Monti-DL Tablet",
    },
    {
      nom: "Melboost 2mg Solution",
    },
    {
      nom: "Minotress Lotion",
    },
    {
      nom: "Minokem-N 2% Solution",
    },
    {
      nom: "Macorate CR 500 Tablet",
    },
    {
      nom: "Migrabeta-TR 80 Tablet",
    },
    {
      nom: "Metwon XR 50 Tablet",
    },
    {
      nom: "Macorate CR 400 Tablet",
    },
    {
      nom: "Mycept-S 180 Tablet",
    },
    {
      nom: "Macpril H 5 Tablet",
    },
    {
      nom: "Metspot XL 50 Tablet",
    },
    {
      nom: "Mac OS 1000mg/20mg Suspension",
    },
    {
      nom: "Mycoclin Dusting Powder",
    },
    {
      nom: "Mignar 25 Tablet",
    },
    {
      nom: "Maxgalin M 150 Capsule",
    },
    {
      nom: "Monoguard Cream",
    },
    {
      nom: "Mixderm Cream",
    },
    {
      nom: "M-Laz Tablet",
    },
    {
      nom: "Metatime 1000 XR Tablet",
    },
    {
      nom: "Metasens 500 Tablet SR",
    },
    {
      nom: "Metafine Cream",
    },
    {
      nom: "Metozox 25mg Tablet ER",
    },
    {
      nom: "Metlong-DS Tablet SR",
    },
    {
      nom: "Mataret Cream",
    },
    {
      nom: "Musaf Ointment",
    },
    {
      nom: "Mycocid Cream",
    },
    {
      nom: "Malidens DS Oral Suspension Banana",
    },
    {
      nom: "Makers Beauty Cream",
    },
    {
      nom: "Mycozole-F Cream",
    },
    {
      nom: "Mpb 1 Tablet",
    },
    {
      nom: "Mycoral 360 Tablet DR",
    },
    {
      nom: "Mpot B6 Oral Solution Natural Mango Sugar Free",
    },
    {
      nom: "Micobate-CN Cream",
    },
    {
      nom: "Mard 100 Tablet",
    },
    {
      nom: "Moveran Gel",
    },
    {
      nom: "Myotan CT 40/6.25 Tablet",
    },
    {
      nom: "Monazine Injection",
    },
    {
      nom: "Metozaar-A 50 Tablet",
    },
    {
      nom: "Mignar 50 Tablet",
    },
    {
      nom: "Mirator 0.5 Tablet",
    },
    {
      nom: "Metromax AM 5 mg/25 mg Tablet",
    },
    {
      nom: "Minoz S Face Wash pH 5.5",
    },
    {
      nom: "Muscobon Tablet",
    },
    {
      nom: "Montina 4 Tablet",
    },
    {
      nom: "Metolar 100 Tablet",
    },
    {
      nom: "MDD XR 100 Tablet",
    },
    {
      nom: "Metaday 500 Tablet SR",
    },
    {
      nom: "Meni 8mg Tablet",
    },
    {
      nom: "Momtent Cream",
    },
    {
      nom: "Mirbeg-S 50 Combo Pack",
    },
    {
      nom: "Metonce-AM 50/5 Tablet",
    },
    {
      nom: "Metafort-G 852 Tablet SR",
    },
    {
      nom: "Muzika 20mg/37.5mg Tablet",
    },
    {
      nom: "MNX-3 Topical Solution",
    },
    {
      nom: "Monotax 500mg Injection",
    },
    {
      nom: "Magprol CR 300 Tablet",
    },
    {
      nom: "Miclogenta N Cream",
    },
    {
      nom: "Mycoclin Lotion",
    },
    {
      nom: "Mucofresh Mouth Wash",
    },
    {
      nom: "Melarv Cream",
    },
    {
      nom: "Mibeta-Plus 5 Tablet SR",
    },
    {
      nom: "Magprol CR 500 Tablet",
    },
    {
      nom: "Mox Suspension",
    },
    {
      nom: "Melitra 10 Tablet",
    },
    {
      nom: "Macrozac 500 Tablet",
    },
    {
      nom: "Metzok 100 Tablet PR",
    },
    {
      nom: "Macpril 1.25 Tablet",
    },
    {
      nom: "Minorich Forte Solution",
    },
    {
      nom: "Minscalp 10% Gel (30gm Each)",
    },
    {
      nom: "Mclazide-M Tablet",
    },
    {
      nom: "Methosis 7.5mg Tablet",
    },
    {
      nom: "Mecorik-G Tablet",
    },
    {
      nom: "Metfirst XL 25 Tablet",
    },
    {
      nom: "Myphen 500 Tablet",
    },
    {
      nom: "M Prol-AM Tablet ER",
    },
    {
      nom: "Minolast Kid 2.5mg/4mg Tablet",
    },
    {
      nom: "Migest SR 200 Tablet",
    },
    {
      nom: "Magprol CR 200 Tablet",
    },
    {
      nom: "Montgold Tablet",
    },
    {
      nom: "Minoxy 2 Solution",
    },
    {
      nom: "Mefomin 1000 SR Tablet",
    },
    {
      nom: "Medomol 650 Tablet",
    },
    {
      nom: "Mox Redimix Oral Suspension",
    },
    {
      nom: "Merislon 12 Tablet",
    },
    {
      nom: "Megatrum-P Ointment",
    },
    {
      nom: "Metspot XL 25 Tablet",
    },
    {
      nom: "Minotress 10% Lotion",
    },
    {
      nom: "Maxformin 1000 Tablet SR",
    },
    {
      nom: "Minfin 10% Lotion",
    },
    {
      nom: "MSN Mirabig-S 50 Combikit",
    },
    {
      nom: "Mycofit-S 180mg Tablet DR",
    },
    {
      nom: "Myotec 500 Tablet",
    },
    {
      nom: "Movadol LA Injection",
    },
    {
      nom: "Migrellium 10mg Tablet",
    },
    {
      nom: "Mymeto XL 12.5 Tablet",
    },
    {
      nom: "Minscalp 2% Solution",
    },
    {
      nom: "Movitol Oral Emulsion",
    },
    {
      nom: "Macorate CR 600 Tablet",
    },
    {
      nom: "Momtas Cream",
    },
    {
      nom: "Methosis 5mg Tablet",
    },
    {
      nom: "Momerate F Cream",
    },
    {
      nom: "Metosan XR 50 Tablet",
    },
    {
      nom: "MNX 5 Solution",
    },
    {
      nom: "Myosam 200 Tablet",
    },
    {
      nom: "Magprol CR 400 Tablet",
    },
    {
      nom: "Mupidac Cream",
    },
    {
      nom: "Mnc Plus Capsule",
    },
    {
      nom: "Magic-HP Kit",
    },
    {
      nom: "Mylimus 0.1% Ointment",
    },
    {
      nom: "Metafort 1000 Tablet SR",
    },
    {
      nom: "Myotec S 360mg Tablet",
    },
    {
      nom: "Monokit Cream",
    },
    {
      nom: "Myodura 5 mg Tablet",
    },
    {
      nom: "Metwell 50mg Tablet XL",
    },
    {
      nom: "Minscalp 2% Gel",
    },
    {
      nom: "Melatrax 250 Tablet",
    },
    {
      nom: "Microshield 4% Surgical Handwash",
    },
    {
      nom: "Maskofung-XL Cream",
    },
    {
      nom: "Moxnix-CV DS Dry Syrup",
    },
    {
      nom: "Megatas Plus 50 Combikit",
    },
    {
      nom: "Macsoralen Lotion",
    },
    {
      nom: "Momicaa  Cream",
    },
    {
      nom: "Metofix-XL 500 Tablet",
    },
    {
      nom: "Maskofung Cream",
    },
    {
      nom: "Medsop Soap",
    },
    {
      nom: "Minirab-D Capsule SR",
    },
    {
      nom: "Megabid 50 Capsule",
    },
    {
      nom: "Minovera 5% Solution",
    },
    {
      nom: "Minoxy 10 Solution",
    },
    {
      nom: "Mucocoat Suspension Sugar Free",
    },
    {
      nom: "Mombest Cream",
    },
    {
      nom: "Modlip 5 Tablet",
    },
    {
      nom: "Mudep Ointment",
    },
    {
      nom: "Megacholin Pastilles",
    },
    {
      nom: "Multipro LC Soft Gelatin Capsule",
    },
    {
      nom: "MSN Mirabig-S 25 Combikit",
    },
    {
      nom: "Mucidal 2% Ointment",
    },
    {
      nom: "Meganano Gel",
    },
    {
      nom: "Montark-L Tablet",
    },
    {
      nom: "Metasens V 0.2 Tablet SR",
    },
    {
      nom: "Mclazide-M 60 XR Tablet",
    },
    {
      nom: "Mesoketz Soap",
    },
    {
      nom: "Mesoketz Cream",
    },
    {
      nom: "MNX-Forte Solution",
    },
    {
      nom: "Mupax 2% Ointment",
    },
    {
      nom: "Norflox-TZ RF Tablet",
    },
    {
      nom: "Nurokind-LC  Tablet",
    },
    {
      nom: "Nurokind-Plus RF Capsule",
    },
    {
      nom: "Nexpro RD 40  Capsule SR",
    },
    {
      nom: "Nise Tablet",
    },
    {
      nom: "Norflox 400 Tablet",
    },
    {
      nom: "Nucoxia MR Tablet",
    },
    {
      nom: "Nexito 10 Tablet",
    },
    {
      nom: "Nexpro 40 Tablet",
    },
    {
      nom: "Neurobion RF Forte Injection",
    },
    {
      nom: "Nexito 5 Tablet",
    },
    {
      nom: "Nicip Tablet",
    },
    {
      nom: "Nodosis Tablet",
    },
    {
      nom: "Nicardia Retard 20 Tablet SR",
    },
    {
      nom: "Nucoxia 90 Tablet",
    },
    {
      nom: "Nikoran 5 Tablet",
    },
    {
      nom: "Novelon Tablet",
    },
    {
      nom: "Nurokind-Gold Injection",
    },
    {
      nom: "Neosporin H Ointment",
    },
    {
      nom: "Napra D 500 Tablet",
    },
    {
      nom: "Niftran 100mg Capsule",
    },
    {
      nom: "Nuforce-Gm Cream",
    },
    {
      nom: "Natrise Tablet",
    },
    {
      nom: "NO SCARS Cream",
    },
    {
      nom: "Nitrobact 100 Capsule",
    },
    {
      nom: "Novamox 500 Capsule",
    },
    {
      nom: "Nurokind-G  Tablet",
    },
    {
      nom: "Nitrocontin 2.6 Tablet CR",
    },
    {
      nom: "Neorelax MR Tablet",
    },
    {
      nom: "Nucoxia P Tablet",
    },
    {
      nom: "Nuhenz Capsule",
    },
    {
      nom: "Nortipan-M Tablet SR",
    },
    {
      nom: "Nebicard 5 Tablet",
    },
    {
      nom: "Nervijen-P Capsule",
    },
    {
      nom: "Nexpro L Capsule ER",
    },
    {
      nom: "Nicardia Retard 10 Tablet SR",
    },
    {
      nom: "Nefrosave Forte Tablet",
    },
    {
      nom: "Napra D 250 Tablet",
    },
    {
      nom: "Nexpro IT Capsule SR",
    },
    {
      nom: "Nurokind-Plus NF Injection",
    },
    {
      nom: "Neukine 300mcg Injection",
    },
    {
      nom: "Nizonide 500 Tablet",
    },
    {
      nom: "Neosporin Dusting Powder",
    },
    {
      nom: "Neo-Mercazole 10 Tablet",
    },
    {
      nom: "Nitrolong 2.6 Tablet CR",
    },
    {
      nom: "Nexpro Fast 40 Tablet",
    },
    {
      nom: "Novastat 10 Tablet",
    },
    {
      nom: "Nefacool Eye Drops",
    },
    {
      nom: "Nervijen Plus Injection",
    },
    {
      nom: "New Hatric 3 Tablet",
    },
    {
      nom: "Neo-Mercazole 5 Tablet",
    },
    {
      nom: "Nitrofur SR Tablet",
    },
    {
      nom: "Natrilix SR Tablet",
    },
    {
      nom: "Nizral 2% Solution",
    },
    {
      nom: "Nadoxin Cream",
    },
    {
      nom: "Nootropil 800mg Tablet",
    },
    {
      nom: "Nucort-M4 Tablet DT",
    },
    {
      nom: "Nobel-Plus Suspension",
    },
    {
      nom: "Nebicard 2.5 Tablet",
    },
    {
      nom: "Nebasulf Sprinkling Powder",
    },
    {
      nom: "Neosporin H Ear Drop",
    },
    {
      nom: "Novastat CV 10  Capsule",
    },
    {
      nom: "Nevanac Ophthalmic Suspension",
    },
    {
      nom: "Novorapid Penfill",
    },
    {
      nom: "Nodard Plus Tablet",
    },
    {
      nom: "Novomix 30 Flexpen 100IU/ml",
    },
    {
      nom: "Nobel-Plus Tablet",
    },
    {
      nom: "Nadibact Cream",
    },
    {
      nom: "Neopride Total Capsule SR",
    },
    {
      nom: "Nervmax SR 75 Tablet",
    },
    {
      nom: "Nioclean Gel",
    },
    {
      nom: "Nervijen-NP Tablet",
    },
    {
      nom: "Novogermina Oral Suspension",
    },
    {
      nom: "Nazomac-AF Nasal Spray",
    },
    {
      nom: "Novomix 30 100IU/ml Penfill",
    },
    {
      nom: "New Brozeet Syrup",
    },
    {
      nom: "Novaclav 625 Tablet",
    },
    {
      nom: "Norad 2mg Injection",
    },
    {
      nom: "Nostra-CR 10 Tablet",
    },
    {
      nom: "Nebistar 5 Tablet",
    },
    {
      nom: "Nifty-SR Tablet",
    },
    {
      nom: "Novamox CV 625mg Tablet",
    },
    {
      nom: "Nocold Tablet",
    },
    {
      nom: "Normaxin-MB Capsule SR",
    },
    {
      nom: "Nexpro 20 Tablet",
    },
    {
      nom: "Nepalact Eye Drop",
    },
    {
      nom: "Novamox 250 Capsule",
    },
    {
      nom: "Naltima 50 Tablet",
    },
    {
      nom: "Noworm Chewable Tablet",
    },
    {
      nom: "Nexovas T Tablet",
    },
    {
      nom: "Naprosyn Tablet",
    },
    {
      nom: "Nebzmart-G 25mcg Smartules 2ml",
    },
    {
      nom: "Nucoxia 60 Tablet",
    },
    {
      nom: "Naprosyn D 500 Tablet",
    },
    {
      nom: "Nizral Cream",
    },
    {
      nom: "Nervite Plus Tablet",
    },
    {
      nom: "Nepaflam Eye Drop",
    },
    {
      nom: "Naso B12 Nasal Spray",
    },
    {
      nom: "Nurokind-G  100 New Tablet",
    },
    {
      nom: "Nurogab NT  Tablet",
    },
    {
      nom: "Neksium 40mg Tablet",
    },
    {
      nom: "New I-Kul Plus Ophthalmic Solution",
    },
    {
      nom: "Nebistar 5 Tablet",
    },
    {
      nom: "Nebistar 5 Tablet",
    },
    {
      nom: "Nifty-SR Tablet",
    },
    {
      nom: "Novamox CV 625mg Tablet",
    },
    {
      nom: "Nocold Tablet",
    },
    {
      nom: "Normaxin-MB Capsule SR",
    },
    {
      nom: "Nexpro 20 Tablet",
    },
    {
      nom: "Nepalact Eye Drop",
    },
    {
      nom: "Novamox 250 Capsule",
    },
    {
      nom: "Naltima 50 Tablet",
    },
    {
      nom: "Noworm Chewable Tablet",
    },
    {
      nom: "Nexovas T Tablet",
    },
    {
      nom: "Naprosyn Tablet",
    },
    {
      nom: "Nebzmart-G 25mcg Smartules 2ml",
    },
    {
      nom: "Nucoxia 60 Tablet",
    },
    {
      nom: "Naprosyn D 500 Tablet",
    },
    {
      nom: "Nizral Cream",
    },
    {
      nom: "Nervite Plus Tablet",
    },
    {
      nom: "Nepaflam Eye Drop",
    },
    {
      nom: "Nurokind-G  100 New Tablet",
    },
    {
      nom: "Nurogab NT  Tablet",
    },
    {
      nom: "Neksium 40mg Tablet",
    },
    {
      nom: "New I-Kul Plus Ophthalmic Solution",
    },
    {
      nom: "Nexpro RD 20 Capsule SR",
    },
    {
      nom: "Novefos Powder",
    },
    {
      nom: "Nitro 2.6 Tablet CR",
    },
    {
      nom: "Nicardia XL 30 Tablet",
    },
    {
      nom: "Nilac Gel",
    },
    {
      nom: "Norflox Eye/Ear Drops",
    },
    {
      nom: "New Ivermectol 12 Tablet",
    },
    {
      nom: "Nortipan Tablet",
    },
    {
      nom: "Noworm Oral Suspension",
    },
    {
      nom: "Nebicard-SM Tablet",
    },
    {
      nom: "Nioclean AD Gel",
    },
    {
      nom: "Noculi B6 Oral Solution",
    },
    {
      nom: "Nimulid-MD Tablet",
    },
    {
      nom: "Norflokem TZ Tablet",
    },
    {
      nom: "Nosic 10mg/10mg Tablet",
    },
    {
      nom: "Nexpro HP Combipack",
    },
    {
      nom: "Norlut-N Tablet",
    },
    {
      nom: "Nimulid Tablet",
    },
    {
      nom: "Nimodip Tablet",
    },
    {
      nom: "Nexito 20 Tablet",
    },
    {
      nom: "Novastat Gold Tablet",
    },
    {
      nom: "Novastat-TG 10 Tablet",
    },
    {
      nom: "Nicostar 5 Tablet",
    },
    {
      nom: "Nootropil Syrup",
    },
    {
      nom: "Norfagyl Plus Oral Suspension",
    },
    {
      nom: "Nefodol Tablet",
    },
    {
      nom: "Niftas 50 Tablet",
    },
    {
      nom: "Neph-M Eye Drop",
    },
    {
      nom: "Nimucet Gold 100mg/325mg Tablet",
    },
    {
      nom: "Nukast 10 Tablet",
    },
    {
      nom: "Nucoxia 120 Tablet",
    },
    {
      nom: "Norvent-D Cough Syrup",
    },
    {
      nom: "Nadoxin Plus Cream",
    },
    {
      nom: "Nixidox Capsule",
    },
    {
      nom: "Nuroday Tablet ER",
    },
    {
      nom: "Novastat CV 20 Capsule",
    },
    {
      nom: "Nebicard T Tablet",
    },
    {
      nom: "Nicip MD Tablet",
    },
    {
      nom: "Nebi 5 Tablet",
    },
    {
      nom: "Nucort-M8 Tablet DT",
    },
    {
      nom: "Nikoran 10 Tablet",
    },
    {
      nom: "Neurotrat NP Tablet",
    },
    {
      nom: "Nefrogard Tablet",
    },
    {
      nom: "Neopride Tablet",
    },
    {
      nom: "Naprosyn SR Tablet",
    },
    {
      nom: "Nitrobest Tablet SR",
    },
    {
      nom: "Novamox 250 Rediuse Oral Suspension",
    },
    {
      nom: "Nemocid Oral Suspension",
    },
    {
      nom: "Nuforce Mouth Paint",
    },
    {
      nom: "Nervmax Capsule",
    },
    {
      nom: "Nebistar 2.5 Tablet",
    },
    {
      nom: "Nodosis GST Tablet",
    },
    {
      nom: "New Hair 4U 5% Solution",
    },
    {
      nom: "Nucoxia Relax Tablet",
    },
    {
      nom: "Nortimer 25mg Tablet",
    },
    {
      nom: "Novastat Gold 20 Capsule",
    },
    {
      nom: "Neugaba 75 Capsule",
    },
    {
      nom: "Nadoxin Gel",
    },
    {
      nom: "Nureeto-MR 4 Tablet",
    },
    {
      nom: "New O2 Oral Suspension Delicious Mango",
    },
    {
      nom: "Neurocetam Plus Tablet",
    },
    {
      nom: "Nebistar-SA Tablet",
    },
    {
      nom: "Newtel-AM Tablet",
    },
    {
      nom: "Nailrox Nail Lacquer",
    },
    {
      nom: "Nefrosave Keto Tablet",
    },
    {
      nom: "New Triglucored Forte Tablet",
    },
    {
      nom: "Nicoduce 5 Tablet",
    },
    {
      nom: "Nervmax NT 75mg/10mg Tablet",
    },
    {
      nom: "Nuforce Anti Dandruff Lotion",
    },
    {
      nom: "Nifutin Tablet SR",
    },
    {
      nom: "Neurocetam Syrup",
    },
    {
      nom: "Nervite Tablet",
    },
    {
      nom: "Newtel 40 Tablet",
    },
    {
      nom: "Nefosar Tablet",
    },
    {
      nom: "Nodict 50mg Tablet",
    },
    {
      nom: "Nova 75 Capsule",
    },
    {
      nom: "Nortryptomer-P 10mg/75mg Tablet",
    },
    {
      nom: "Noctura Syrup",
    },
    {
      nom: "Natrilam 5 Tablet SR",
    },
    {
      nom: "Niacin NF Tablet",
    },
    {
      nom: "Nemocid Tablet",
    },
    {
      nom: "Norgest Tablet",
    },
    {
      nom: "Neorelax MR 8 Tablet",
    },
    {
      nom: "Nobel Tablet MD",
    },
    {
      nom: "Neugatrip Tablet",
    },
    {
      nom: "Naturogest SR 200 Tablet",
    },
    {
      nom: "Nepastar Eye Drop",
    },
    {
      nom: "Niosol Ointment",
    },
    {
      nom: "Netazox Tablet",
    },
    {
      nom: "New Modlip-Asg 75 Capsule",
    },
    {
      nom: "Nicerbium Tablet",
    },
    {
      nom: "Neo-Mercazole 20 Tablet",
    },
    {
      nom: "Novalgin NU Tablet",
    },
    {
      nom: "Nuforce 150 Tablet",
    },
    {
      nom: "Neurabol Capsule",
    },
    {
      nom: "Newtel-H 40 Tablet",
    },
    {
      nom: "Nortas CR Tablet",
    },
    {
      nom: "Nadibact Gel",
    },
    {
      nom: "Nootropil C Tablet",
    },
    {
      nom: "Norflokem 400mg Tablet",
    },
    {
      nom: "Neurica NT Tablet",
    },
    {
      nom: "Nioret Nano Gel",
    },
    {
      nom: "Nervup PG Capsule",
    },
    {
      nom: "Nobel MR Tablet",
    },
    {
      nom: "Niftran 100mg Capsule",
    },
    {
      nom: "Nexpro Junior Granules for Oral Suspension",
    },
    {
      nom: "Novorapid 100IU Injection",
    },
    {
      nom: "Nebi-AM Tablet",
    },
    {
      nom: "Nikoran IV 48 Injection",
    },
    {
      nom: "Nazomac-F Nasal Spray",
    },
    {
      nom: "Nuforce Dusting Powder",
    },
    {
      nom: "Neuractin-P 75 Capsule",
    },
    {
      nom: "Nucoxia MR 8 Tablet",
    },
    {
      nom: "Naturogest 200mg Soft Gelatin Capsule",
    },
    {
      nom: "New Maxmoist Eye Drop",
    },
    {
      nom: "Nurokind Forte 1500mcg/100mg/100mg Injection",
    },
    {
      nom: "Niosol-F Cream",
    },
    {
      nom: "Nilac A Gel",
    },
    {
      nom: "Noblok-AF Drops",
    },
    {
      nom: "Nurokind-LC  Injection",
    },
    {
      nom: "Nukast 4 Syrup",
    },
    {
      nom: "Neurofit Syrup",
    },
    {
      nom: "NAC SR 75 Tablet",
    },
    {
      nom: "Natamet Eye Drop",
    },
    {
      nom: "Nebi 2.5 Tablet",
    },
    {
      nom: "Nicoglow 250mg Tablet",
    },
    {
      nom: "Newtel-CH 40 Tablet",
    },
    {
      nom: "Neph-M Plus Eye Drop",
    },
    {
      nom: "Novacor Cream",
    },
    {
      nom: "Nexovas O Tablet",
    },
    {
      nom: "Nitrofix SR 30 Tablet",
    },
    {
      nom: "Nextane Ophthalmic Solution",
    },
    {
      nom: "Neurokem Plus Capsule",
    },
    {
      nom: "Novale-CT Scalp Lotion",
    },
    {
      nom: "Newtel-Beta 25 Tablet PR",
    },
    {
      nom: "Normatone Syrup",
    },
    {
      nom: "Newbona Jelly",
    },
    {
      nom: "Nuforce 400mg Tablet",
    },
    {
      nom: "Nindanib 150 Soft Gelatin Capsule",
    },
    {
      nom: "Niosalic Ointment",
    },
    {
      nom: "Newtel-Beta 50 Tablet PR",
    },
    {
      nom: "Nuforce-CD 3 Vaginal Suppository",
    },
    {
      nom: "Nortipan 50mg/10mg Tablet",
    },
    {
      nom: "Nostra-CR 15 Tablet",
    },
    {
      nom: "Nebicard-H Tablet",
    },
    {
      nom: "Nexipox Vaccine",
    },
    {
      nom: "Nebracin 0.3% Eye Drop",
    },
    {
      nom: "Neomol 80 Anal Suppository",
    },
    {
      nom: "Nasowash Starter Kit",
    },
    {
      nom: "Nulong-Trio Tablet",
    },
    {
      nom: "Nazomac-M Nasal Spray",
    },
    {
      nom: "Norflox 200 Tablet",
    },
    {
      nom: "Nizonide Oral Suspension",
    },
    {
      nom: "Neurocetam 800 Tablet",
    },
    {
      nom: "Nezaflo Nasal Spray",
    },
    {
      nom: "Nax B Gel",
    },
    {
      nom: "Niogenta-F Cream",
    },
    {
      nom: "Neurovin Tablet",
    },
    {
      nom: "Nicip MR Tablet",
    },
    {
      nom: "Nostra Tablet",
    },
    {
      nom: "Nifecaine Cream",
    },
    {
      nom: "Nuflucon Ear Drop",
    },
    {
      nom: "Nailon Nail Lacquer",
    },
    {
      nom: "Nadimix Cream",
    },
    {
      nom: "Nitrocontin 6.4 Tablet CR",
    },
    {
      nom: "New Zydol Oral Suspension",
    },
    {
      nom: "Neuciti Plus Syrup",
    },
    {
      nom: "Nebzmart FB 0.5mg Smartules 2ml",
    },
    {
      nom: "Novamox 250 DT Tablet",
    },
    {
      nom: "Neurobid-NT Tablet SR",
    },
    {
      nom: "Nimodol 100mg Tablet",
    },
    {
      nom: "Nucoxia SP Tablet",
    },
    {
      nom: "Nobel Spas RF 10mg/ml/25mg/ml Injection",
    },
    {
      nom: "Nexovas M 50 Tablet",
    },
    {
      nom: "NE-C Tablet",
    },
    {
      nom: "Nazomac-FF Nasal Spray",
    },
    {
      nom: "Nidagen -SR 200 Tablet",
    },
    {
      nom: "Nasoclear Gel",
    },
    {
      nom: "Neurica-M 75 Capsule",
    },
    {
      nom: "Noblok Syrup Strawberry",
    },
    {
      nom: "Nicardia 5 Capsule",
    },
    {
      nom: "Nacyres Tablet",
    },
    {
      nom: "Nimprex Tablet",
    },
    {
      nom: "Nuforce 200 Tablet",
    },
    {
      nom: "Niveoli Inhaler",
    },
    {
      nom: "Niosalic 6 Ointment",
    },
    {
      nom: "Nadoxin-C Cream",
    },
    {
      nom: "Nam Cold Tablet",
    },
    {
      nom: "Noblok Nasal Spray",
    },
    {
      nom: "Novale Bar",
    },
    {
      nom: "Nebzmart IL Smartules",
    },
    {
      nom: "Neugaba ER 75 Tablet",
    },
    {
      nom: "Noblok-AF Syrup",
    },
    {
      nom: "NAC 50 Tablet",
    },
    {
      nom: "Novastat 5 Tablet",
    },
    {
      nom: "Neurofit Forte Tablet",
    },
    {
      nom: "Nodon 2.5 Tablet",
    },
    {
      nom: "Norvent LS Syrup",
    },
    {
      nom: "Nocold Syrup",
    },
    {
      nom: "Nuforce Soap",
    },
    {
      nom: "Nicardia 10 Capsule",
    },
    {
      nom: "Nucarnit 500 Tablet",
    },
    {
      nom: "Nadoxin Ointment",
    },
    {
      nom: "Nac Plus Tablet",
    },
    {
      nom: "Nurogab 75 Tablet SR",
    },
    {
      nom: "Nexpro Fast 20 Tablet",
    },
    {
      nom: "Nexovas O 40 Tablet",
    },
    {
      nom: "Naturogest SR 300 Tablet",
    },
    {
      nom: "Nicardia CD Retard 30 Tablet SR",
    },
    {
      nom: "New Ventiphylline PD 1.5 mg/50 mg/0.5 mg Syrup",
    },
    {
      nom: "Neocalm Plus Tablet",
    },
    {
      nom: "Nemdaa 5 Tablet",
    },
    {
      nom: "Nexvenla-OD 50  Tablet ER",
    },
    {
      nom: "Nodon Tablet",
    },
    {
      nom: "Nocram Tablet",
    },
    {
      nom: "Noxitef TZ 400mg/600mg Tablet",
    },
    {
      nom: "Novapime 1gm Injection",
    },
    {
      nom: "Nucoxia D3 Capsule",
    },
    {
      nom: "Neomol 170 Anal Suppository",
    },
    {
      nom: "Nummit Spray Fresh Mint",
    },
    {
      nom: "NAC SR 100 Tablet",
    },
    {
      nom: "Nitrolong 6.4 Tablet CR",
    },
    {
      nom: "Nootropil 1200 Tablet",
    },
    {
      nom: "Nimulid-HF Tablet",
    },
    {
      nom: "Nicopenta DSR Capsule",
    },
    {
      nom: "Nebilong Tablet",
    },
    {
      nom: "Nimica 100 DT Tablet",
    },
    {
      nom: "Noblok New Tablet",
    },
    {
      nom: "Nexipride 25 Tablet",
    },
    {
      nom: "Nindanib 100 Soft Gelatin Capsule",
    },
    {
      nom: "Nexovas Beta Tablet",
    },
    {
      nom: "Newbona Fem Tablet",
    },
    {
      nom: "Ntgn 2.6 Tablet CR",
    },
    {
      nom: "Nicardia XL 60 Tablet",
    },
    {
      nom: "Nobegliz 60 XR Tablet",
    },
    {
      nom: "Nacfil Tablet",
    },
    {
      nom: "Nervotop Tablet SR",
    },
    {
      nom: "Natrise 30 Tablet",
    },
    {
      nom: "Nexovas CH Tablet",
    },
    {
      nom: "Nuflam-TH 8mg Capsule SR",
    },
    {
      nom: "Neurokem-M Capsule",
    },
    {
      nom: "Noblok Drop",
    },
    {
      nom: "Nupenta CP Capsule SR",
    },
    {
      nom: "Nise Mdt 100mg Tablet MD",
    },
    {
      nom: "Nebicard LN 5 Tablet",
    },
    {
      nom: "Numol SP Tablet",
    },
    {
      nom: "Nam Cold Z Syrup",
    },
    {
      nom: "Nureeto 90 Tablet",
    },
    {
      nom: "New GTN 2.6 Tablet CR",
    },
    {
      nom: "Normonal 10mg Tablet CR",
    },
    {
      nom: "Neuromin-M Syrup",
    },
    {
      nom: "Naturogest 8% Vaginal gel",
    },
    {
      nom: "Natclovir 250 Capsule",
    },
    {
      nom: "Novomix 50 100IU/ml Penfill",
    },
    {
      nom: "Nobegliz-M XR Tablet",
    },
    {
      nom: "Nafodil 50 Tablet",
    },
    {
      nom: "Nepablu Eye Drop",
    },
    {
      nom: "Novastat EZ 10mg/10mg Tablet",
    },
    {
      nom: "Nasocobal Nasal Spray",
    },
    {
      nom: "Novamox CV 228.5mg Dry Syrup",
    },
    {
      nom: "Nupenta LS Capsule SR",
    },
    {
      nom: "Nebi-H Tablet",
    },
    {
      nom: "Normabrain Syrup",
    },
    {
      nom: "Nizonide-O Tablet",
    },
    {
      nom: "Neurokem 50 Capsule",
    },
    {
      nom: "Novamox 125 Rediuse Oral Suspension",
    },
    {
      nom: "Nepacin Eye Drop",
    },
    {
      nom: "Novastat-TG 20 Tablet",
    },
    {
      nom: "Netromax 300mg Injection",
    },
    {
      nom: "New Alene Tablet",
    },
    {
      nom: "Nortryptomer-P SR 50 Tablet",
    },
    {
      nom: "Novamox Paediatric Drops",
    },
    {
      nom: "Nizonide 200mg Tablet DT",
    },
    {
      nom: "Nervz NT Tablet SR",
    },
    {
      nom: "Nervz-G Tablet",
    },
    {
      nom: "Novacef 500 Tablet",
    },
    {
      nom: "Nizer Tablet",
    },
    {
      nom: "Nevirin Tablet",
    },
    {
      nom: "Noculi Tablet",
    },
    {
      nom: "Nizral Cream",
    },
    {
      nom: "Norwayz Tablet",
    },
    {
      nom: "Nexipride 50 Tablet",
    },
    {
      nom: "Nailrox Cream",
    },
    {
      nom: "Nicogum 4 Nicotine Gum Chewing Gums Fresh Mint Sugar Free",
    },
    {
      nom: "Nitrotap Applicap",
    },
    {
      nom: "Neorelax SP Tablet",
    },
    {
      nom: "Nurocol Tablet",
    },
    {
      nom: "Naturogest 400mg Soft Gelatin Capsule",
    },
    {
      nom: "Neomol 250 Anal Suppository",
    },
    {
      nom: "New Wosulin 30/70 100IU/ml Injection 3ml",
    },
    {
      nom: "Nazobic Nasal Spray",
    },
    {
      nom: "Nova M 75 Capsule",
    },
    {
      nom: "Neuciti Plus Tablet",
    },
    {
      nom: "Nidagen 200 Soft Gelatin Capsule",
    },
    {
      nom: "NS-Aid Eye Drop",
    },
    {
      nom: "Neksium 20 Tablet",
    },
    {
      nom: "Nidagen -SR 300 Tablet",
    },
    {
      nom: "Nulong-Trio 40 Tablet",
    },
    {
      nom: "Neuromine-Plus Capsule",
    },
    {
      nom: "Nepawel Eye Drop BKC Free",
    },
    {
      nom: "Nimupain Plus Tablet",
    },
    {
      nom: "Novomix 30 100IU/ml Penfill",
    },
    {
      nom: "Nicoduce 10 Tablet",
    },
    {
      nom: "Nortas CR 15 Tablet",
    },
    {
      nom: "Nadifa Cream",
    },
    {
      nom: "Nefasol Eye Drop",
    },
    {
      nom: "Neosoralen Forte 25mg Tablet",
    },
    {
      nom: "Nucoril 5 Tablet",
    },
    {
      nom: "Nemdaa 10 Tablet",
    },
    {
      nom: "Nicostar OD 10 Tablet PR",
    },
    {
      nom: "Nudoxy Capsule",
    },
    {
      nom: "Nexiron Injection",
    },
    {
      nom: "Nebistar-H Tablet",
    },
    {
      nom: "Natzold Infusion",
    },
    {
      nom: "Neurocetam Capsule",
    },
    {
      nom: "Nebicard LN 2.5 Tablet",
    },
    {
      nom: "Navina-JR Tablet",
    },
    {
      nom: "Nimceta Tablet",
    },
    {
      nom: "Nervijen-P SR Tablet",
    },
    {
      nom: "Nefrosave Keto Sachet",
    },
    {
      nom: "Nextop 25 Tablet",
    },
    {
      nom: "Numbex Cream",
    },
    {
      nom: "Neuroprime-PG Capsule",
    },
    {
      nom: "Nodon AM 5/5 Tablet",
    },
    {
      nom: "Novomix 50 Suspension for Injection 100IU/ml",
    },
    {
      nom: "Nilol Tablet SR",
    },
    {
      nom: "Naltrawave Tablet",
    },
    {
      nom: "Naturogest 100mg Injection",
    },
    {
      nom: "Natrilam 2.5mg Tablet SR",
    },
    {
      nom: "Novorapid Penfill",
    },
    {
      nom: "Nicoduce OD 10mg Tablet",
    },
    {
      nom: "Nebimac 5 Tablet",
    },
    {
      nom: "Nervic-G Tablet",
    },
    {
      nom: "New Triclazone 80 Tablet",
    },
    {
      nom: "Nicip 100mg Capsule",
    },
    {
      nom: "Neopride SR Tablet",
    },
    {
      nom: "Napsure Plus Tablet",
    },
    {
      nom: "Nebicard 10 Tablet",
    },
    {
      nom: "Niofine Forte Tablet",
    },
    {
      nom: "Nozee Tablet",
    },
    {
      nom: "New Eukroma-Plus Cream",
    },
    {
      nom: "Novaclav 625 Tablet",
    },
    {
      nom: "New Hair 4U 2% Solution",
    },
    {
      nom: "Nubeta 5 Tablet",
    },
    {
      nom: "Nephtor 10 Tablet",
    },
    {
      nom: "Niofine Tablet",
    },
    {
      nom: "Nozia Injection",
    },
    {
      nom: "Newven OD 50 Tablet ER",
    },
    {
      nom: "Nebula 5 Tablet",
    },
    {
      nom: "Nebula-D Tablet SR",
    },
    {
      nom: "Newtel 20 Tablet",
    },
    {
      nom: "New Theo-Asthalin Syrup",
    },
    {
      nom: "Nepatak Eye Drop",
    },
    {
      nom: "Nebicard-V Tablet",
    },
    {
      nom: "Nocold Drop",
    },
    {
      nom: "Neypac 0.1% Eye Drop",
    },
    {
      nom: "Nebilong H Tablet",
    },
    {
      nom: "Numbex Cream",
    },
    {
      nom: "New Travisight-T Eye Drop",
    },
    {
      nom: "Nixitral 100 Capsule",
    },
    {
      nom: "Nervit 500mcg Tablet",
    },
    {
      nom: "Numol MR 4 Tablet",
    },
    {
      nom: "Niofine Dusting Powder",
    },
    {
      nom: "Neopride MPS Tablet",
    },
    {
      nom: "Nodosis Oral Suspension",
    },
    {
      nom: "Nizoclin-SX Lotion",
    },
    {
      nom: "New Coldact Capsule SR",
    },
    {
      nom: "Novamox 125 DT Tablet",
    },
    {
      nom: "Nizoclin Soap",
    },
    {
      nom: "Nexsart 40 Tablet",
    },
    {
      nom: "Nutalact Syrup",
    },
    {
      nom: "Nuloc-D Capsule SR",
    },
    {
      nom: "Natrilam 10 Tablet SR",
    },
    {
      nom: "Nebicip 5 Tablet",
    },
    {
      nom: "Nexvenla -OD 100 Tablet ER",
    },
    {
      nom: "Nepaflam OD Eye Drop",
    },
    {
      nom: "New Hair 4U 10% Solution",
    },
    {
      nom: "Nimupain 100mg Tablet",
    },
    {
      nom: "Nebula AM Tablet",
    },
    {
      nom: "Nimdase-P Tablet",
    },
    {
      nom: "Neoclobyte GM Cream",
    },
    {
      nom: "Normabrain 800mg Tablet",
    },
    {
      nom: "Nulong-OL 20 Tablet",
    },
    {
      nom: "Nucool S 1000mg Suspension",
    },
    {
      nom: "Nixitral 200 Capsule",
    },
    {
      nom: "Nuflam-RB Capsule SR",
    },
    {
      nom: "Nurostar C 0.7mg/1500mcg/12mg Injection",
    },
    {
      nom: "Nswet Powder",
    },
    {
      nom: "Newcita 20 Tablet",
    },
    {
      nom: "Nebzmart FB 1mg Smartules 2ml",
    },
    {
      nom: "Nureeto-MR 8 Tablet",
    },
    {
      nom: "Naturogest AQ 25mg Injection",
    },
    {
      nom: "Nexopil -DSR Capsule",
    },
    {
      nom: "Nextop 50 Tablet",
    },
    {
      nom: "Nordys 550mg Tablet",
    },
    {
      nom: "Novolid 100mg Tablet",
    },
    {
      nom: "Nvm Dolo Tablet SR",
    },
    {
      nom: "Nayzit Gel",
    },
    {
      nom: "Nodon AM 2.5 mg/2.5 mg Tablet",
    },
    {
      nom: "Nadimax Cream",
    },
    {
      nom: "Nimulid Transgel",
    },
    {
      nom: "Nizonide-O Oral Suspension",
    },
    {
      nom: "Nortimer 50mg Tablet",
    },
    {
      nom: "Nebicip 2.5 Tablet",
    },
    {
      nom: "Nunaf Tablet",
    },
    {
      nom: "Novonorm 0.5mg Tablet",
    },
    {
      nom: "Navibrom Eye Drop",
    },
    {
      nom: "Nowill 1.5mg Tablet",
    },
    {
      nom: "No Dryfusion Eye Drop",
    },
    {
      nom: "New CH 6.25mg Tablet",
    },
    {
      nom: "Numlo-TM Tablet",
    },
    {
      nom: "Naturogest SR 400 Tablet",
    },
    {
      nom: "Nodon H Tablet",
    },
    {
      nom: "Nubeta SM Tablet",
    },
    {
      nom: "Neo-Hp Kit",
    },
    {
      nom: "Nervsenz Tablet SR",
    },
    {
      nom: "Nurocot 500mg Tablet",
    },
    {
      nom: "Navionce Eye Drop",
    },
    {
      nom: "Naturogest 100mg Soft Gelatin Capsule",
    },
    {
      nom: "Normalip F 10 Tablet",
    },
    {
      nom: "Nexpar Oral Solution",
    },
    {
      nom: "Nucarnit-F Tablet",
    },
    {
      nom: "Nebazine Ointment",
    },
    {
      nom: "Nimtech 100mg Tablet",
    },
    {
      nom: "Nepacent Eye Drop",
    },
    {
      nom: "Novale Scalp Lotion",
    },
    {
      nom: "Nidagen 100 Capsule",
    },
    {
      nom: "Nexna TX Tablet",
    },
    {
      nom: "Neorelax A 4mg Tablet",
    },
    {
      nom: "Novonorm 2mg Tablet",
    },
    {
      nom: "Naftate Cream",
    },
    {
      nom: "Nitrofix SR 60 Tablet",
    },
    {
      nom: "Nuril 2.5 Tablet",
    },
    {
      nom: "New Wosulin 30/70 Injection",
    },
    {
      nom: "New Benadryl DR Cough Lozenges Honey+Lemon",
    },
    {
      nom: "Naeva SR 200 Tablet",
    },
    {
      nom: "Neugaba 150 Capsule",
    },
    {
      nom: "Neosoralen 5mg Tablet",
    },
    {
      nom: "Novamox 250 Rediuse Oral Suspension",
    },
    {
      nom: "Nephtor 20 Tablet",
    },
    {
      nom: "Neosoralen Lotion",
    },
    {
      nom: "Natcocil-M Tablet ER",
    },
    {
      nom: "Novamox 250 Rediuse Oral Suspension",
    },
    {
      nom: "Nugliptin M 500 Tablet",
    },
    {
      nom: "Nephtor 100 Tablet",
    },
    {
      nom: "Nitro 6.4 Tablet CR",
    },
    {
      nom: "Nozal Soap",
    },
    {
      nom: "Neuronox 100IU Injection",
    },
    {
      nom: "Nulong-OL 40 Tablet",
    },
    {
      nom: "Nedolide MR Tablet",
    },
    {
      nom: "Newven OD 100 Tablet ER",
    },
    {
      nom: "Nizol Shampoo",
    },
    {
      nom: "Novamox 100 Rediuse Drop",
    },
    {
      nom: "Neurofit 12 Tablet",
    },
    {
      nom: "Numlo-TM 5 Tablet",
    },
    {
      nom: "Nizoclin Cream",
    },
    {
      nom: "Nitrofix 20 Tablet",
    },
    {
      nom: "Nucarnit Tablet",
    },
    {
      nom: "NAC -AQ Injection",
    },
    {
      nom: "Naudox Tablet",
    },
    {
      nom: "Noxafil Oral Suspension",
    },
    {
      nom: "Nusar-H Tablet",
    },
    {
      nom: "Niclonz 4 Pastilles Mint Sugar Free",
    },
    {
      nom: "Neopress AM 50mg/5mg Tablet",
    },
    {
      nom: "Nimegesic 100mg Tablet IR",
    },
    {
      nom: "Nexipra 10 Tablet",
    },
    {
      nom: "Naprosyn ES Tablet DR",
    },
    {
      nom: "Nface-AC Gel",
    },
    {
      nom: "Nimorazol Tablet",
    },
    {
      nom: "Novadoc 400mg Tablet ER",
    },
    {
      nom: "Noscab Soap",
    },
    {
      nom: "NAC SR 150 Tablet",
    },
    {
      nom: "Nervrelief Tablet SR",
    },
    {
      nom: "Nitch Cream",
    },
    {
      nom: "Ntgn 6.4 Tablet CR",
    },
    {
      nom: "Numbex Cream",
    },
    {
      nom: "Neolet 500mg Tablet",
    },
    {
      nom: "Nebizok 5 Tablet",
    },
    {
      nom: "Nia 250mg Tablet",
    },
    {
      nom: "Nexarid-DSR Capsule",
    },
    {
      nom: "Nebizok 5 Tablet",
    },
    {
      nom: "Nia 250mg Tablet",
    },
    {
      nom: "Nexarid-DSR Capsule",
    },
    {
      nom: "NT-Natal 250mg Injection",
    },
    {
      nom: "Napsea Tablet",
    },
    {
      nom: "Nebipil SA Tablet",
    },
    {
      nom: "Nokver 200 Capsule",
    },
    {
      nom: "Neopristal Tablet",
    },
    {
      nom: "Neos Cream",
    },
    {
      nom: "Nexavar 200mg Tablet",
    },
    {
      nom: "Neuciti 500 Tablet",
    },
    {
      nom: "Nimceta MF Suspension",
    },
    {
      nom: "Nebiten 2.5 Tablet",
    },
    {
      nom: "Nexopil 40 Tablet",
    },
    {
      nom: "Nacfil 1200 Tablet",
    },
    {
      nom: "Nveda Sleep Aid with Melatonin 3mg Tablet",
    },
    {
      nom: "Neurocreme Cream",
    },
    {
      nom: "Neucholine Tablet",
    },
    {
      nom: "Noxin Cream",
    },
    {
      nom: "Ncp Cream",
    },
    {
      nom: "Nexsart 80 Tablet",
    },
    {
      nom: "Nusar-AM 5 Tablet",
    },
    {
      nom: "Nuvog-MD 0.3 Tablet",
    },
    {
      nom: "Nutraport 37.5mg Tablet",
    },
    {
      nom: "Nightmax 20 Tablet",
    },
    {
      nom: "Nigtel 40mg Tablet",
    },
    {
      nom: "Nexomep 40 Tablet",
    },
    {
      nom: "Nebipil-H Tablet",
    },
    {
      nom: "Nuplene-C Gel",
    },
    {
      nom: "Nicholas Ring-O-Rap Cream",
    },
    {
      nom: "O2 Tablet",
    },
    {
      nom: "Ovral L Tablet",
    },
    {
      nom: "Omnacortil 10 Tablet DT",
    },
    {
      nom: "Oflox OZ Tablet",
    },
    {
      nom: "Ondem -MD 4 Tablet",
    },
    {
      nom: "Omee Capsule",
    },
    {
      nom: "O2 M Oral Suspension",
    },
    {
      nom: "Oflox-D Eye Drop",
    },
    {
      nom: "Okacet Tablet",
    },
    {
      nom: "Oflox Eye/Ear Drop",
    },
    {
      nom: "Ondem 4 Tablet",
    },
    {
      nom: "Omnacortil Oral Solution",
    },
    {
      nom: "Omez Capsule",
    },
    {
      nom: "Oxra 10mg Tablet",
    },
    {
      nom: "Omez-Dsr Capsule",
    },
    {
      nom: "Oflokem D Eye/Ear Drops",
    },
    {
      nom: "Oflox 200 Tablet",
    },
    {
      nom: "Ovral G Tablet",
    },
    {
      nom: "Optineuron Injection",
    },
    {
      nom: "Ocupol DX Eye Ointment",
    },
    {
      nom: "Ondero 5mg Tablet",
    },
    {
      nom: "Ocupol Eye/Ear Drops",
    },
    {
      nom: "Ondem Syrup",
    },
    {
      nom: "Ornof Tablet",
    },
    {
      nom: "Onabet 2% Cream",
    },
    {
      nom: "Otogesic Ear Drop",
    },
    {
      nom: "Oflotas-OZ Tablet",
    },
    {
      nom: "Omnacortil 5 Tablet DT",
    },
    {
      nom: "Osteofos 70 Tablet",
    },
    {
      nom: "Ocurest AH Eye Drop",
    },
    {
      nom: "Otek-AC Neo Ear Drop",
    },
    {
      nom: "Optibex Tear Eye Drop",
    },
    {
      nom: "Optive Eye Drop",
    },
    {
      nom: "Ocurest Sterile Eye Drop",
    },
    {
      nom: "Odoxil 500mg Tablet",
    },
    {
      nom: "Okacet-L Tablet",
    },
    {
      nom: "Orcerin GM Tablet",
    },
    {
      nom: "Oleanz 2.5 Tablet",
    },
    {
      nom: "Ocupol DX Sterile Eye/Ear Drops",
    },
    {
      nom: "Oxetol 300 Tablet",
    },
    {
      nom: "Orcibest Tablet",
    },
    {
      nom: "Omnacortil 20 Tablet DT",
    },
    {
      nom: "Ocid 20 Capsule",
    },
    {
      nom: "Omee-D Capsule",
    },
    {
      nom: "Orni-O Tablet",
    },
    {
      nom: "Oncet-CF  Tablet",
    },
    {
      nom: "Odimont-LC Tablet",
    },
    {
      nom: "Orasep Gel",
    },
    {
      nom: "Omnacortil Forte Syrup",
    },
    {
      nom: "Oleanz 5 Tablet",
    },
    {
      nom: "Oncet 3D Tablet SR",
    },
    {
      nom: "Ondero Met 2.5mg/500mg Tablet",
    },
    {
      nom: "OFM 50/100 Suspension",
    },
    {
      nom: "Oflokem Eye/Ear Drops",
    },
    {
      nom: "O2H Tablet",
    },
    {
      nom: "Osil Capsule",
    },
    {
      nom: "Omnicef-O 200mg Tablet",
    },
    {
      nom: "Oflomac OZ Tablet",
    },
    {
      nom: "Oflomac 200 Tablet",
    },
    {
      nom: "Oxetol 150 Tablet",
    },
    {
      nom: "Oraways Oral Paste",
    },
    {
      nom: "Osil Cream",
    },
    {
      nom: "Oxramet XR 10mg/500mg Tablet",
    },
    {
      nom: "Ondem Injection",
    },
    {
      nom: "Opox 200mg Tablet",
    },
    {
      nom: "Orofer FCM 1K Injection",
    },
    {
      nom: "Olmezest 20 Tablet",
    },
    {
      nom: "Oratil 500 Tablet",
    },
    {
      nom: "Olmesar 20 Tablet",
    },
    {
      nom: "Ovuloc LD Tablet",
    },
    {
      nom: "Oleanz Plus Tablet",
    },
    {
      nom: "Onecan 150 Tablet",
    },
    {
      nom: "Oxipod 200mg Tablet",
    },
    {
      nom: "Olmezest 40 Tablet",
    },
    {
      nom: "Otocin-C Ear Drop",
    },
    {
      nom: "Onabet-B Cream",
    },
    {
      nom: "Orthodex MR Tablet",
    },
    {
      nom: "Olimelt 5  Tablet MD",
    },
    {
      nom: "Okacet Cold Tablet",
    },
    {
      nom: "Olopat OD Eye Drops",
    },
    {
      nom: "Omnacortil Oral Drops",
    },
    {
      nom: "Ora-Fast Gel",
    },
    {
      nom: "Olimelt 2.5 Tablet MD",
    },
    {
      nom: "Okamet 500 Tablet",
    },
    {
      nom: "Oosure-M Tablet",
    },
    {
      nom: "Oratil CV 500 Tablet",
    },
    {
      nom: "Opox CV 200 Tablet",
    },
    {
      nom: "Olimab 60mg Injection",
    },
    {
      nom: "Oflox 100 Rediuse Oral Suspension",
    },
    {
      nom: "Oxra 5mg Tablet",
    },
    {
      nom: "Omnix 100 Dry Syrup Strawberry",
    },
    {
      nom: "Odimont-FX Tablet",
    },
    {
      nom: "Oxerute CD 500mg/500mg Tablet",
    },
    {
      nom: "Oleanz 10 Tablet",
    },
    {
      nom: "Onabet SD Solution",
    },
    {
      nom: "Omnix 200 DT Tablet",
    },
    {
      nom: "Olox-OZ Tablet",
    },
    {
      nom: "Oflox TZ Tablet",
    },
    {
      nom: "Onabet Lotion",
    },
    {
      nom: "Ocabile 10 Tablet",
    },
    {
      nom: "Oxramet XR 10mg/1000mg Tablet",
    },
    {
      nom: "Omnacortil 40 Tablet DT",
    },
    {
      nom: "Ozomet-PG 2 Tablet ER",
    },
    {
      nom: "Otocin D Eye/Ear Drops",
    },
    {
      nom: "Ozomet-VG2 Tablet SR",
    },
    {
      nom: "O2 Derm Cream",
    },
    {
      nom: "Omez Insta Sachet Mint",
    },
    {
      nom: "Optisoft Eye Drop",
    },
    {
      nom: "Oflokem 200mg Tablet",
    },
    {
      nom: "Omee Mps Oral Suspension Mint",
    },
    {
      nom: "Octride 0.1mg Injection",
    },
    {
      nom: "Ordent Tablet",
    },
    {
      nom: "Oflox 400 Tablet",
    },
    {
      nom: "Ovigyn D 3 Tablet SR",
    },
    {
      nom: "Orcerin Capsule",
    },
    {
      nom: "Ovuloc Tablet",
    },
    {
      nom: "Odimont-AL Tablet",
    },
    {
      nom: "Obimet SR Tablet",
    },
    {
      nom: "O-Stat 120 Capsule",
    },
    {
      nom: "Osteofos 35 Tablet",
    },
    {
      nom: "Opiprol 50 Tablet",
    },
    {
      nom: "Ocuflur Eye Drop",
    },
    {
      nom: "Ontears Eye Drop",
    },
    {
      nom: "Ofron Eye/Ear Drops",
    },
    {
      nom: "Oxipod 100 Oral Suspension",
    },
    {
      nom: "Olmesar 40 Tablet",
    },
    {
      nom: "Oxipod 50mg Dry Syrup",
    },
    {
      nom: "Ozovas-F  Tablet",
    },
    {
      nom: "Olmezest Beta 25 Tablet ER",
    },
    {
      nom: "Oxerute Cream",
    },
    {
      nom: "Oxyspas 2.5 Tablet",
    },
    {
      nom: "Oxetol 450 Tablet",
    },
    {
      nom: "Onitraz -Forte Capsule",
    },
    {
      nom: "Olmetime 20 Tablet",
    },
    {
      nom: "Oxipod-CV Tablet",
    },
    {
      nom: "Olimelt 10 Tablet MD",
    },
    {
      nom: "Oricitral Syrup Lemon",
    },
    {
      nom: "Oframax Forte 1.5g Injection",
    },
    {
      nom: "OFM-DS Suspension",
    },
    {
      nom: "Olmezest AM Tablet",
    },
    {
      nom: "Oxalgin-DP Tablet",
    },
    {
      nom: "Omniclav 625 Tablet",
    },
    {
      nom: "Optimoist Eye Drop",
    },
    {
      nom: "Onitraz Capsule",
    },
    {
      nom: "Osicare-DS Tablet",
    },
    {
      nom: "Obra Eye Drops",
    },
    {
      nom: "Oson O Tablet",
    },
    {
      nom: "Odoxil 250 DT Tablet",
    },
    {
      nom: "Omnacortil 30 Tablet DT",
    },
    {
      nom: "Oxcarb 300 Tablet",
    },
    {
      nom: "Oflomac Forte Oral Solution",
    },
    {
      nom: "Osteri 750mcg Solution for Injection",
    },
    {
      nom: "Obra Eye Ointment",
    },
    {
      nom: "Oratil 250mg Tablet",
    },
    {
      nom: "Ocuvir 400 DT Tablet",
    },
    {
      nom: "Olanex F Tablet",
    },
    {
      nom: "Ocabile 5 Tablet",
    },
    {
      nom: "Oraflora Oral Gel",
    },
    {
      nom: "Osmodrops Eye Drop",
    },
    {
      nom: "Opticool Eye Drop",
    },
    {
      nom: "Olmezest H 40 Tablet",
    },
    {
      nom: "Olkem  20 Tablet",
    },
    {
      nom: "Omesec 20 Capsule",
    },
    {
      nom: "Oraxin Syrup",
    },
    {
      nom: "Ovipauz L Tablet",
    },
    {
      nom: "Olmesar A Tablet",
    },
    {
      nom: "Olfi Pod Tablet",
    },
    {
      nom: "Olmezest Beta 50 Tablet ER",
    },
    {
      nom: "Oflomac Oral Solution",
    },
    {
      nom: "Oliza 2.5 Tablet",
    },
    {
      nom: "Ocuvir 800 DT Tablet",
    },
    {
      nom: "Ostospray",
    },
    {
      nom: "Oxramet 5mg/1000mg Tablet IR",
    },
    {
      nom: "Olmezest AM 40 Tablet",
    },
    {
      nom: "Otodac-DX Ear Drop",
    },
    {
      nom: "Olymprix M 500 Tablet ER",
    },
    {
      nom: "Ocid QRS 20 Tablet",
    },
    {
      nom: "Olmesar A 40 Tablet",
    },
    {
      nom: "Olmin 20 Tablet",
    },
    {
      nom: "Olmin Trio 40 Tablet",
    },
    {
      nom: "Oliza 5 Tablet",
    },
    {
      nom: "Onabet Max Cream",
    },
    {
      nom: "Ovafem Plus Tablet",
    },
    {
      nom: "Olmesar H 40 Tablet",
    },
    {
      nom: "Osicare Plus Tablet",
    },
    {
      nom: "Oflokem OZ Tablet",
    },
    {
      nom: "Olmesar  H Tablet",
    },
    {
      nom: "Olmezest CH 40 Tablet",
    },
    {
      nom: "Oxetol 600 Tablet",
    },
    {
      nom: "OF 200 Tablet",
    },
    {
      nom: "Omnix 50 Dry Syrup",
    },
    {
      nom: "Ondero Met 2.5mg/1000mg Tablet",
    },
    {
      nom: "Ocid-D Capsule",
    },
    {
      nom: "Ovaa Shield DS Combipack",
    },
    {
      nom: "Ozotel-H Tablet",
    },
    {
      nom: "Ondem 8 Tablet",
    },
    {
      nom: "Olmetime 40 Tablet",
    },
    {
      nom: "Olkem Trio 40 Tablet",
    },
    {
      nom: "Odepraz D 30mg/40mg Capsule SR",
    },
    {
      nom: "Oxetol XR 300 Tablet",
    },
    {
      nom: "Oflox 50 Rediuse",
    },
    {
      nom: "O-Stat 60 Capsule",
    },
    {
      nom: "Orasep OT Mouth Paint",
    },
    {
      nom: "Onco Bcg 40mg Injection",
    },
    {
      nom: "Olmezest 10 Tablet",
    },
    {
      nom: "Olife-M Oral Suspension",
    },
    {
      nom: "Ozomet-PG 1 Tablet",
    },
    {
      nom: "Orthocort 6 Tablet",
    },
    {
      nom: "Ozotel-AM Tablet",
    },
    {
      nom: "Oxcq 200 Tablet",
    },
    {
      nom: "Olmin Trio Tablet",
    },
    {
      nom: "Ofron 200mg Tablet",
    },
    {
      nom: "Orkid 4 Plus Cream",
    },
    {
      nom: "Olmighty 20 Tablet",
    },
    {
      nom: "Ovitrelle Solution for Injection",
    },
    {
      nom: "Ovalife Met Tablet",
    },
    {
      nom: "Otski Injection",
    },
    {
      nom: "Olkem Trio 6.25 Tablet",
    },
    {
      nom: "Olmezest H 20 Tablet",
    },
    {
      nom: "Olmat 40 Tablet",
    },
    {
      nom: "Otodac-CL Ear Drop",
    },
    {
      nom: "Omnix CV Tablet",
    },
    {
      nom: "Onoff OZ 200mg/500mg Tablet",
    },
    {
      nom: "Olmetime-AM 20 Tablet",
    },
    {
      nom: "Oxcarb 150 Tablet",
    },
    {
      nom: "Onabet 2% Cream",
    },
    {
      nom: "Onglyza 5mg Tablet",
    },
    {
      nom: "Orahex Pro Mouth Wash Mint",
    },
    {
      nom: "Ozotel-AMH Tablet",
    },
    {
      nom: "Oxicojen Cream",
    },
    {
      nom: "Ovanac-DSR Tablet",
    },
    {
      nom: "Ocuvir Skin Cream",
    },
    {
      nom: "Olkem  40 Tablet",
    },
    {
      nom: "Ocid L Capsule PR",
    },
    {
      nom: "Optihist Eye Drop",
    },
    {
      nom: "Oncotrex 7.5 Tablet",
    },
    {
      nom: "Ozomet-VG 1 Tablet SR",
    },
    {
      nom: "Olmetime-AM 40 Tablet",
    },
    {
      nom: "Olkem Trio 12.5 Tablet",
    },
    {
      nom: "Ostovit DM  Tablet",
    },
    {
      nom: "Orogard Mouth Paint",
    },
    {
      nom: "Omesec-RD Capsule",
    },
    {
      nom: "Oraflora LA Gel",
    },
    {
      nom: "Orvas-FT Tablet",
    },
    {
      nom: "Odepraz 40mg Tablet",
    },
    {
      nom: "Olsar 20 Tablet",
    },
    {
      nom: "Olymprix Tablet",
    },
    {
      nom: "Olymprix M 500 Tablet PR",
    },
    {
      nom: "Oflomac 400 Tablet",
    },
    {
      nom: "Olox 200mg Tablet",
    },
    {
      nom: "Olmetime-AMH 20 Tablet",
    },
    {
      nom: "Olmy 20 Tablet",
    },
    {
      nom: "Omnacortil 2.5 Tablet DT",
    },
    {
      nom: "Odimont-LC Syrup",
    },
    {
      nom: "Oabf 25mg Tablet",
    },
    {
      nom: "Orthosenz Ointment",
    },
    {
      nom: "Olan 5 Tablet",
    },
    {
      nom: "Orex Cream",
    },
    {
      nom: "Odimont 10 Tablet",
    },
    {
      nom: "Olmetime-H 40 Tablet",
    },
    {
      nom: "Ontears Gel Drops",
    },
    {
      nom: "Optimoist-DS Lubricant Eye Drop",
    },
    {
      nom: "Omiflux Capsule",
    },
    {
      nom: "Optithrocin Eye Ointment",
    },
    {
      nom: "Olmezest CH 20 Tablet",
    },
    {
      nom: "Obimet SR 1gm Tablet",
    },
    {
      nom: "Ozomet-G1 Tablet PR",
    },
    {
      nom: "Ornilox Tablet",
    },
    {
      nom: "Orogard SG Gel",
    },
    {
      nom: "Obimet Tablet",
    },
    {
      nom: "Oxybro Plus Tablet SR",
    },
    {
      nom: "Onecan 400 Tablet",
    },
    {
      nom: "Ontears Unit dose Eye Drop (0.4ml Each)",
    },
    {
      nom: "Olmighty 40 Tablet",
    },
    {
      nom: "Oleanz Forte Tablet",
    },
    {
      nom: "Ocuvir SR 1.2gm Tablet",
    },
    {
      nom: "Olmetime-AMH 40 Tablet",
    },
    {
      nom: "Olmesar 10 Tablet",
    },
    {
      nom: "Ondero Met 850mg/2.5mg Tablet",
    },
    {
      nom: "Oslax Laxative Oral Solution",
    },
    {
      nom: "Oliza 10 Tablet",
    },
    {
      nom: "Olmat-H Tablet",
    },
    {
      nom: "Obimet GX2 Tablet PR",
    },
    {
      nom: "Omecip Capsule",
    },
    {
      nom: "Omefol Capsule",
    },
    {
      nom: "Ostogard Gm Tablet",
    },
    {
      nom: "Oxicojen Lotion",
    },
    {
      nom: "Olmat 40 AMH Tablet",
    },
    {
      nom: "Oflomac TZ 200 mg/600 mg Tablet",
    },
    {
      nom: "Oflomac Oral Solution",
    },
    {
      nom: "Orex-LO Gel",
    },
    {
      nom: "Olsertain 20 Tablet",
    },
    {
      nom: "Olmat 20 AM Tablet",
    },
    {
      nom: "Oleanz RT 5 Tablet",
    },
    {
      nom: "Oraxin Drop",
    },
    {
      nom: "Oleanz 7.5 Tablet",
    },
    {
      nom: "Olmetime-H 20 Tablet",
    },
    {
      nom: "Omnikacin 500 Injection",
    },
    {
      nom: "Olay 2.5 Tablet",
    },
    {
      nom: "Olmin 40 Tablet",
    },
    {
      nom: "Olmetime-CT 40 Tablet",
    },
    {
      nom: "Optiqmega Capsule",
    },
    {
      nom: "Obra F  Eye Drop",
    },
    {
      nom: "Oleptal DT 300 Tablet",
    },
    {
      nom: "Onecan Dusting Powder",
    },
    {
      nom: "Okacet Cold Total Tablet",
    },
    {
      nom: "Olvance 20 Tablet",
    },
    {
      nom: "Oxetol XR 450 Tablet",
    },
    {
      nom: "Optidoz Tablet",
    },
    {
      nom: "Olmighty AM Tablet",
    },
    {
      nom: "Ocucin Eye Drop",
    },
    {
      nom: "Oriel Tablet",
    },
    {
      nom: "Opox CV 50mg/31.25mg Dry Syrup",
    },
    {
      nom: "Ozovas 20 Tablet",
    },
    {
      nom: "Olan 10 Tablet",
    },
    {
      nom: "Onimex SF 30mg/200mg Syrup Sugar Free",
    },
    {
      nom: "Olsar 40 Tablet",
    },
    {
      nom: "Olkem 20 CT Tablet",
    },
    {
      nom: "Oncotrex 5 Tablet",
    },
    {
      nom: "Olay 5 Tablet",
    },
    {
      nom: "Orlean 120 Capsule",
    },
    {
      nom: "Olmin 10 Tablet",
    },
    {
      nom: "Olmat 40 H Tablet",
    },
    {
      nom: "Olsertain 40 Tablet",
    },
    {
      nom: "Osolac Oral Solution",
    },
    {
      nom: "Orlica Capsule",
    },
    {
      nom: "Oxetol XR 150 Tablet",
    },
    {
      nom: "Oloplus Eye Drop",
    },
    {
      nom: "Olmighty 40H Tablet",
    },
    {
      nom: "Olmark 20 Tablet",
    },
    {
      nom: "Olotop DS Eye Drop",
    },
    {
      nom: "Olmin 20-CH Tablet",
    },
    {
      nom: "Octamop Lotion",
    },
    {
      nom: "Obrin F Eye Drop",
    },
    {
      nom: "Olay Plus Tablet",
    },
    {
      nom: "Oro-CV 625 Tablet",
    },
    {
      nom: "Oxcarb 450 Tablet",
    },
    {
      nom: "Olkem-Beta 25 Tablet",
    },
    {
      nom: "O Cebran OZ Tablet",
    },
    {
      nom: "Omez 10 Capsule",
    },
    {
      nom: "Olmy 40 Tablet",
    },
    {
      nom: "Olkem 40 CT Tablet",
    },
    {
      nom: "Omnitan H Tablet",
    },
    {
      nom: "Olmin 40-CH Tablet",
    },
    {
      nom: "OLO 1 Eye Drop",
    },
    {
      nom: "Oxetol Suspension",
    },
    {
      nom: "Ovalink Tablet SR",
    },
    {
      nom: "Olkem-Beta 50 Tablet ER",
    },
    {
      nom: "Olmat 40 CT Tablet",
    },
    {
      nom: "Obezita 120mg Capsule",
    },
    {
      nom: "Olmetor 20 Tablet",
    },
    {
      nom: "Olmat 20 AMH Tablet",
    },
    {
      nom: "Ostium K2 Kit",
    },
    {
      nom: "Olimelt 7.5 Tablet MD",
    },
    {
      nom: "Oline 2.5mg Tablet",
    },
    {
      nom: "Olmy-D 20 Tablet SR",
    },
    {
      nom: "Oflo Ophthalmic Solution",
    },
    {
      nom: "Olymprix M 1000 Tablet PR",
    },
    {
      nom: "Olmat 40 AM Tablet",
    },
    {
      nom: "Orthocort 12 Tablet",
    },
    {
      nom: "Oxcq 300 Tablet",
    },
    {
      nom: "Olsertain-H 40 Tablet",
    },
    {
      nom: "Olvance 40 Tablet",
    },
    {
      nom: "Olkem 20 AM Tablet",
    },
    {
      nom: "Optimoz-Plus Tablet",
    },
    {
      nom: "Olmighty 20 H Tablet",
    },
    {
      nom: "Olanex 5 Tablet",
    },
    {
      nom: "Orlean 60 Capsule",
    },
    {
      nom: "Olopine Eye Drops",
    },
    {
      nom: "Olmy-D 40 Tablet SR",
    },
    {
      nom: "Octamop Tablet",
    },
    {
      nom: "Orvas 10 Tablet",
    },
    {
      nom: "Olmetime-CT 20 Tablet",
    },
    {
      nom: "Oxetol XR 600 Tablet",
    },
    {
      nom: "Olsar-A 20 Tablet",
    },
    {
      nom: "Olkem 40 AM Tablet",
    },
    {
      nom: "Ovidine 5% Ointment",
    },
    {
      nom: "Olimelt 15 Tablet",
    },
    {
      nom: "Osmolube HY Eye Drop",
    },
    {
      nom: "Onecan 50mg Tablet",
    },
    {
      nom: "Olmark 40 Tablet",
    },
    {
      nom: "Opiprime 50 Tablet",
    },
    {
      nom: "Obelit Capsule",
    },
    {
      nom: "Omnitan 50 Tablet",
    },
    {
      nom: "Ovanac-Plus Tablet",
    },
    {
      nom: "Olmy 10 Tablet",
    },
    {
      nom: "Opsutan Tablet",
    },
    {
      nom: "Olmat MT 25 Tablet ER",
    },
    {
      nom: "Osmitol Syrup",
    },
    {
      nom: "Olvan Trio 40 Tablet",
    },
    {
      nom: "Olmo 20 Tablet",
    },
    {
      nom: "Ocuvir 200 DT Tablet",
    },
    {
      nom: "Ornoderm RF Cream",
    },
    {
      nom: "Oleptal OD 300 Tablet SR",
    },
    {
      nom: "Oxybuta Tablet",
    },
    {
      nom: "Osmolube-DS Eye Drop",
    },
    {
      nom: "Olagress MD 5 Tablet",
    },
    {
      nom: "Ovafuze Tablet",
    },
    {
      nom: "Olmetor 40 Tablet",
    },
    {
      nom: "Olimelt 20 Tablet",
    },
    {
      nom: "Oliza Injection",
    },
    {
      nom: "Oleanz RT 15 Tablet",
    },
    {
      nom: "Oxana Eye Drop",
    },
    {
      nom: "Oleanz RT 20 Tablet DT",
    },
    {
      nom: "Ovanac  Tablet",
    },
    {
      nom: "Ovagen 50mg Tablet",
    },
    {
      nom: "Olmin 20-A Tablet",
    },
    {
      nom: "Oestrogel",
    },
    {
      nom: "Oxuba OD Tablet SR",
    },
    {
      nom: "Olsar-H 20 Tablet",
    },
    {
      nom: "Office 100 mg/100 mg Tablet",
    },
    {
      nom: "Oleanz RT 10 Disintegrating Tablet",
    },
    {
      nom: "Olkem 40 H Tablet",
    },
    {
      nom: "Ondy-MD Tablet",
    },
    {
      nom: "Olmin 20 LN Tablet",
    },
    {
      nom: "Opiprol 100 Tablet",
    },
    {
      nom: "Optogest 200 Tablet",
    },
    {
      nom: "Olmark A Tablet",
    },
    {
      nom: "Otonorm Ear Drop",
    },
    {
      nom: "Omeflox Eye Ointment",
    },
    {
      nom: "Oriel-M Tablet",
    },
    {
      nom: "Olmin 20-H Tablet",
    },
    {
      nom: "Olet 5 Tablet MD",
    },
    {
      nom: "Oflomac 100 Tablet",
    },
    {
      nom: "Olmin 40 LN Tablet",
    },
    {
      nom: "Orkid-L Cream",
    },
    {
      nom: "Obezita 60 Capsule",
    },
    {
      nom: "Olmecip 20 Tablet",
    },
    {
      nom: "Olmax 20 Tablet",
    },
    {
      nom: "Olmetrack 20 Tablet",
    },
    {
      nom: "Odoxil 125mg Suspension",
    },
    {
      nom: "Orvas-EZ Tablet",
    },
    {
      nom: "Olsar 10 Tablet",
    },
    {
      nom: "Olsar-H 40 Tablet",
    },
    {
      nom: "Olsar-M 25 Tablet ER",
    },
    {
      nom: "Oxitres Tablet",
    },
    {
      nom: "Olsar-M 50 Tablet ER",
    },
    {
      nom: "Ozapin -MD 10 Tablet",
    },
    {
      nom: "Oriel 10 Tablet",
    },
    {
      nom: "Oxepin 150mg Tablet",
    },
    {
      nom: "Omen 20 Tablet",
    },
    {
      nom: "Olmeblu 40 Tablet",
    },
    {
      nom: "Oloket Ophthalmic Solution",
    },
    {
      nom: "Olsar-A 40 Tablet",
    },
    {
      nom: "Oxmazetol 300 Tablet",
    },
    {
      nom: "Omez FF 20 Tablet",
    },
    {
      nom: "Olmeblu-H 20 Tablet",
    },
    {
      nom: "Ovares Soft Gelatin Capsule",
    },
    {
      nom: "Olkem 20H Tablet",
    },
    {
      nom: "Omnipres AM Tablet",
    },
    {
      nom: "Ozomet V 500mg/0.3mg Tablet",
    },
    {
      nom: "Ocusoothe Duo Eye Drop",
    },
    {
      nom: "Olmy-A Tablet",
    },
    {
      nom: "Optiflox Eye Drop",
    },
    {
      nom: "Oralixir Mouth Wash",
    },
    {
      nom: "Oxecaine Oral Gel Mint",
    },
    {
      nom: "Oleptal DT 450 Tablet",
    },
    {
      nom: "Olvance M 50 Tablet",
    },
    {
      nom: "Olmat MT 50 Tablet ER",
    },
    {
      nom: "Olmetrack AM Tablet",
    },
    {
      nom: "Oxicojen Cream",
    },
    {
      nom: "Oxcq 400 Tablet",
    },
    {
      nom: "Olsertain-H -20 Tablet",
    },
    {
      nom: "Olmy-H Tablet",
    },
    {
      nom: "Oloblu 0.1% Eye Drop",
    },
    {
      nom: "Olzic 2.5mg Tablet",
    },
    {
      nom: "Ocona-Z Lotion",
    },
    {
      nom: "Odicon 150 Tablet",
    },
    {
      nom: "Obelit 60 Capsule",
    },
    {
      nom: "Olmetrack CT 6.25 Tablet",
    },
    {
      nom: "Oxring 300mg Tablet",
    },
    {
      nom: "Olmetor-H Tablet",
    },
    {
      nom: "Ovanac-CC Tablet",
    },
    {
      nom: "Omen CT Tablet",
    },
    {
      nom: "Odicon- K Lotion",
    },
    {
      nom: "Olmax 40 Tablet",
    },
    {
      nom: "Optihist AZ Eye Drop",
    },
    {
      nom: "Oleptal OD 450 Tablet SR",
    },
    {
      nom: "Oleptal OD 600 Tablet SR",
    },
    {
      nom: "Olmetrack 40 Tablet",
    },
    {
      nom: "Opara Tablet",
    },
    {
      nom: "Olmetor AM 40 Tablet",
    },
    {
      nom: "Omen CT 40 Tablet",
    },
    {
      nom: "Ometab 20mg Tablet DR",
    },
    {
      nom: "Olvance H 40 Tablet",
    },
    {
      nom: "Olmark-H Tablet",
    },
    {
      nom: "Olsertain-CT 40 Tablet",
    },
    {
      nom: "Olmark A 40 Tablet",
    },
    {
      nom: "Oliramp 2.5 Tablet MD",
    },
    {
      nom: "Olmy-H 40 Tablet",
    },
    {
      nom: "Oxuba Capsule",
    },
    {
      nom: "Olmark 10 Tablet",
    },
    {
      nom: "Olmetrack CT 40/12.5 Tablet",
    },
    {
      nom: "Olmo AM 20mg/5mg Tablet",
    },
    {
      nom: "Orvas 5 Tablet",
    },
    {
      nom: "Oleptal OD 150 Tablet SR",
    },
    {
      nom: "Oxidoben Gel",
    },
    {
      nom: "Ocona  Soap",
    },
    {
      nom: "Olmetrack H Tablet",
    },
    {
      nom: "Ozolol 50mg Tablet XL",
    },
    {
      nom: "Olmetor-H 40 Tablet",
    },
    {
      nom: "Oxcarb 600 Tablet",
    },
    {
      nom: "Odirab 20mg Tablet",
    },
    {
      nom: "Obimet GX 0.5mg/500mg Tablet PR",
    },
    {
      nom: "Onglyza 2.5mg Tablet",
    },
    {
      nom: "Optogest 300 SR Tablet",
    },
    {
      nom: "Oxeltra 300 Tablet",
    },
    {
      nom: "Osteocerin Tablet",
    },
    {
      nom: "Olmark CT 40 Tablet",
    },
    {
      nom: "Olanex 10 Tablet",
    },
    {
      nom: "Olmax-AM Tablet",
    },
    {
      nom: "Olmetrack CT 12.5 Tablet",
    },
    {
      nom: "Obimet V  0.3 Tablet PR",
    },
    {
      nom: "Obsace -ER 50mg Tablet",
    },
    {
      nom: "Osule 25mg Tablet",
    },
    {
      nom: "Oxoneg Injection",
    },
    {
      nom: "Olmark-AH Tablet",
    },
    {
      nom: "Oflokem 2mg Infusion",
    },
    {
      nom: "Oleptal 600 Tablet",
    },
    {
      nom: "Olsivir Capsule",
    },
    {
      nom: "Obstela 10 Tablet",
    },
    {
      nom: "Olvance H 20 Tablet",
    },
    {
      nom: "Oflo Eye Ointment",
    },
    {
      nom: "Olsertain-CT 20 Tablet",
    },
    {
      nom: "Olvance-AM 20 Tablet",
    },
    {
      nom: "Olmecip AM Tablet",
    },
    {
      nom: "Olmax 40-AM Tablet",
    },
    {
      nom: "Obenow 10mg Tablet",
    },
    {
      nom: "Olvance-CT 40 Tablet",
    },
    {
      nom: "Olvas-AM Tablet",
    },
    {
      nom: "Olzic 5 Tablet",
    },
    {
      nom: "Olsar CH 20mg/6.25mg Tablet",
    },
    {
      nom: "Ocdox 100mg Tablet",
    },
    {
      nom: "Olmo M 20mg/25mg Tablet",
    },
    {
      nom: "Obsace-ER 100mg Tablet",
    },
    {
      nom: "Orlica 60 Capsule",
    },
    {
      nom: "Osiris Tablet",
    },
    {
      nom: "Olmax-3D 20 Tablet",
    },
    {
      nom: "Olbet 40 Tablet",
    },
    {
      nom: "Ondot Tablet",
    },
    {
      nom: "Oleptal OD 900 Tablet SR",
    },
    {
      nom: "Olmark CT 20 Tablet",
    },
    {
      nom: "Omnipres CH Tablet",
    },
    {
      nom: "Olzox 40 Tablet",
    },
    {
      nom: "Olmewon Plus 40 Tablet",
    },
    {
      nom: "Olmecip 40 Tablet",
    },
    {
      nom: "Okacid D Capsule",
    },
    {
      nom: "Olvance-CT 20 Tablet",
    },
    {
      nom: "Opacia Eye Drop",
    },
    {
      nom: "Olinstab 10mg Tablet",
    },
    {
      nom: "Oraface-Bpo Gel",
    },
    {
      nom: "Olmecip H Tablet",
    },
    {
      nom: "Orlip X 120mg Capsule",
    },
    {
      nom: "Osteoace-SP Tablet",
    },
    {
      nom: "Olmewon Plus 20 mg Tablet",
    },
    {
      nom: "Oxyfag-A Oral Suspension Sugar Free",
    },
    {
      nom: "Olsar-AH Tablet",
    },
    {
      nom: "Olmesafe 40 Tablet",
    },
    {
      nom: "Occetiz 5 Tablet",
    },
    {
      nom: "Olzic 10mg Tablet",
    },
    {
      nom: "Olvas 20 Tablet",
    },
    {
      nom: "Olmesafe H 20/12.5 Tablet",
    },
    {
      nom: "Olworm 400mg Tablet",
    },
    {
      nom: "Olmax-H Tablet",
    },
    {
      nom: "Oxmazetol 600 Tablet",
    },
    {
      nom: "Oxmazetol 450 Tablet",
    },
    {
      nom: "Opiprime 100 Tablet",
    },
    {
      nom: "Olmark-H Tablet",
    },
    {
      nom: "Oldid-V Vaginal gel",
    },
    {
      nom: "Orpa Nasal Spray",
    },
    {
      nom: "Obfree 120mg Capsule",
    },
    {
      nom: "Oropraz 40 Tablet",
    },
    {
      nom: "Onoff 400mg Tablet",
    },
    {
      nom: "Oxring OD 300 Tablet SR",
    },
    {
      nom: "Ornihex Mouth Gel",
    },
    {
      nom: "Oxafine Capsule",
    },
    {
      nom: "Oncostrol 160 Tablet",
    },
    {
      nom: "Ovapro-M Tablet",
    },
    {
      nom: "Olmecip H 40 Tablet",
    },
    {
      nom: "Onslim Capsule",
    },
    {
      nom: "Ozapin-MD 7.5 Tablet",
    },
    {
      nom: "Onbrez 150mcg Breezhaler",
    },
    {
      nom: "Omezax-D Capsule",
    },
    {
      nom: "Optilac Eye Drop",
    },
    {
      nom: "Olmesar  H Tablet",
    },
    {
      nom: "Oraeze Mouth Wash Mint",
    },
    {
      nom: "Oraeze Mouth Wash Mint",
    },
    {
      nom: "Omidec-ES Capsule SR",
    },
    {
      nom: "Olmetor M 25 Tablet",
    },
    {
      nom: "Optimol 650mg Tablet",
    },
    {
      nom: "O Glimaday 2 Tablet PR",
    },
    {
      nom: "Oldid Mouth Paint",
    },
    {
      nom: "Ola 15 Tablet",
    },
    {
      nom: "Onbrez 300mcg Breezhaler",
    },
    {
      nom: "Onenac SP 100mg/325mg/10mg Tablet",
    },
    {
      nom: "Osozap Plus Tablet",
    },
    {
      nom: "Osozap Plus Tablet",
    },
    {
      nom: "Oxeogaba 750mcg/75mg Capsule",
    },
    {
      nom: "Oxeogaba 750mcg/75mg Capsule",
    },
    {
      nom: "Pamorelin LA 3.75mg Injection",
    },
    {
      nom: "Perjeta 420mg Injection",
    },
    {
      nom: "Prevenar 13 Vaccine",
    },
    {
      nom: "Primolut-N Tablet",
    },
    {
      nom: "PAN 40 Tablet",
    },
    {
      nom: "Pan-D Capsule PR",
    },
    {
      nom: "Pyrimon-DF Eye drop",
    },
    {
      nom: "Pantocid DSR Capsule",
    },
    {
      nom: "Pantop-D SR Capsule",
    },
    {
      nom: "Pantop 40 Tablet",
    },
    {
      nom: "Power Vegra 100mg Tablet",
    },
    {
      nom: "Pregalin 75 Capsule",
    },
    {
      nom: "Perinorm Tablet",
    },
    {
      nom: "Pantocid Tablet",
    },
    {
      nom: "Pantosec D SR Capsule",
    },
    {
      nom: "Prolomet XL 25 Tablet",
    },
    {
      nom: "Pacitane Tablet",
    },
    {
      nom: "Pause 500 Tablet",
    },
    {
      nom: "Pantop-D Capsule",
    },
    {
      nom: "Pregaba-M 75 Capsule",
    },
    {
      nom: "Pruvict 2 Tablet",
    },
    {
      nom: "Placentrex Injection",
    },
    {
      nom: "Pentids 400 Tablet",
    },
    {
      nom: "Pregaba NT 75 mg/10 mg Tablet",
    },
    {
      nom: "Phlogam Tablet",
    },
    {
      nom: "Pregabid NT Tablet",
    },
    {
      nom: "Placentrex Gel",
    },
    {
      nom: "Proluton Depot 500mg/2ml Injection",
    },
    {
      nom: "Pankreoflat 170mg/80mg Tablet",
    },
    {
      nom: "Piriton CS Syrup",
    },
    {
      nom: "Progynova 2mg Tablet",
    },
    {
      nom: "Practin 4mg Tablet",
    },
    {
      nom: "Pipzo 4.5gm Injection",
    },
    {
      nom: "Prothiaden Tablet",
    },
    {
      nom: "Perinorm Injection",
    },
    {
      nom: "Predmet 4 Tablet",
    },
    {
      nom: "Pause-MF Tablet",
    },
    {
      nom: "Pyridium 200 Tablet",
    },
    {
      nom: "Pantosec Tablet",
    },
    {
      nom: "Prolomet XL 50 Tablet",
    },
    {
      nom: "Paracip 500 Tablet",
    },
    {
      nom: "Pantakind Tablet",
    },
    {
      nom: "Prazopress XL 5 Tablet",
    },
    {
      nom: "Prostagard-D8 Capsule",
    },
    {
      nom: "Pantop Injection",
    },
    {
      nom: "Pari CR 12.5 Tablet",
    },
    {
      nom: "Propysalic NF Ointment",
    },
    {
      nom: "Panderm + + Cream",
    },
    {
      nom: "Pregalin M 75 Capsule",
    },
    {
      nom: "Pregacip M Capsule",
    },
    {
      nom: "Pyrigesic 1000 Tablet",
    },
    {
      nom: "Pantakind-DSR Capsule",
    },
    {
      nom: "Pilorute Cream",
    },
    {
      nom: "Piptaz 4.5gm Injection",
    },
    {
      nom: "Phexin 500mg Capsule",
    },
    {
      nom: "Pan Mps Oral Suspension Mint Sugar Free",
    },
    {
      nom: "P 650 Tablet",
    },
    {
      nom: "Paraxin 500 Capsule",
    },
    {
      nom: "Pruvict 1 Tablet",
    },
    {
      nom: "Pulmoclear  Syrup",
    },
    {
      nom: "Premarin Vaginal Cream",
    },
    {
      nom: "Penidure LA 12 Injection",
    },
    {
      nom: "Pacimol MF Oral Suspension",
    },
    {
      nom: "Proctosedyl BD Cream",
    },
    {
      nom: "Pulmocef 500 Tablet",
    },
    {
      nom: "Pantosec-D Tablet",
    },
    {
      nom: "Pantodac 40 Tablet",
    },
    {
      nom: "Pioz 15 Tablet",
    },
    {
      nom: "Pantocid L  Capsule SR",
    },
    {
      nom: "Parit Tablet",
    },
    {
      nom: "Persol  AC 2.5 Gel",
    },
    {
      nom: "Pantodac DSR Capsule",
    },
    {
      nom: "Pirox DT Tablet",
    },
    {
      nom: "Paxidep CR 12.5 Tablet",
    },
    {
      nom: "Pred Forte Ophthalmic Suspension",
    },
    {
      nom: "Pantocid IT Capsule SR",
    },
    {
      nom: "Proxym ER Tablet",
    },
    {
      nom: "Pramipex 0.25 Tablet",
    },
    {
      nom: "Pacimol Active Tablet",
    },
    {
      nom: "Pregabanyl NTM Tablet",
    },
    {
      nom: "Prevent N 5mg Tablet",
    },
    {
      nom: "Penegra 100 Tablet",
    },
    {
      nom: "Pylokit Kit",
    },
    {
      nom: "Podowart Paint",
    },
    {
      nom: "Predmet 16 Tablet",
    },
    {
      nom: "Pneumovax 23 Vaccine",
    },
    {
      nom: "Paramet Tablet",
    },
    {
      nom: "PAN IV Injection",
    },
    {
      nom: "Pruease 2mg Tablet",
    },
    {
      nom: "Pantocid HP Combipack",
    },
    {
      nom: "Practin Syrup",
    },
    {
      nom: "Pentanerv-NT Tablet",
    },
    {
      nom: "Propysalic NF6 Ointment",
    },
    {
      nom: "Prolomet AM 50 Tablet PR",
    },
    {
      nom: "Polaramine 2mg Tablet",
    },
    {
      nom: "Prostagard 8 Capsule",
    },
    {
      nom: "Planep Tablet",
    },
    {
      nom: "Pregnidoxin NU 10mg Tablet",
    },
    {
      nom: "Pregalin NT 75mg/10mg Tablet",
    },
    {
      nom: "Piclin Oral Solution",
    },
    {
      nom: "Prodep Capsule",
    },
    {
      nom: "Prulastin-M Tablet",
    },
    {
      nom: "Pentids 800 Tablet",
    },
    {
      nom: "Pyrigesic 650 Tablet",
    },
    {
      nom: "Pregator Capsule",
    },
    {
      nom: "Prax 10 Tablet",
    },
    {
      nom: "Primacort 100 Injection",
    },
    {
      nom: "Pregeb M 75 Capsule",
    },
    {
      nom: "Pacimol 650 Tablet",
    },
    {
      nom: "Pantop HP  Kit",
    },
    {
      nom: "PAH 20 Tablet",
    },
    {
      nom: "Polyclav 625mg Tablet",
    },
    {
      nom: "Peroclin 2.5% Gel",
    },
    {
      nom: "Pantakind-Flux Capsule SR",
    },
    {
      nom: "Powergesic MR Tablet",
    },
    {
      nom: "Pregabid MNT Tablet",
    },
    {
      nom: "Provanol Plus 10 Tablet",
    },
    {
      nom: "Proxym-XT Tablet",
    },
    {
      nom: "Prolomet R 25 Tablet ER",
    },
    {
      nom: "Parkitidin Tablet",
    },
    {
      nom: "Pregabid 75 Capsule",
    },
    {
      nom: "Pan-L Capsule SR",
    },
    {
      nom: "Pregalin SR 75 Tablet",
    },
    {
      nom: "Pantocid D Capsule",
    },
    {
      nom: "Prazopress XL 2.5 Tablet OPS",
    },
    {
      nom: "Popson Tablet",
    },
    {
      nom: "Picspot Gel",
    },
    {
      nom: "Protera D Capsule",
    },
    {
      nom: "Pantin L Capsule SR",
    },
    {
      nom: "Penegra 50 Tablet",
    },
    {
      nom: "Paternia XT Tablet",
    },
    {
      nom: "Parit D Capsule SR",
    },
    {
      nom: "Parkin Tablet",
    },
    {
      nom: "Perobar 5% Cleansing Bar",
    },
    {
      nom: "Pentaloc DSR 30mg/40mg Capsule",
    },
    {
      nom: "PAN 20 Tablet",
    },
    {
      nom: "Panlipase 25000 Capsule",
    },
    {
      nom: "Paraxin 250 Capsule",
    },
    {
      nom: "Prothiaden 75 Tablet",
    },
    {
      nom: "Pacroma Cream",
    },
    {
      nom: "Paxidep CR 25 Tablet",
    },
    {
      nom: "Propygenta NF Cream",
    },
    {
      nom: "Pletoz 50 Tablet",
    },
    {
      nom: "PCM Tablet",
    },
    {
      nom: "Pregabanyl NT Tablet",
    },
    {
      nom: "P 500 Tablet",
    },
    {
      nom: "Prothiaden 50 Tablet",
    },
    {
      nom: "Provanol SR 40 Tablet",
    },
    {
      nom: "Pacimol MF Tablet",
    },
    {
      nom: "Proxym MR Tablet",
    },
    {
      nom: "Practin EN Syrup",
    },
    {
      nom: "Pansec DSR Capsule",
    },
    {
      nom: "Premarin Tablet",
    },
    {
      nom: "Pilo GO Cream",
    },
    {
      nom: "Pernex AC 2.5% Gel",
    },
    {
      nom: "Pause 500mg Injection",
    },
    {
      nom: "P 120 Suspension",
    },
    {
      nom: "Pantop MPS Syrup Mint Sugar Free",
    },
    {
      nom: "Prolomet AM 25 Tablet PR",
    },
    {
      nom: "Prucros Tablet",
    },
    {
      nom: "Pantop LS Capsule SR",
    },
    {
      nom: "Pioz MF 15 Tablet SR",
    },
    {
      nom: "Perinorm-CD Capsule CR",
    },
    {
      nom: "Prolomet XL 12.5 Tablet",
    },
    {
      nom: "Polypod 200 Tablet",
    },
    {
      nom: "Preva Gold 10 Capsule",
    },
    {
      nom: "Pari CR 25 Tablet",
    },
    {
      nom: "Percin Tablet",
    },
    {
      nom: "Pruease 1mg Tablet",
    },
    {
      nom: "Piranulin Tablet",
    },
    {
      nom: "Pregaba 50 Capsule",
    },
    {
      nom: "Pantafol DSR 30mg/40mg Capsule PR",
    },
    {
      nom: "Pregalin X SR 75 Tablet",
    },
    {
      nom: "Pregeb M OD 75 Tablet SR",
    },
    {
      nom: "Psorid 100 Capsule",
    },
    {
      nom: "Pirfenex Tablet",
    },
    {
      nom: "Powergesic Tablet",
    },
    {
      nom: "Pramipex 0.5 Tablet",
    },
    {
      nom: "Plavix Tablet",
    },
    {
      nom: "Piriton Expectorant",
    },
    {
      nom: "Pacimol DS Oral Suspension",
    },
    {
      nom: "Pentopan DSR Capsule PR",
    },
    {
      nom: "Preva-AS 75 Tablet",
    },
    {
      nom: "Pan Mps O Oral Suspension Sugar Free",
    },
    {
      nom: "Predmet 1% Eye Drop",
    },
    {
      nom: "Prolia Solution for Injection",
    },
    {
      nom: "Pangraf 1 Capsule",
    },
    {
      nom: "Phexin 250mg Capsule",
    },
    {
      nom: "Pexep CR 25 Tablet",
    },
    {
      nom: "Perinorm Syrup",
    },
    {
      nom: "Pregaba-M SR 75 Tablet",
    },
    {
      nom: "Pregadoc  NT 75mg/10mg Tablet",
    },
    {
      nom: "Prugo 10 Tablet",
    },
    {
      nom: "Protar-K Solution",
    },
    {
      nom: "Pth 30 Tablet",
    },
    {
      nom: "Planep-T 10 Kit",
    },
    {
      nom: "Pan-IT Capsule SR",
    },
    {
      nom: "Pioplus 2 Tablet SR",
    },
    {
      nom: "Pradaxa 110mg Capsule",
    },
    {
      nom: "Prax A 75 Capsule",
    },
    {
      nom: "Pepcia-D Capsule SR",
    },
    {
      nom: "Pruwel 2 Tablet",
    },
    {
      nom: "Paknet Creamy Wash",
    },
    {
      nom: "Propyderm NF Cream",
    },
    {
      nom: "Pregabid 50 Capsule",
    },
    {
      nom: "Pbren NT 75mg/10mg Tablet",
    },
    {
      nom: "Pataday Ophthalmic Solution",
    },
    {
      nom: "Proluton Depot 250mg/ml Injection",
    },
    {
      nom: "Pentasa 1gm Prolonged Release Granules",
    },
    {
      nom: "Pulmonext Kit",
    },
    {
      nom: "Pradaxa 150mg Capsule",
    },
    {
      nom: "Piclin Plus Oral Suspension Sugar Free",
    },
    {
      nom: "Polycap  Capsule",
    },
    {
      nom: "Pantium DSR Capsule",
    },
    {
      nom: "Pulmocef 250 Tablet",
    },
    {
      nom: "Prugo 25 Tablet",
    },
    {
      nom: "Pramipex 0.125 Tablet",
    },
    {
      nom: "Pantop IT Capsule SR",
    },
    {
      nom: "Propysalic  NF Lotion",
    },
    {
      nom: "Prolomet R 50 Tablet ER",
    },
    {
      nom: "Pacimol Drops",
    },
    {
      nom: "Penvir 500 Tablet",
    },
    {
      nom: "Pletoz 100 Tablet",
    },
    {
      nom: "Prasita 10mg Tablet",
    },
    {
      nom: "Phoscut 400 Tablet",
    },
    {
      nom: "Pentasa 500mg Tablet PR",
    },
    {
      nom: "Pause-XT Tablet",
    },
    {
      nom: "Pioz 7.5 Tablet",
    },
    {
      nom: "Pregalin M SR 75 Tablet",
    },
    {
      nom: "Pentanerv-NT 100mg/10mg Tablet",
    },
    {
      nom: "Prodep 10 Capsule",
    },
    {
      nom: "Pansec-L Capsule SR",
    },
    {
      nom: "Paraxin Suspension",
    },
    {
      nom: "Placentrex Cream",
    },
    {
      nom: "Pilomax Tablet",
    },
    {
      nom: "Panderm Super Cream",
    },
    {
      nom: "Protussa Cough Syrup",
    },
    {
      nom: "Primox 25mg Tablet",
    },
    {
      nom: "Prograf 1mg Hard Capsule",
    },
    {
      nom: "Psorid 50 Capsule",
    },
    {
      nom: "Peptard-D Capsule SR",
    },
    {
      nom: "Penegra 25 Tablet",
    },
    {
      nom: "Pregabid ME 75 Capsule",
    },
    {
      nom: "Picon Cream",
    },
    {
      nom: "Pepcia 20 Tablet",
    },
    {
      nom: "Proxidom 500mg Tablet",
    },
    {
      nom: "Pixelub Multi Eye Drop",
    },
    {
      nom: "Pacimol Oral Suspension",
    },
    {
      nom: "Pregabid NT 50mg/10mg Tablet",
    },
    {
      nom: "Podowart S Paint",
    },
    {
      nom: "Periset MD Tablet",
    },
    {
      nom: "Periset Syrup",
    },
    {
      nom: "Pentanerv 100 Tablet",
    },
    {
      nom: "Pantop 20 Tablet",
    },
    {
      nom: "Pantocid IV Injection",
    },
    {
      nom: "Preva Gold 20 Capsule",
    },
    {
      nom: "Pari 10 Tablet",
    },
    {
      nom: "Prothiaden M  50 Tablet",
    },
    {
      nom: "Pregaba SR 75 Tablet",
    },
    {
      nom: "PNV New Tablet",
    },
    {
      nom: "Pasitrex Ointment",
    },
    {
      nom: "Piosys 15 Tablet",
    },
    {
      nom: "Pansec Tablet",
    },
    {
      nom: "Phytoral Ointment",
    },
    {
      nom: "Paroxee CR 12.5 Tablet",
    },
    {
      nom: "Pilocar 2% Eye Drop",
    },
    {
      nom: "Pentavac PFS Vaccine",
    },
    {
      nom: "Pivasta 2 Tablet",
    },
    {
      nom: "Penegra Xpress 50mg Tablet",
    },
    {
      nom: "Provanol 20 Tablet",
    },
    {
      nom: "Pbren 50 Capsule",
    },
    {
      nom: "Pregeb 75 Capsule",
    },
    {
      nom: "Pantin D Capsule PR",
    },
    {
      nom: "Pevesca Plus Capsule",
    },
    {
      nom: "Pregason-M Capsule",
    },
    {
      nom: "Pinom 20 Tablet",
    },
    {
      nom: "Pioride 2mg Tablet",
    },
    {
      nom: "Peg-NT Tablet",
    },
    {
      nom: "Powerflam 50mg Tablet MR",
    },
    {
      nom: "Pregalin 50 Capsule",
    },
    {
      nom: "Piclin Kid Oral Solution",
    },
    {
      nom: "Pentate 40 Tablet",
    },
    {
      nom: "Pulmonext 5 Tablet",
    },
    {
      nom: "Polynase D Eye Ointment",
    },
    {
      nom: "Pramirol 0.25 Tablet",
    },
    {
      nom: "Paracip Syrup",
    },
    {
      nom: "Phensedyl LR Oral Suspension",
    },
    {
      nom: "Preva-AS 150 Tablet",
    },
    {
      nom: "Prusent 2mg Tablet",
    },
    {
      nom: "Peroduo Gel",
    },
    {
      nom: "Piltop-DSR Capsule",
    },
    {
      nom: "Polyclav-DS Dry Syrup",
    },
    {
      nom: "Povidone Iodine Solution",
    },
    {
      nom: "Piclin Tablet",
    },
    {
      nom: "PPG 0.3 Tablet",
    },
    {
      nom: "Pirfenex 400mg Tablet",
    },
    {
      nom: "Phexin 250mg Redisyp Banana",
    },
    {
      nom: "Pantin 40mg Tablet",
    },
    {
      nom: "Phexin 250mg Redisyp Banana",
    },
    {
      nom: "Pacimol MF 125 Oral Suspension",
    },
    {
      nom: "Propysalic NF Ointment",
    },
    {
      nom: "Protochek DSR Capsule",
    },
    {
      nom: "Pegstim Injection",
    },
    {
      nom: "Pecef 100 Powder For Oral Suspension",
    },
    {
      nom: "Pioz 30 Tablet",
    },
    {
      nom: "Proliser Syrup Sugar Free",
    },
    {
      nom: "Phensedyl CR  Syrup",
    },
    {
      nom: "Potrate 10 Tablet ER",
    },
    {
      nom: "Panderm NM Cream",
    },
    {
      nom: "Pregamet SR Tablet",
    },
    {
      nom: "Pentasa 2gm Prolonged Release Granules",
    },
    {
      nom: "Pepcia-L Capsule SR",
    },
    {
      nom: "Pramipex ER 0.375 Tablet",
    },
    {
      nom: "P 500 Suspension",
    },
    {
      nom: "Pangraf 0.5 Capsule",
    },
    {
      nom: "Pioglit 15 Tablet",
    },
    {
      nom: "Pelliwash Shampoo",
    },
    {
      nom: "Prolomet XL 100 Tablet",
    },
    {
      nom: "Parawel 325mg Tablet",
    },
    {
      nom: "Peroclin 5% Gel",
    },
    {
      nom: "P2i-D Capsule PR",
    },
    {
      nom: "PCM 650mg Tablet",
    },
    {
      nom: "Phoscut 800 Tablet",
    },
    {
      nom: "Pulmoclear LS Syrup",
    },
    {
      nom: "Protera Tablet",
    },
    {
      nom: "Paracip Infusion",
    },
    {
      nom: "PA 12 Tablet SR",
    },
    {
      nom: "Prulastin Tablet",
    },
    {
      nom: "Pioride 1mg Tablet",
    },
    {
      nom: "Prostagard 4 Capsule",
    },
    {
      nom: "Phexin BD 750mg Tablet",
    },
    {
      nom: "Parasafe 650 Tablet",
    },
    {
      nom: "Phenosulf Eye Drop",
    },
    {
      nom: "Panex-CR 12.5 Tablet",
    },
    {
      nom: "Pinodin-TX Plus Tablet SR",
    },
    {
      nom: "Propyzole NF Cream",
    },
    {
      nom: "Pylokit-AC Kit",
    },
    {
      nom: "Pregastar M 75 Capsule",
    },
    {
      nom: "Progynova 1mg Tablet",
    },
    {
      nom: "P-Lone Eye Drop",
    },
    {
      nom: "Pregalift NT Tablet",
    },
    {
      nom: "Pantotab DSR Capsule",
    },
    {
      nom: "Peritol 4mg Tablet",
    },
    {
      nom: "Phytoral Tablet",
    },
    {
      nom: "Pbren-M 75 Capsule",
    },
    {
      nom: "Pazom 40mg Tablet",
    },
    {
      nom: "Periset Injection",
    },
    {
      nom: "Pruwel 1 Tablet",
    },
    {
      nom: "P 125 Drops",
    },
    {
      nom: "Pansped 40 Tablet",
    },
    {
      nom: "Premarin 0.3mg Tablet",
    },
    {
      nom: "Pentab-D Tablet",
    },
    {
      nom: "Pbren 75 Capsule",
    },
    {
      nom: "Puradine OZ Ointment",
    },
    {
      nom: "Prazopill XL 5 Tablet",
    },
    {
      nom: "Pregabel-M Capsule",
    },
    {
      nom: "Provanol 10 Tablet",
    },
    {
      nom: "Pramipex 1 Tablet",
    },
    {
      nom: "Presmovac 2 Tablet",
    },
    {
      nom: "Podocip CV Tablet",
    },
    {
      nom: "Pilogo Plus Cream",
    },
    {
      nom: "Pinom 40 Tablet",
    },
    {
      nom: "Pioplus 1 Tablet SR",
    },
    {
      nom: "Paxidep CR 37.5 Tablet",
    },
    {
      nom: "Pramirol 0.5 Tablet",
    },
    {
      nom: "Pregabid Forte 75 Capsule",
    },
    {
      nom: "Prolox 5% Topical Solution",
    },
    {
      nom: "Propynate NF Cream",
    },
    {
      nom: "Pregalin 150 Capsule",
    },
    {
      nom: "Paracip Suspension 60ml for Fever &amp; Pain Management",
    },
    {
      nom: "Plermin Gel",
    },
    {
      nom: "Peg-SR M 75 Tablet",
    },
    {
      nom: "Pramipex ER 0.75 Tablet",
    },
    {
      nom: "Pangraf 2 Capsule",
    },
    {
      nom: "Pregabanyl Capsule",
    },
    {
      nom: "Pivasta 4 Tablet",
    },
    {
      nom: "Phlebotroy QPS Topical Solution",
    },
    {
      nom: "Panum-DSR Capsule",
    },
    {
      nom: "Pansalve-DSR Capsule",
    },
    {
      nom: "Parkin-Plus Tablet",
    },
    {
      nom: "Panthol-D Eye Gel",
    },
    {
      nom: "Prodep 60 Capsule",
    },
    {
      nom: "Polycain Oral Gel Jamaican Strawberry",
    },
    {
      nom: "Pancef-O 200mg Tablet",
    },
    {
      nom: "Preva Tablet",
    },
    {
      nom: "Panto-DSR Capsule",
    },
    {
      nom: "Pyrigesic Oral Suspension",
    },
    {
      nom: "Pro 9 500mg Injection",
    },
    {
      nom: "Pirox 20 Capsule",
    },
    {
      nom: "Pentasa 1gm Suppository",
    },
    {
      nom: "Penidure LA 6 Injection",
    },
    {
      nom: "Peg -SR 75 Tablet",
    },
    {
      nom: "Protera-L Capsule SR",
    },
    {
      nom: "Prexaron Plus Tablet",
    },
    {
      nom: "Panzynorm-N Tablet",
    },
    {
      nom: "Planokuf XP  Syrup",
    },
    {
      nom: "Pantium 40 Tablet",
    },
    {
      nom: "Penvir 250 Tablet",
    },
    {
      nom: "Pentaglobin Injection",
    },
    {
      nom: "Pantadom-SR Capsule",
    },
    {
      nom: "Pinodin Tablet",
    },
    {
      nom: "Propygenta NF Cream",
    },
    {
      nom: "Primiwal-E4 Tablet SR",
    },
    {
      nom: "Pixit Oral Solution Sugar Free",
    },
    {
      nom: "Powergesic 100mg Transdermal Patch",
    },
    {
      nom: "Panum L Capsule",
    },
    {
      nom: "Profulvin 500 Tablet",
    },
    {
      nom: "PH-Perfect Capsule",
    },
    {
      nom: "Polyclav BD 228.5mg Dry Syrup",
    },
    {
      nom: "Prograf 0.5mg Capsule",
    },
    {
      nom: "Penclav 625 Tablet",
    },
    {
      nom: "Padup Capsule PR",
    },
    {
      nom: "Phexin BD 375mg Tablet",
    },
    {
      nom: "Pregcert 200 SR Tablet",
    },
    {
      nom: "Pregalex-NT Tablet",
    },
    {
      nom: "Pregabel 75 Capsule",
    },
    {
      nom: "PPG Met 0.3 Tablet SR",
    },
    {
      nom: "Pubergen HP 5000 Injection",
    },
    {
      nom: "Papaverine 60mg Injection",
    },
    {
      nom: "Pramirol SR 0.26 Tablet",
    },
    {
      nom: "Pentaloc D 10mg/20mg Tablet",
    },
    {
      nom: "Patadin Tablet",
    },
    {
      nom: "Prasudoc 10 Tablet",
    },
    {
      nom: "Pruf-P Tablet",
    },
    {
      nom: "Piosys 30 Tablet",
    },
    {
      nom: "Pentate-D Tablet",
    },
    {
      nom: "Panzynorm-HS Tablet",
    },
    {
      nom: "Primiwal-S Tablet",
    },
    {
      nom: "Panthor DX Syrup",
    },
    {
      nom: "Powercort-S 3% Ointment",
    },
    {
      nom: "Profine SR 300 Tablet",
    },
    {
      nom: "Pregamet 75 Capsule",
    },
    {
      nom: "Persol Plus Gel",
    },
    {
      nom: "Pregathree Tablet",
    },
    {
      nom: "Parkinta 2mg Tablet",
    },
    {
      nom: "PPG 0.2 Tablet",
    },
    {
      nom: "Piza-D Tablet",
    },
    {
      nom: "Pexep CR 37.5 Tablet",
    },
    {
      nom: "Pioz MF G2 Tablet SR",
    },
    {
      nom: "Primiwal E2 Tablet",
    },
    {
      nom: "Pioglit MF 15 Tablet ER",
    },
    {
      nom: "Potcl 1.5gm Injection",
    },
    {
      nom: "Panderm + Dusting Powder",
    },
    {
      nom: "Pregeb OD 75 Tablet",
    },
    {
      nom: "Paroxee CR 25 Tablet",
    },
    {
      nom: "Pamoria Cream",
    },
    {
      nom: "Pantodac L Capsule SR",
    },
    {
      nom: "Pramirol 0.125 Tablet",
    },
    {
      nom: "Paradise XR 12.5 Tablet",
    },
    {
      nom: "Pregcert 300 SR Tablet",
    },
    {
      nom: "Pregeb M 150 Capsule",
    },
    {
      nom: "Phytoral B Cream",
    },
    {
      nom: "Psorid 100mg Oral Solution",
    },
    {
      nom: "Pio-M 15 Tablet SR",
    },
    {
      nom: "Paknet-C Gel",
    },
    {
      nom: "Pantafol-SL Capsule SR",
    },
    {
      nom: "Pyricool 500mg Tablet",
    },
    {
      nom: "Prolox Extra Strength 10% Topical Solution",
    },
    {
      nom: "Pregalin X 75 Capsule",
    },
    {
      nom: "Plagerine-A Capsule",
    },
    {
      nom: "P2I Tablet",
    },
    {
      nom: "Preganza NT Tablet",
    },
    {
      nom: "Prelid 8mg Tablet",
    },
    {
      nom: "Prulitop 2 Tablet",
    },
    {
      nom: "Prutrip 25mg Tablet",
    },
    {
      nom: "Panplus 40 Tablet",
    },
    {
      nom: "Pramipex ER 1.5 Tablet",
    },
    {
      nom: "Pexep 10 Tablet",
    },
    {
      nom: "Primodil-AT  Tablet",
    },
    {
      nom: "Prominad Tablet",
    },
    {
      nom: "Priorix Vaccine",
    },
    {
      nom: "Provate-D Cream",
    },
    {
      nom: "Phexin 125mg Redisyp Pineapple",
    },
    {
      nom: "Pyrigesic Drop",
    },
    {
      nom: "Potrate-M Oral Solution",
    },
    {
      nom: "Pregalin M 150 Capsule",
    },
    {
      nom: "Predace 4 Tablet",
    },
    {
      nom: "Panimun Bioral 100mg Capsule",
    },
    {
      nom: "Pulmoday 20mg Tablet",
    },
    {
      nom: "Prelin M 75 Capsule",
    },
    {
      nom: "Picon Cream",
    },
    {
      nom: "Povidot 10% Ointment",
    },
    {
      nom: "Pantodac IV Injection",
    },
    {
      nom: "Plagerine Tablet",
    },
    {
      nom: "Propynate NF Lotion",
    },
    {
      nom: "Pinom 10 Tablet",
    },
    {
      nom: "Pegex 6mg Injection",
    },
    {
      nom: "Pirfenex 600mg Tablet",
    },
    {
      nom: "Pregeb M OD 150 Tablet",
    },
    {
      nom: "Primodil 5 Tablet",
    },
    {
      nom: "Pregastar M - OD 75 Tablet SR",
    },
    {
      nom: "Puregraf 150IU HP Injection",
    },
    {
      nom: "Pileum Suppository",
    },
    {
      nom: "Pinkeva 35 Kit",
    },
    {
      nom: "Pancrehenz 25000 Capsule",
    },
    {
      nom: "Prestiq 50 Tablet ER",
    },
    {
      nom: "Pancrehenz 10000 Capsule",
    },
    {
      nom: "Protera-I Capsule SR",
    },
    {
      nom: "P 750 Tablet",
    },
    {
      nom: "Pramirol SR 0.52 Tablet",
    },
    {
      nom: "Penridol 20mg Tablet",
    },
    {
      nom: "Pancicare-D Capsule PR",
    },
    {
      nom: "Prelica Gel",
    },
    {
      nom: "Polypod CV 200 Tablet",
    },
    {
      nom: "Pacroma Cream",
    },
    {
      nom: "Pradaxa 75mg Capsule",
    },
    {
      nom: "Panex-CR 25 Tablet",
    },
    {
      nom: "Panum 40 Tablet",
    },
    {
      nom: "Prizide-M 80 Tablet",
    },
    {
      nom: "Prazopress 1 Tablet",
    },
    {
      nom: "Pregabid OD 100 Tablet SR",
    },
    {
      nom: "Prelogic Capsule",
    },
    {
      nom: "PPG Met 0.2 Tablet SR",
    },
    {
      nom: "Pilot M 10mg/120mg Tablet",
    },
    {
      nom: "Pionorm 15 Tablet",
    },
    {
      nom: "Pangraf 0.25 Capsule",
    },
    {
      nom: "Planep-T 20 Kit",
    },
    {
      nom: "Palido-OD 3 Tablet ER",
    },
    {
      nom: "Protol  -XL 50 Tablet",
    },
    {
      nom: "Persinal 75IU Injection",
    },
    {
      nom: "Preega M 75 Capsule",
    },
    {
      nom: "Presmovac 1 Tablet",
    },
    {
      nom: "Palido-OD 6 Tablet ER",
    },
    {
      nom: "Panimun Bioral 50mg Capsule",
    },
    {
      nom: "Protol-XL 25 Tablet",
    },
    {
      nom: "Pomalid 2mg Capsule",
    },
    {
      nom: "Pantodac-IT Capsule SR",
    },
    {
      nom: "Pradil 150 Tablet",
    },
    {
      nom: "Pantin 40mg Injection",
    },
    {
      nom: "Phexin Kid Tablet DT",
    },
    {
      nom: "Pioglar-G Tablet",
    },
    {
      nom: "Pregalin Forte Capsule",
    },
    {
      nom: "Pregalin Forte Capsule",
    },
    {
      nom: "Plagerine-A 150 Capsule",
    },
    {
      nom: "Patroxta 12.5 Tablet PR",
    },
    {
      nom: "Podocip 200mg Tablet",
    },
    {
      nom: "Pirox Gel 30gm for Skin Infections",
    },
    {
      nom: "Pulmonext 10 Tablet",
    },
    {
      nom: "Pansec 40mg Injection",
    },
    {
      nom: "Pinom-H 20 Tablet",
    },
    {
      nom: "Pentasa 1gm Enema",
    },
    {
      nom: "Primigyn 0.5mg Gel",
    },
    {
      nom: "Piritexyl Plus Cough Syrup",
    },
    {
      nom: "Pregadoc 75 Capsule",
    },
    {
      nom: "Prenura NT Tablet",
    },
    {
      nom: "Pioglit 7.5 Tablet",
    },
    {
      nom: "Piritexyl Plus Cough Syrup",
    },
    {
      nom: "Paxi-CR 12.5 Tablet",
    },
    {
      nom: "Pivasta 1 Tablet",
    },
    {
      nom: "Petolo Eye Drop",
    },
    {
      nom: "Predace 16 Tablet",
    },
    {
      nom: "Princiclav 500 mg/125 mg Tablet",
    },
    {
      nom: "Predace 8mg Tablet",
    },
    {
      nom: "Pulmofib 200mg Tablet",
    },
    {
      nom: "Plagril 75 Tablet",
    },
    {
      nom: "Pregalin SR 150 Tablet",
    },
    {
      nom: "Prostado-D Tablet ER",
    },
    {
      nom: "Phytoral Dusting Powder",
    },
    {
      nom: "Pexep 20 Tablet",
    },
    {
      nom: "Pregabid 150 Capsule",
    },
    {
      nom: "Pinodin TX-SR Tablet",
    },
    {
      nom: "Praiscort Ointment",
    },
    {
      nom: "Pantafol 40mg Tablet",
    },
    {
      nom: "Piokind-M 15 Tablet",
    },
    {
      nom: "Prandial M 0.3 Tablet",
    },
    {
      nom: "P Zole 40mg Tablet",
    },
    {
      nom: "Prasusafe 10 Tablet",
    },
    {
      nom: "Pioglar 15 Tablet",
    },
    {
      nom: "Picozy Syrup Sugar Free",
    },
    {
      nom: "Pinom CT 40 Tablet",
    },
    {
      nom: "Pregalex-M Capsule",
    },
    {
      nom: "Paxotus 12.5mg Tablet",
    },
    {
      nom: "Pantofix D Capsule PR",
    },
    {
      nom: "Pioglit 30 Tablet",
    },
    {
      nom: "Pramirol SR 1.05 Tablet",
    },
    {
      nom: "Pynomax - OD Tablet SR",
    },
    {
      nom: "Pentanerv 450mg Tablet SR",
    },
    {
      nom: "Powercort-S 6% Ointment",
    },
    {
      nom: "Polyclav Kid Tablet",
    },
    {
      nom: "Protol-AM Tablet PR",
    },
    {
      nom: "Pregabid M OD 100 Tablet SR",
    },
    {
      nom: "Pantin RD 10mg/20mg Tablet",
    },
    {
      nom: "Ppson 40mg Capsule",
    },
    {
      nom: "Pruflox Tablet",
    },
    {
      nom: "Pilzban Cream",
    },
    {
      nom: "Pulmopres Tablet",
    },
    {
      nom: "P 125 Tablet DT",
    },
    {
      nom: "Powercef 1gm Injection",
    },
    {
      nom: "Patinex 12.5mg Tablet",
    },
    {
      nom: "PP Set DSR Capsule",
    },
    {
      nom: "Povinanz Ointment",
    },
    {
      nom: "Panido-D Tablet",
    },
    {
      nom: "Prosovit 75 Capsule",
    },
    {
      nom: "Pubergen JO 7500IU Injection",
    },
    {
      nom: "Pinom CT 20 Tablet",
    },
    {
      nom: "Pyrope NTM Tablet SR",
    },
    {
      nom: "Pirfetab Tablet",
    },
    {
      nom: "Povirobes Ointment",
    },
    {
      nom: "Pinodin-TX Plus Tablet",
    },
    {
      nom: "Praxet 12.5mg Tablet CR",
    },
    {
      nom: "Pronate 20 Tablet",
    },
    {
      nom: "Poliovac PFS Vaccine",
    },
    {
      nom: "Progaba 100mg Tablet",
    },
    {
      nom: "Podxetil CV 200mg/125mg Tablet",
    },
    {
      nom: "Prednol-LS Eye Drop",
    },
    {
      nom: "Psorid 25 Capsule",
    },
    {
      nom: "Prelin 75 Capsule",
    },
    {
      nom: "Pariwave CR 12.5 Tablet",
    },
    {
      nom: "Panbloc Tablet",
    },
    {
      nom: "Pidotimune 400 Tablet",
    },
    {
      nom: "Predsol Eye Drop",
    },
    {
      nom: "Pionorm 30 Tablet",
    },
    {
      nom: "Paradise XR 25 Tablet",
    },
    {
      nom: "Piomed 15 Tablet",
    },
    {
      nom: "PUC 250mg/5ml Suspension",
    },
    {
      nom: "Plasmaglob 5gm Injection",
    },
    {
      nom: "Prelid 4mg Tablet",
    },
    {
      nom: "Patinex 25mg Tablet",
    },
    {
      nom: "Pin OM-M 50 Tablet",
    },
    {
      nom: "Pptroy D Capsule PR",
    },
    {
      nom: "Pansa-D Tablet",
    },
    {
      nom: "Prazo-DSR Capsule",
    },
    {
      nom: "Paragreat 650mg Tablet",
    },
    {
      nom: "Polaramine Paediatric Syrup",
    },
    {
      nom: "Pregadoc M - SR 75 Tablet",
    },
    {
      nom: "Pentol Eye Drop",
    },
    {
      nom: "Penegra Xpress 25mg Tablet",
    },
    {
      nom: "Progaba AM Tablet",
    },
    {
      nom: "Piopar-MF 15 Tablet ER",
    },
    {
      nom: "Palip XR 3 Tablet",
    },
    {
      nom: "Prexaron 500 Tablet",
    },
    {
      nom: "Pramirol 1 Tablet",
    },
    {
      nom: "Podxetil  200mg Tablet",
    },
    {
      nom: "Powercort-S 6% Lotion",
    },
    {
      nom: "Proceive SR 200 Tablet",
    },
    {
      nom: "Pexoclav 625 Tablet",
    },
    {
      nom: "Petolo-OD  Eye Drop",
    },
    {
      nom: "Pirament Syrup",
    },
    {
      nom: "Pin OM-M 25 Tablet ER",
    },
    {
      nom: "Pexep 40 Tablet",
    },
    {
      nom: "Panimun Bioral 25mg Capsule",
    },
    {
      nom: "Prexaron Syrup Sugar Free",
    },
    {
      nom: "Peredom 20 mg/650 mg Tablet",
    },
    {
      nom: "Pyrope NT  75mg/10mg Tablet",
    },
    {
      nom: "Pentowok D Tablet",
    },
    {
      nom: "Paxotus 25 Tablet PR",
    },
    {
      nom: "Pregastar Plus SR 75 Tablet",
    },
    {
      nom: "Pregastar Plus SR 75 Tablet",
    },
    {
      nom: "Propess Pessaries",
    },
    {
      nom: "Patalo-DS Eye Drops",
    },
    {
      nom: "Polyclav 250mg/125mg Tablet",
    },
    {
      nom: "Picasa 40mg Oral Suspension",
    },
    {
      nom: "Pedwin Tablet",
    },
    {
      nom: "Pinoin 0.025% Cream",
    },
    {
      nom: "Prisben AC 2.5% Gel",
    },
    {
      nom: "Paragreat 250mg Suspension",
    },
    {
      nom: "Prestiq 100 Tablet ER",
    },
    {
      nom: "PUC 650 Tablet",
    },
    {
      nom: "Pinoin 10mg Capsule",
    },
    {
      nom: "Pregcert 200 Capsule",
    },
    {
      nom: "Parot-CR 12.5 Tablet",
    },
    {
      nom: "Pantapar-DSR Capsule",
    },
    {
      nom: "Parona CR 12.5 Tablet",
    },
    {
      nom: "Provate S Ointment",
    },
    {
      nom: "Pansa DSR Capsule",
    },
    {
      nom: "Parawel 650mg Tablet",
    },
    {
      nom: "Pop IT Capsule SR",
    },
    {
      nom: "Penegra Pah Tablet",
    },
    {
      nom: "Pantex-D SR Capsule",
    },
    {
      nom: "Pexopram 0.125mg Tablet",
    },
    {
      nom: "Paracip Drops",
    },
    {
      nom: "Pacimol XP Tablet DT",
    },
    {
      nom: "Pregcert -AQ 25 Injection",
    },
    {
      nom: "Pramodep 50mg Tablet",
    },
    {
      nom: "Pregabid OD 150 Tablet",
    },
    {
      nom: "Pexpen-CR 25 Tablet",
    },
    {
      nom: "PUC 125 Suspension",
    },
    {
      nom: "Pratham 100 Rediuse Oral Suspension",
    },
    {
      nom: "Pexep 30 Tablet",
    },
    {
      nom: "Prasuvas 10 Tablet",
    },
    {
      nom: "Prandial M 0.2 Tablet",
    },
    {
      nom: "Piosafe 15 Tablet",
    },
    {
      nom: "Prandial 0.3 MD Tablet",
    },
    {
      nom: "Pregabid ME 150 Capsule",
    },
    {
      nom: "Plaintar-CS Lotion",
    },
    {
      nom: "Pop DSR Capsule",
    },
    {
      nom: "Parona CR 25 Tablet",
    },
    {
      nom: "Panstal Plus 10000 Capsule DR",
    },
    {
      nom: "Pramirol SR 2.1 Tablet",
    },
    {
      nom: "Pronim 100 Tablet",
    },
    {
      nom: "Pantotas D 10mg/40mg Tablet",
    },
    {
      nom: "Primodil 2.5 Tablet",
    },
    {
      nom: "Pirfemac 400 Tablet",
    },
    {
      nom: "Proflur Eye Drop",
    },
    {
      nom: "Prilido Cream",
    },
    {
      nom: "Panpure Tablet",
    },
    {
      nom: "Protol 50 TL Tablet PR",
    },
    {
      nom: "Pbf Gel",
    },
    {
      nom: "Pirasure Syrup",
    },
    {
      nom: "PA 650mg Tablet",
    },
    {
      nom: "Plosat gm Cream",
    },
    {
      nom: "Persil Eye Drop",
    },
    {
      nom: "Profenac Eye Drop",
    },
    {
      nom: "Pantop-M Capsule SR",
    },
    {
      nom: "Pseudo-Tears Eye Drop",
    },
    {
      nom: "Piopod 15 MF Tablet ER",
    },
    {
      nom: "Pregabel 150mg Capsule",
    },
    {
      nom: "Posito SR 200 Tablet",
    },
    {
      nom: "Penetrat-D Tablet",
    },
    {
      nom: "Pyrica-M  Capsule",
    },
    {
      nom: "Predvia Injection",
    },
    {
      nom: "Priglip M 500mg/20mg Tablet",
    },
    {
      nom: "Pilpan-D Tablet",
    },
    {
      nom: "Purocin Ointment",
    },
    {
      nom: "Pdlast Tablet",
    },
    {
      nom: "Prohale 200mg Capsule",
    },
    {
      nom: "Predvia 4 Tablet",
    },
    {
      nom: "Periset Injection",
    },
    {
      nom: "Posito SR 300 Tablet",
    },
    {
      nom: "Pilzban Cream",
    },
    {
      nom: "Piopar 7.5 Tablet",
    },
    {
      nom: "Prandial 0.2 MD Tablet",
    },
    {
      nom: "Piomed 30 Tablet",
    },
    {
      nom: "Pirament 400 Tablet",
    },
    {
      nom: "Pegten-NT Tablet",
    },
    {
      nom: "Proceive SR 300 Tablet",
    },
    {
      nom: "Peroxita Cream",
    },
    {
      nom: "Penrab 20mg Tablet",
    },
    {
      nom: "Phlebosol QPS Solution",
    },
    {
      nom: "Pylodil 2 Solution",
    },
    {
      nom: "Pyricool 650mg Tablet",
    },
    {
      nom: "Praztac-D Capsule SR",
    },
    {
      nom: "PUC Tablet",
    },
    {
      nom: "Pentalink 40 Tablet",
    },
    {
      nom: "Paknet Soap",
    },
    {
      nom: "Povinanz Gargle 100ml for Oral Care",
    },
    {
      nom: "Prucalm 10 Tablet",
    },
    {
      nom: "Premeal 1mg Tablet",
    },
    {
      nom: "Pozitiv 15mg Tablet",
    },
    {
      nom: "Pramirol SR 3.15 Tablet",
    },
    {
      nom: "Pozitiv 15mg Tablet",
    },
    {
      nom: "Pramirol SR 3.15 Tablet",
    },
    {
      nom: "Phytoral-XL Cream",
    },
    {
      nom: "Pantosun-DSR Capsule",
    },
    {
      nom: "Protol 25 TL Tablet PR",
    },
    {
      nom: "Pinoin Ointment",
    },
    {
      nom: "Preega 75 Capsule",
    },
    {
      nom: "Pregabrica NT Tablet",
    },
    {
      nom: "Povinanz 10% Solution",
    },
    {
      nom: "Pioglar 30 Tablet",
    },
    {
      nom: "Panopaz 40 Tablet",
    },
    {
      nom: "Pioglucored Forte Tablet",
    },
    {
      nom: "PPG MD 0.3 Tablet",
    },
    {
      nom: "Protek  Soap",
    },
    {
      nom: "Pioglaz 7.5mg Tablet",
    },
    {
      nom: "Psoratop 25mg Tablet",
    },
    {
      nom: "PH-Bar",
    },
    {
      nom: "PH-Bar",
    },
    {
      nom: "Pantodell DSR Capsule",
    },
    {
      nom: "Peda Typh Vaccine",
    },
    {
      nom: "Parvis 650 Tablet",
    },
    {
      nom: "PPG MD 0.2 Tablet",
    },
    {
      nom: "Paraband 650mg Tablet",
    },
    {
      nom: "Podmon Tablet",
    },
    {
      nom: "Pantovil 40 Tablet",
    },
    {
      nom: "Prazopill XL 2.5 Tablet",
    },
    {
      nom: "Parpol 500mg Tablet",
    },
    {
      nom: "Quadriderm RF Cream",
    },
    {
      nom: "Qutipin 25 Tablet",
    },
    {
      nom: "Qutan 25 Tablet",
    },
    {
      nom: "Qutipin 50 Tablet",
    },
    {
      nom: "Quadriderm RF Cream",
    },
    {
      nom: "Qutan 50 Tablet",
    },
    {
      nom: "Qmax 200mg Tablet",
    },
    {
      nom: "Qutipin 100 Tablet",
    },
    {
      nom: "Q-Car Forte  Tablet",
    },
    {
      nom: "Q-Mind 25 Tablet",
    },
    {
      nom: "Q-Car Tablet",
    },
    {
      nom: "Q-Sap Eye Ointment",
    },
    {
      nom: "Qutan 100 Tablet",
    },
    {
      nom: "Qtern 5mg/10mg Tablet",
    },
    {
      nom: "Quel 25mg Tablet",
    },
    {
      nom: "Qmax OZ 200 mg/500 mg Tablet",
    },
    {
      nom: "Quadrajel Gel",
    },
    {
      nom: "Qutipin 200 Tablet",
    },
    {
      nom: "Qutipin SR 50 Tablet",
    },
    {
      nom: "Qutipin SR 100 Tablet",
    },
    {
      nom: "Qutan SR 50 Tablet",
    },
    {
      nom: "Qutan SR 100 Tablet",
    },
    {
      nom: "Qustain P 1000 Tablet SR",
    },
    {
      nom: "Qutipin SR 300 Tablet",
    },
    {
      nom: "Quel SR 100 Tablet PR",
    },
    {
      nom: "Qutipin SR 200 Tablet",
    },
    {
      nom: "Quinoderm+ Cream",
    },
    {
      nom: "Quikhale FB 200 Capsule",
    },
    {
      nom: "Q-Sone Cream",
    },
    {
      nom: "Quel 50 Tablet",
    },
    {
      nom: "Q-Pin 25 Tablet",
    },
    {
      nom: "Qutan SR 200 Tablet",
    },
    {
      nom: "Qutan 200 Tablet",
    },
    {
      nom: "Qutan SR 300 Tablet",
    },
    {
      nom: "Qdmrd 200 Tablet",
    },
    {
      nom: "Quser 25mg Tablet",
    },
    {
      nom: "Qron 20mg/ml Injection",
    },
    {
      nom: "Qutipin 300 Tablet",
    },
    {
      nom: "Quikhale FB 400 Capsule",
    },
    {
      nom: "Questa 10 Tablet",
    },
    {
      nom: "Quel 100 Tablet",
    },
    {
      nom: "Qutan 300 Tablet",
    },
    {
      nom: "Qutan SR 400 Tablet",
    },
    {
      nom: "Qutiwel 25mg Tablet",
    },
    {
      nom: "Quel SR 200 Tablet",
    },
    {
      nom: "Q-Mind SR 100 Tablet",
    },
    {
      nom: "Q-Mind SR 50 Tablet",
    },
    {
      nom: "Q-Pin SR 200 Tablet",
    },
    {
      nom: "Quikhale SF 250 HFA Based Inhaler",
    },
    {
      nom: "Q-Mind SR 200 Tablet",
    },
    {
      nom: "Quinpride 50 Tablet",
    },
    {
      nom: "Quikhale FB 200 Powder for Inhalation",
    },
    {
      nom: "Qutiwel 50mg Tablet SR",
    },
    {
      nom: "Q-Mind SR 300 Tablet",
    },
    {
      nom: "Quadlon Antiseptic Liquid",
    },
    {
      nom: "Remicade Injection",
    },
    {
      nom: "Rolimus 5 Tablet",
    },
    {
      nom: "Refresh Tears Eye Drop",
    },
    {
      nom: "Rifagut 400 Tablet",
    },
    {
      nom: "Regestrone 5mg Tablet",
    },
    {
      nom: "Rantac 150 Tablet",
    },
    {
      nom: "Redotil 100mg Capsule",
    },
    {
      nom: "Reswas Syrup",
    },
    {
      nom: "Rosuvas 10 Tablet",
    },
    {
      nom: "Razo-D Capsule SR",
    },
    {
      nom: "Retino-A 0.025% Cream",
    },
    {
      nom: "Rifagut 550 Tablet",
    },
    {
      nom: "Relent Plus Syrup",
    },
    {
      nom: "Rexidin-M Forte Gel",
    },
    {
      nom: "ROKO Capsule",
    },
    {
      nom: "Rebagen Tablet",
    },
    {
      nom: "Rabekind-DSR Capsule",
    },
    {
      nom: "Rosuvas F 10 Tablet",
    },
    {
      nom: "Rantac Syrup Mint",
    },
    {
      nom: "Razo 20 Tablet",
    },
    {
      nom: "Rozavel 10 Tablet",
    },
    {
      nom: "Relent Tablet",
    },
    {
      nom: "Renicol Eye Drop",
    },
    {
      nom: "Rabesec-D SR Capsule",
    },
    {
      nom: "Reheptin Tablet",
    },
    {
      nom: "Renolog Tablet",
    },
    {
      nom: "Refresh Liquigel Eye Drop",
    },
    {
      nom: "Rablet 20 Tablet",
    },
    {
      nom: "Rosuvas 20 Tablet",
    },
    {
      nom: "Regestrone CR 10mg Tablet",
    },
    {
      nom: "Rabium-DSR Capsule",
    },
    {
      nom: "Resner Plus Tablet",
    },
    {
      nom: "Ranidom-O Oral Suspension Orange Sugar Free",
    },
    {
      nom: "Ryzodeg 100IU/ml Penfill",
    },
    {
      nom: "Rejoint New Tablet",
    },
    {
      nom: "Rifaxigyl-M Tablet",
    },
    {
      nom: "Rapitus Syrup Sugar Free",
    },
    {
      nom: "Rcifax 400 Tablet",
    },
    {
      nom: "Ranozex Tablet ER",
    },
    {
      nom: "Rosuva Gold 20 Capsule",
    },
    {
      nom: "Retino-A 0.05% Cream",
    },
    {
      nom: "Ryzodeg 100IU/ml Flextouch",
    },
    {
      nom: "Rabekind 20 Tablet",
    },
    {
      nom: "Rebez DSR Capsule",
    },
    {
      nom: "Rozavel F Tablet",
    },
    {
      nom: "Rozagold  20 Capsule",
    },
    {
      nom: "Rekool D Capsule SR",
    },
    {
      nom: "Rosuvas CV 10 Tablet",
    },
    {
      nom: "Roseday-F 10 Tablet",
    },
    {
      nom: "Rapitus Plus Syrup Sugar Free",
    },
    {
      nom: "Rantop Syrup Mango",
    },
    {
      nom: "Rexipra 10 Tablet",
    },
    {
      nom: "Rozalet 10 Tablet",
    },
    {
      nom: "Rzole DSR Capsule",
    },
    {
      nom: "Raciper D 40 Capsule SR",
    },
    {
      nom: "Recofast Plus Tablet",
    },
    {
      nom: "Rabalkem-DSR Capsule",
    },
    {
      nom: "Rabezol DSR  Capsule",
    },
    {
      nom: "Roseday-A 10 Capsule",
    },
    {
      nom: "Rozavel A Capsule",
    },
    {
      nom: "Rapilif-D 8 New Capsule",
    },
    {
      nom: "Rozucor ASP 10 Capsule",
    },
    {
      nom: "Rifagut Tablet",
    },
    {
      nom: "Rutoheal-D Tablet",
    },
    {
      nom: "Rosuvas 5 Tablet",
    },
    {
      nom: "Ranidom- RD Tablet",
    },
    {
      nom: "Reactin 50 Tablet",
    },
    {
      nom: "Rozucor 10 Tablet",
    },
    {
      nom: "Rabium 20 Tablet",
    },
    {
      nom: "Razo-L Capsule SR",
    },
    {
      nom: "Rutoheal Tablet",
    },
    {
      nom: "Rantac Injection 2ml",
    },
    {
      nom: "Retino AC Gel",
    },
    {
      nom: "Rabemac Mps Syrup",
    },
    {
      nom: "Revocon Tablet",
    },
    {
      nom: "Rosuvas 40 Tablet",
    },
    {
      nom: "Rozavel 20 Tablet",
    },
    {
      nom: "Rantac Infant Syrup Mint",
    },
    {
      nom: "Rapiclav 625 Tablet",
    },
    {
      nom: "Rizact 10 Tablet",
    },
    {
      nom: "Rifakem 400 Tablet",
    },
    {
      nom: "Raciper 40 Tablet",
    },
    {
      nom: "Revolade 50mg Tablet",
    },
    {
      nom: "Recofast Tablet",
    },
    {
      nom: "Rosubest 10 Tablet",
    },
    {
      nom: "Rozagold  10 Capsule",
    },
    {
      nom: "Rantac 300 Tablet",
    },
    {
      nom: "Romy Injection",
    },
    {
      nom: "Roseday-Gold 20 Capsule",
    },
    {
      nom: "Revlamer 400 Tablet",
    },
    {
      nom: "Reclimet-XR Tablet",
    },
    {
      nom: "Resodim 15 Tablet",
    },
    {
      nom: "Recopress 500mg Tablet",
    },
    {
      nom: "Rebozen-DSR Capsule",
    },
    {
      nom: "Rosuvas F 20 Tablet",
    },
    {
      nom: "Rabivax-S Vaccine",
    },
    {
      nom: "Rabekind-Plus Tablet SR",
    },
    {
      nom: "Relent Cold Syrup",
    },
    {
      nom: "Rozucor F 10 Tablet",
    },
    {
      nom: "Rcifax 550 Tablet",
    },
    {
      nom: "Risdone LS Tablet",
    },
    {
      nom: "Rozucor ASP 20 Capsule",
    },
    {
      nom: "Ramitorva   Capsule",
    },
    {
      nom: "Rabesec LS Capsule",
    },
    {
      nom: "Reactin 100 SR Tablet",
    },
    {
      nom: "Rosuva Gold 10 Capsule",
    },
    {
      nom: "Revidox-LB Capsule",
    },
    {
      nom: "Rosumac Gold Capsule",
    },
    {
      nom: "Regaine 5% Solution",
    },
    {
      nom: "Roseday-A 20 Capsule",
    },
    {
      nom: "Rabesec 20 Tablet",
    },
    {
      nom: "Roseday-Gold Capsule",
    },
    {
      nom: "Rosumac ASP Capsule",
    },
    {
      nom: "Ranx 500 Tablet ER",
    },
    {
      nom: "Risdone-Plus Tablet",
    },
    {
      nom: "Rablet D 40 Capsule SR",
    },
    {
      nom: "Rosumac Gold 20 Capsule",
    },
    {
      nom: "Rekool 20 Tablet",
    },
    {
      nom: "Raceclo Capsule SR",
    },
    {
      nom: "Respira Expectorant Liquid",
    },
    {
      nom: "Robinaxol D 50 mg/325 mg/500 mg Tablet",
    },
    {
      nom: "R-Loc 150 Tablet",
    },
    {
      nom: "Reflora-R Sachet",
    },
    {
      nom: "Rexipra 5 Tablet",
    },
    {
      nom: "Redotil Sachet",
    },
    {
      nom: "Relub Eye Drop",
    },
    {
      nom: "Reactin Plus Tablet",
    },
    {
      nom: "Rantac OD 300 Tablet CR",
    },
    {
      nom: "Rozalet 20 Tablet",
    },
    {
      nom: "Risdone MT 0.5 Tablet MD",
    },
    {
      nom: "Regen-D 150 Gel",
    },
    {
      nom: "Rantac Mps Oral Suspension Elaichi Sugar Free",
    },
    {
      nom: "Rabicip 20 Tablet",
    },
    {
      nom: "Risofos 35 Tablet",
    },
    {
      nom: "Rbson D Capsule SR",
    },
    {
      nom: "Retoz-MR 4 Tablet",
    },
    {
      nom: "Rosuvas CV 20mg/75mg Tablet",
    },
    {
      nom: "Rozat-F Tablet",
    },
    {
      nom: "Reswas LS Syrup Sugar Free",
    },
    {
      nom: "Ramistar 2.5 Tablet",
    },
    {
      nom: "Reeshape Capsule",
    },
    {
      nom: "Rozucor Gold 20 Capsule",
    },
    {
      nom: "Rabicip D  Capsule SR",
    },
    {
      nom: "Rapitus XT Syrup",
    },
    {
      nom: "Respicure-D Syrup",
    },
    {
      nom: "Rabonik DSR Capsule",
    },
    {
      nom: "Renocrit 4000IU Injection",
    },
    {
      nom: "Ropark 0.5 Tablet",
    },
    {
      nom: "Risdone 1 Tablet",
    },
    {
      nom: "Retino A Micro 0.04% Gel",
    },
    {
      nom: "Rablet L Capsule PR",
    },
    {
      nom: "Robinaxol 350mg/250mg Tablet",
    },
    {
      nom: "Rozavel 5 Tablet",
    },
    {
      nom: "Rasalect 0.5 Tablet",
    },
    {
      nom: "Revofer Solution for Injection",
    },
    {
      nom: "Repace 25 Tablet",
    },
    {
      nom: "Rosuvas F 5 Tablet",
    },
    {
      nom: "Rabemac 20 Tablet",
    },
    {
      nom: "Rabez D 30 mg/20 mg Capsule",
    },
    {
      nom: "Rosufit CV 10 Capsule",
    },
    {
      nom: "Repace 50 Tablet",
    },
    {
      nom: "Rancad Tablet ER",
    },
    {
      nom: "Rixmin 550 Tablet",
    },
    {
      nom: "Rapeed D  Capsule SR",
    },
    {
      nom: "Ranispas NF 10mg/10mg Tablet",
    },
    {
      nom: "Rebagen-Otic Capsule",
    },
    {
      nom: "Renocel 4000IU Injection",
    },
    {
      nom: "Rifastop 400 Tablet",
    },
    {
      nom: "Rablet IT Capsule PR",
    },
    {
      nom: "Roles-D Capsule SR",
    },
    {
      nom: "Roliten 2mg Tablet",
    },
    {
      nom: "Ranidom-O Tablet",
    },
    {
      nom: "Rosumac CV 10 Capsule",
    },
    {
      nom: "Rabicer DSR 30mg/20mg Capsule",
    },
    {
      nom: "Risdone Liquid",
    },
    {
      nom: "Rivamer 1.5 Capsule",
    },
    {
      nom: "Rosubest F Tablet",
    },
    {
      nom: "Rifastop 200 Tablet",
    },
    {
      nom: "Resoten 20 Capsule",
    },
    {
      nom: "Roseday-F 20 Tablet",
    },
    {
      nom: "Rosave F 10 Tablet",
    },
    {
      nom: "Rhoclone 300mcg Injection",
    },
    {
      nom: "Rosubest 20 Tablet",
    },
    {
      nom: "Regulate Tablet",
    },
    {
      nom: "Ripatec Eye Drop",
    },
    {
      nom: "Ropark 0.25 Tablet",
    },
    {
      nom: "Rosumac F 67mg/10mg Tablet",
    },
    {
      nom: "Rizact 5 Tablet",
    },
    {
      nom: "Rabeloc RD Capsule",
    },
    {
      nom: "Racigyl SB Powder for Oral Solution",
    },
    {
      nom: "Rozavel F 20 Tablet",
    },
    {
      nom: "Rosulip 10 Tablet",
    },
    {
      nom: "Respira LS Syrup",
    },
    {
      nom: "Razel Gold 10 Capsule",
    },
    {
      nom: "Rekool-L Tablet SR",
    },
    {
      nom: "Revici Injection 5ml",
    },
    {
      nom: "Rixmin 400 Tablet",
    },
    {
      nom: "Refzil O 500mg Tablet",
    },
    {
      nom: "Rozucor 20 Tablet",
    },
    {
      nom: "Reclide Tablet",
    },
    {
      nom: "Rosulip-F 10 Tablet",
    },
    {
      nom: "Repace H Tablet",
    },
    {
      nom: "Rozavel 40 Tablet",
    },
    {
      nom: "Roliflo OD 4 Capsule ER",
    },
    {
      nom: "Respicure Syrup",
    },
    {
      nom: "Razel Gold 20 Capsule",
    },
    {
      nom: "Rabemac LS Capsule SR",
    },
    {
      nom: "Revlamer 800 Tablet",
    },
    {
      nom: "Rasalect 1 Tablet",
    },
    {
      nom: "Rosuvas EZ 10 Tablet",
    },
    {
      nom: "Ramistar 5 Tablet",
    },
    {
      nom: "Roseday-EZ Tablet",
    },
    {
      nom: "Razel-CV 10/75 Capsule",
    },
    {
      nom: "Revolade 25mg Tablet",
    },
    {
      nom: "Renopress-XL 5 Tablet",
    },
    {
      nom: "Ranogard Tablet ER",
    },
    {
      nom: "Rabishield 100IU Injection",
    },
    {
      nom: "Rizanet 10 Oral Disintegrating Strip",
    },
    {
      nom: "Racedot 100mg Capsule",
    },
    {
      nom: "Renocrit 10000 Injection",
    },
    {
      nom: "Regestrone CR 15mg Tablet",
    },
    {
      nom: "Reeshape 60 Capsule",
    },
    {
      nom: "Resync Eye Drop",
    },
    {
      nom: "Respicure-LS Junior Syrup",
    },
    {
      nom: "Roseday-F 5 Tablet",
    },
    {
      nom: "Rifakem 200 Tablet",
    },
    {
      nom: "Rabonik Plus Capsule SR",
    },
    {
      nom: "Reclide 40 Tablet",
    },
    {
      nom: "Rcifax Tablet",
    },
    {
      nom: "Rapitus LS Syrup",
    },
    {
      nom: "Renocel 10000IU Injection",
    },
    {
      nom: "Retoz 60 Tablet",
    },
    {
      nom: "Rozucor Gold 10 Capsule",
    },
    {
      nom: "Rest Aid Tablet",
    },
    {
      nom: "Revici-E 500 Tablet",
    },
    {
      nom: "Rac SR Capsule",
    },
    {
      nom: "Raciper Plus Capsule SR",
    },
    {
      nom: "Risperdal 2mg Tablet",
    },
    {
      nom: "Relikast LC 5mg/10mg Tablet",
    },
    {
      nom: "Razel 10 Tablet",
    },
    {
      nom: "Rexidin SRS Mouth Wash",
    },
    {
      nom: "R-Loc D 10mg/150mg Tablet",
    },
    {
      nom: "Rosuson 10 Tablet",
    },
    {
      nom: "Resoten 10 Capsule",
    },
    {
      nom: "Ranidom Suspension",
    },
    {
      nom: "Rozavel EZ Tablet",
    },
    {
      nom: "Rabifast-DSR Capsule",
    },
    {
      nom: "Respira D 2mg/10mg Syrup",
    },
    {
      nom: "Rabalkem LS 75mg/20mg Capsule",
    },
    {
      nom: "Rezatrin Forte Tablet",
    },
    {
      nom: "Riflux Fortz Chewable Tablet",
    },
    {
      nom: "Rozavel F 5 Tablet",
    },
    {
      nom: "Reclide MR 30 Tablet",
    },
    {
      nom: "Rednisol 8 Tablet",
    },
    {
      nom: "Razel 40 Tablet",
    },
    {
      nom: "Razel-F 10 Tablet",
    },
    {
      nom: "Rowasa 1gm Pellets",
    },
    {
      nom: "Regen-D 60 Gel",
    },
    {
      nom: "Risnia Syrup",
    },
    {
      nom: "Restasis Ophthalmic Emulsion (0.4ml each)",
    },
    {
      nom: "Roxid M Tablet",
    },
    {
      nom: "Rabeloc 20 Tablet",
    },
    {
      nom: "Roseday-CV 10 Capsule",
    },
    {
      nom: "Rancv 500 Tablet ER",
    },
    {
      nom: "Rivaflo 2.5 Tablet",
    },
    {
      nom: "Roseday 40 Tablet",
    },
    {
      nom: "Refzil O Suspension",
    },
    {
      nom: "Rivaflo 20 Tablet",
    },
    {
      nom: "Ruticool Cream",
    },
    {
      nom: "Rituxirel 500mg Injection",
    },
    {
      nom: "Risdone-Forte Tablet",
    },
    {
      nom: "Retino A Micro 0.1% Gel",
    },
    {
      nom: "Rosutor Gold 10/75 Tablet",
    },
    {
      nom: "Romilast L 10 Tablet",
    },
    {
      nom: "Rebez 20mg Tablet",
    },
    {
      nom: "Roliflo OD 2mg Capsule ER",
    },
    {
      nom: "Reziz Suspension",
    },
    {
      nom: "R-VAC Vaccine",
    },
    {
      nom: "Rovor 10 Tablet",
    },
    {
      nom: "Rosuson-F 10 Tablet",
    },
    {
      nom: "Rifakem 550 Tablet",
    },
    {
      nom: "Rabiros D Capsule SR",
    },
    {
      nom: "Ropraz-D SR Capsule",
    },
    {
      nom: "Roliten OD 4mg Capsule ER",
    },
    {
      nom: "Rosufit CV 20 Capsule",
    },
    {
      nom: "Rejunuron Plus Injection",
    },
    {
      nom: "Rosutor Gold 20/75 Capsule",
    },
    {
      nom: "Rozucor 5 Tablet",
    },
    {
      nom: "Risdone 2 Tablet",
    },
    {
      nom: "Redimard 25mg Tablet",
    },
    {
      nom: "Robinax 500mg Tablet",
    },
    {
      nom: "Resner-NT Tablet SR",
    },
    {
      nom: "Rosuless-F Tablet",
    },
    {
      nom: "Rizora 10 Tablet",
    },
    {
      nom: "Rantac Mps LA Oral Suspension",
    },
    {
      nom: "Rancil 10 Tablet",
    },
    {
      nom: "Rhoclone 150mcg Injection",
    },
    {
      nom: "Razel-CV 20/75 Capsule",
    },
    {
      nom: "Recofast Syrup",
    },
    {
      nom: "Rapiclav Forte Dry Syrup",
    },
    {
      nom: "Rabonik 20 Tablet",
    },
    {
      nom: "Razo Easy Sachet",
    },
    {
      nom: "Rockbon PTH Pen",
    },
    {
      nom: "Raymoxi-L Eye drop",
    },
    {
      nom: "Romilast 10mg Tablet",
    },
    {
      nom: "Roles 20 Tablet",
    },
    {
      nom: "Razel-EZ 10 Tablet",
    },
    {
      nom: "Rexipra 15 Tablet",
    },
    {
      nom: "Rozustat F Tablet",
    },
    {
      nom: "Rafle 400 Tablet",
    },
    {
      nom: "Revac-B Plus Adult Vaccine",
    },
    {
      nom: "Rifaximax 400 Tablet",
    },
    {
      nom: "Rozucor F 20 Tablet",
    },
    {
      nom: "Rolfin Cream",
    },
    {
      nom: "Rockbon Kit",
    },
    {
      nom: "Remo-M 500 Tablet",
    },
    {
      nom: "Rapeed 20 Tablet",
    },
    {
      nom: "Rosumac 20 Tablet",
    },
    {
      nom: "Rabium Plus Capsule PR",
    },
    {
      nom: "Rabifast 20 Tablet",
    },
    {
      nom: "Relipoietin 4000IU Injection",
    },
    {
      nom: "Refzil O Oral Suspension",
    },
    {
      nom: "Risofos 150 Tablet",
    },
    {
      nom: "Recool Plus Eye Drop",
    },
    {
      nom: "Rexipra 20 Tablet",
    },
    {
      nom: "Rexite Plus 500 mcg/50 mg/50 mg Injection",
    },
    {
      nom: "Rxtor 10 Tablet",
    },
    {
      nom: "Ropark 1 Tablet",
    },
    {
      nom: "Resof Total 400mg/100mg Tablet",
    },
    {
      nom: "Romilast L 5 Tablet",
    },
    {
      nom: "Rofaday Tablet",
    },
    {
      nom: "Reclimet OD 60 Tablet",
    },
    {
      nom: "Rekool 40-D Capsule SR",
    },
    {
      nom: "Rutoflam Tablet",
    },
    {
      nom: "Razel-A 75 Capsule",
    },
    {
      nom: "Rebozen-SL 75mg/20mg Capsule",
    },
    {
      nom: "Revlin M Tablet SR",
    },
    {
      nom: "Ramistar 1.25 Tablet",
    },
    {
      nom: "Respidon 1 Tablet",
    },
    {
      nom: "Razel 20 Tablet",
    },
    {
      nom: "Roliten 1mg Tablet",
    },
    {
      nom: "Resque-Plus Tablet",
    },
    {
      nom: "Ropark XL 1 Tablet",
    },
    {
      nom: "Rosukem 10 Tablet",
    },
    {
      nom: "Rosumac Gold Forte 20mg Capsule",
    },
    {
      nom: "Rafron DSR Capsule",
    },
    {
      nom: "Renoalfa Tablet",
    },
    {
      nom: "Rabitec-D SR Capsule",
    },
    {
      nom: "Rotavac Oral Vaccine",
    },
    {
      nom: "Refzil O 250mg Tablet",
    },
    {
      nom: "Reclide MR 60 Tablet",
    },
    {
      nom: "Resner Tablet SR",
    },
    {
      nom: "Relent-OD Capsule SR",
    },
    {
      nom: "Ramcor 5 Capsule",
    },
    {
      nom: "Revilus KZ Lotion",
    },
    {
      nom: "Rivamer 3 Capsule",
    },
    {
      nom: "Repace AF Tablet",
    },
    {
      nom: "Respicure-LS Expectorant Sugar Free",
    },
    {
      nom: "Rumalef 20 Tablet",
    },
    {
      nom: "Rbson 20mg Capsule",
    },
    {
      nom: "Rabezol 20 Tablet",
    },
    {
      nom: "Riomet OD 500mg Tablet SR",
    },
    {
      nom: "Rockbon Tablet",
    },
    {
      nom: "RabiPlus-D Capsule PR",
    },
    {
      nom: "Rinosolvin 10/5 Tablet",
    },
    {
      nom: "Rispond-Plus Tablet",
    },
    {
      nom: "Rifaxigress 550 Tablet",
    },
    {
      nom: "Razel-F5 Tablet",
    },
    {
      nom: "Ranolaz OD Tablet ER",
    },
    {
      nom: "Rabez L 75mg/20mg Capsule SR",
    },
    {
      nom: "Recool Eye Drop",
    },
    {
      nom: "Remetor 10 Tablet",
    },
    {
      nom: "Rez-Q 300 Tablet",
    },
    {
      nom: "Rabeloc Plus Capsule SR",
    },
    {
      nom: "Rafle 200 Tablet",
    },
    {
      nom: "Rejumet Tablet SR",
    },
    {
      nom: "Reclimet OD 30 Tablet ER",
    },
    {
      nom: "Rosvin-Gold 10 Capsule",
    },
    {
      nom: "Renvorab-DSR Capsule",
    },
    {
      nom: "Rifaxigyl 400mg Tablet",
    },
    {
      nom: "Regaine 2% Solution",
    },
    {
      nom: "Rekool-L 25 Tablet",
    },
    {
      nom: "Rozucor F 5 Tablet",
    },
    {
      nom: "Rabcita DSR Capsule",
    },
    {
      nom: "Remetor CV 20 Capsule",
    },
    {
      nom: "Rozustat Gold 20 Capsule",
    },
    {
      nom: "Rosvin 10 Tablet",
    },
    {
      nom: "Retoz-MR 8 Tablet",
    },
    {
      nom: "Rabez 20mg Tablet",
    },
    {
      nom: "Rabiros 20 Tablet",
    },
    {
      nom: "Rozavel A 150 Capsule",
    },
    {
      nom: "Ramipres 5 Tablet",
    },
    {
      nom: "Respidon 2 Tablet",
    },
    {
      nom: "Reclimet-PG 60 Tablet SR",
    },
    {
      nom: "Rpo 4000IU Injection",
    },
    {
      nom: "Renagold Tablet",
    },
    {
      nom: "Rabidoc 20 Tablet",
    },
    {
      nom: "Relgin 0.5 Tablet",
    },
    {
      nom: "Rosufit-F 10/160 Tablet",
    },
    {
      nom: "Rejunuron NT Tablet",
    },
    {
      nom: "Respizen Nasal Spray",
    },
    {
      nom: "Recita 5 Tablet",
    },
    {
      nom: "Rapisone-D SR Capsule",
    },
    {
      nom: "Renogard Keto Tablet",
    },
    {
      nom: "Razberg ACE Capsule",
    },
    {
      nom: "Rabitop-D Capsule SR",
    },
    {
      nom: "Risperdal 1mg Tablet",
    },
    {
      nom: "Renosave P 600mg Tablet",
    },
    {
      nom: "Riomet OD 1000mg Tablet SR",
    },
    {
      nom: "Random-DSR Capsule",
    },
    {
      nom: "Rotasiil Oral Vaccine",
    },
    {
      nom: "Ralgyz Soft Gelatin Capsule",
    },
    {
      nom: "Retesto Injection",
    },
    {
      nom: "Rapiclav 375 Tablet",
    },
    {
      nom: "Riscon LS Tablet",
    },
    {
      nom: "Rabex DSR Capsule",
    },
    {
      nom: "Renodapt 500 Tablet",
    },
    {
      nom: "Relub DS Gel",
    },
    {
      nom: "Rablet 10 Tablet",
    },
    {
      nom: "Rosave-C Capsule",
    },
    {
      nom: "Respicure-LS Oral Drops",
    },
    {
      nom: "Rosulip Gold 20 Capsule",
    },
    {
      nom: "Rhinase Nasal Drops",
    },
    {
      nom: "Respilite Tablet",
    },
    {
      nom: "Rumalef 10 Tablet",
    },
    {
      nom: "Reactin 100 SR Tablet",
    },
    {
      nom: "Rabee-D  Capsule SR",
    },
    {
      nom: "Revici-E 250 Tablet",
    },
    {
      nom: "Rabifast-XL Capsule PR",
    },
    {
      nom: "RotaTeq Oral Vaccine",
    },
    {
      nom: "Ramihart 5 Capsule",
    },
    {
      nom: "Resque LS Tablet",
    },
    {
      nom: "Rabitop Tablet",
    },
    {
      nom: "Rokfos Solution for Infusion",
    },
    {
      nom: "Recontrex Tablet",
    },
    {
      nom: "Rabsig-DSR Capsule",
    },
    {
      nom: "Rabonik 40 DSR Capsule",
    },
    {
      nom: "Ricovir 300mg Tablet",
    },
    {
      nom: "Rabidoc-D Tablet",
    },
    {
      nom: "Riscon Plus Tablet",
    },
    {
      nom: "Rosulip 5 Tablet",
    },
    {
      nom: "Rablet IV Injection",
    },
    {
      nom: "Rosave F 20 Tablet",
    },
    {
      nom: "Rolosol Tablet",
    },
    {
      nom: "Rizora 5 Tablet",
    },
    {
      nom: "Renodapt S 360 Tablet",
    },
    {
      nom: "Riscon 0.5mg Tablet",
    },
    {
      nom: "Rosuvas D 10 Tablet",
    },
    {
      nom: "Relgin 1 Tablet",
    },
    {
      nom: "Ritecef-CV Tablet",
    },
    {
      nom: "Regen-D 150 Gel",
    },
    {
      nom: "Rosave-Gold 20mg Capsule",
    },
    {
      nom: "Ropark XL 2 Tablet",
    },
    {
      nom: "Risnia Plus Tablet MD",
    },
    {
      nom: "Rafron L Capsule SR",
    },
    {
      nom: "Rugtrit 1500mcg/75mg Tablet",
    },
    {
      nom: "Repomia 10000 Injection",
    },
    {
      nom: "Ramistar-M 25mg/2.5mg Tablet XL",
    },
    {
      nom: "Rem CC LM 5 mg/10 mg Tablet",
    },
    {
      nom: "Romilast B 10 Tablet",
    },
    {
      nom: "Rapisone - SR Capsule",
    },
    {
      nom: "Ranitin 300 Tablet",
    },
    {
      nom: "Rospitril Plus 2 Tablet",
    },
    {
      nom: "Rosukem-A Capsule",
    },
    {
      nom: "Rosloy Gold 10 Capsule",
    },
    {
      nom: "Remo-Zen 100mg Tablet",
    },
    {
      nom: "Rovastat 10mg Tablet",
    },
    {
      nom: "Rozat-F 5 Tablet",
    },
    {
      nom: "Rifarex 400mg Tablet",
    },
    {
      nom: "Rekool-IT Capsule PR",
    },
    {
      nom: "Rxtor-F 10 Tablet",
    },
    {
      nom: "Rosys-FT 10/160 Tablet",
    },
    {
      nom: "Rosukem-F Tablet",
    },
    {
      nom: "Rosulip-F 5 Tablet",
    },
    {
      nom: "Riborea Capsule",
    },
    {
      nom: "Rutace-DS Tablet",
    },
    {
      nom: "Rosave F 5 Tablet",
    },
    {
      nom: "Roliten OD 2mg Capsule ER",
    },
    {
      nom: "Ramipres 2.5 Tablet",
    },
    {
      nom: "Rclonac Tablet SR",
    },
    {
      nom: "Rapiclav DS Oral Suspension",
    },
    {
      nom: "Regaine 5% Solution (3 Bottles)",
    },
    {
      nom: "Repalol H Tablet",
    },
    {
      nom: "Ropark 2 Tablet",
    },
    {
      nom: "Rotasure Oral Vaccine",
    },
    {
      nom: "Ryno Nasal Spray",
    },
    {
      nom: "Romilast L Syrup",
    },
    {
      nom: "Rafacol Tablet CR",
    },
    {
      nom: "Roslaren-F 10 Tablet",
    },
    {
      nom: "Rabee 20mg Tablet",
    },
    {
      nom: "Retense Capsule",
    },
    {
      nom: "Romilast-BL Tablet",
    },
    {
      nom: "Rekool 40-L Tablet SR",
    },
    {
      nom: "Ridezox-Forte Tablet",
    },
    {
      nom: "Rapacan 1mg Tablet",
    },
    {
      nom: "Rabiplus Capsule",
    },
    {
      nom: "Rabalkem IT 20mg/150mg Capsule",
    },
    {
      nom: "Redotrex MF 500mg/250mg Tablet",
    },
    {
      nom: "Rotarix Oral Vaccine",
    },
    {
      nom: "Revelol 50 H Tablet ER",
    },
    {
      nom: "Raptac-DSR Capsule",
    },
    {
      nom: "Risdone MT 1 Tablet",
    },
    {
      nom: "Renvela 800mg Tablet",
    },
    {
      nom: "Rapilif-D 4/0.5 Capsule",
    },
    {
      nom: "Rozustat Gold Capsule",
    },
    {
      nom: "Rosuson 40 Tablet",
    },
    {
      nom: "Remo-Zen M 500 Tablet",
    },
    {
      nom: "Riomet OD 850mg Tablet SR",
    },
    {
      nom: "Rispond 1 Tablet",
    },
    {
      nom: "Rexcof DX NF Syrup",
    },
    {
      nom: "Razo IV Injection",
    },
    {
      nom: "Ranci T 10mg Tablet",
    },
    {
      nom: "Rosuless 5 Tablet",
    },
    {
      nom: "Rabonik 40 Plus Capsule SR",
    },
    {
      nom: "Rabonik 40 Tablet",
    },
    {
      nom: "Rashcare Cream",
    },
    {
      nom: "Risnia MD 1 Tablet",
    },
    {
      nom: "Repalol Tablet",
    },
    {
      nom: "Romilast 5mg Tablet MD",
    },
    {
      nom: "Riomet Trio 2 Tablet ER",
    },
    {
      nom: "Rosvin-CV 10 Capsule",
    },
    {
      nom: "Rebozen 20mg Tablet",
    },
    {
      nom: "Ramcor 1.25 Capsule",
    },
    {
      nom: "Renerve P 750mcg/75mg Capsule",
    },
    {
      nom: "Ramcor-H 5 Tablet",
    },
    {
      nom: "Ramihart-H 5 Tablet",
    },
    {
      nom: "Riomet Duo 2 Tablet PR",
    },
    {
      nom: "Rabiplus-LS Capsule",
    },
    {
      nom: "Risperdal Consta 25mg Injection",
    },
    {
      nom: "Revlin 75 Capsule",
    },
    {
      nom: "Roles L Capsule",
    },
    {
      nom: "Riclofen Tablet",
    },
    {
      nom: "Rebozen-D 10mg/20mg Tablet",
    },
    {
      nom: "Rami Race 2.5 Tablet",
    },
    {
      nom: "Relysal Lotion",
    },
    {
      nom: "Revostat 10 Tablet",
    },
    {
      nom: "Remetor F Tablet",
    },
    {
      nom: "Rednisol 16mg Tablet",
    },
    {
      nom: "Ridazin 25 Tablet",
    },
    {
      nom: "Riscon 1mg Tablet",
    },
    {
      nom: "Rihaee 100mg/325mg Tablet",
    },
    {
      nom: "Rospitril Plus 3 Tablet MD",
    },
    {
      nom: "Ramistar-M XL 50 Tablet",
    },
    {
      nom: "Rosufit 5 Tablet",
    },
    {
      nom: "Rosufit 5 Tablet",
    },
    {
      nom: "Ranopill 500 Tablet ER",
    },
    {
      nom: "Reclide -XR 60 Tablet",
    },
    {
      nom: "Rutor D Tablet",
    },
    {
      nom: "Revlin M Capsule",
    },
    {
      nom: "Rutosafe Tablet",
    },
    {
      nom: "Rosukem 20 Tablet",
    },
    {
      nom: "Rabera-L Capsule",
    },
    {
      nom: "Relaxuro Tablet",
    },
    {
      nom: "Remetor 20 Tablet",
    },
    {
      nom: "Reflow-D Capsule PR",
    },
    {
      nom: "Ramistar-H 2.5  Tablet",
    },
    {
      nom: "Rabium 10 Tablet",
    },
    {
      nom: "Rozustat F 5 Tablet",
    },
    {
      nom: "Rosukem 5 Tablet",
    },
    {
      nom: "Raymoxi-P Eye Drop",
    },
    {
      nom: "Riscon Forte Tablet",
    },
    {
      nom: "Rapidon OD Eye Drop",
    },
    {
      nom: "Rabopep 20 Tablet",
    },
    {
      nom: "Rxtor 5 Tablet",
    },
    {
      nom: "Romilast FX Tablet",
    },
    {
      nom: "Rosucrest 10 Tablet",
    },
    {
      nom: "Reclimet-PG 30 Tablet SR",
    },
    {
      nom: "Rootz-M5 Solution",
    },
    {
      nom: "Rimoflo-T Ophthalmic Solution",
    },
    {
      nom: "Roslaren 20 Tablet",
    },
    {
      nom: "Rowasa 500mg Pellets",
    },
    {
      nom: "Rejunuron DN Tablet SR",
    },
    {
      nom: "Risdone 4 Tablet",
    },
    {
      nom: "Refzil O 50mg Drop",
    },
    {
      nom: "Rancil 20 Tablet",
    },
    {
      nom: "Rancv 1000 Tablet ER",
    },
    {
      nom: "Rifaclean 200 Tablet",
    },
    {
      nom: "Rifaclean 550 Tablet",
    },
    {
      nom: "Revostat Gold 20 Capsule",
    },
    {
      nom: "Relmisart 40 Tablet",
    },
    {
      nom: "Repace A Tablet",
    },
    {
      nom: "Raymoxi-K Eye Drop",
    },
    {
      nom: "Rhinocobal Nasal Spray",
    },
    {
      nom: "Rosycap-ASP 20/150 Capsule",
    },
    {
      nom: "Rabidoc LS 75mg/20mg Capsule",
    },
    {
      nom: "Rifaxigyl 550mg Tablet",
    },
    {
      nom: "Rxtor 20 Tablet",
    },
    {
      nom: "Rosloy 20 Tablet",
    },
    {
      nom: "Respicure-M Tablet",
    },
    {
      nom: "Romilast 4mg Tablet",
    },
    {
      nom: "Risdone 3 Tablet",
    },
    {
      nom: "Rotin F Tablet",
    },
    {
      nom: "Rispond Plus-LS Tablet",
    },
    {
      nom: "Riscon 2mg Tablet",
    },
    {
      nom: "Repace 100 Tablet",
    },
    {
      nom: "Rizole DS Cream",
    },
    {
      nom: "Rxtor-F 5 Tablet",
    },
    {
      nom: "Roslaren AC 75mg/10mg/75mg Capsule",
    },
    {
      nom: "Ralista Tablet",
    },
    {
      nom: "Relinase 0.25mg Tablet",
    },
    {
      nom: "Rostar 20 Tablet",
    },
    {
      nom: "Rivizole Cream",
    },
    {
      nom: "Remo M 100mg/1000mg Tablet",
    },
    {
      nom: "Rabizena 20mg Tablet",
    },
    {
      nom: "Rozutin 5 Tablet",
    },
    {
      nom: "Rabifast 40 Tablet",
    },
    {
      nom: "Rantac Injection 2ml",
    },
    {
      nom: "Rabopep-L Tablet SR",
    },
    {
      nom: "Rejumet 1000 Tablet SR",
    },
    {
      nom: "Raciper-L Capsule PR",
    },
    {
      nom: "Roliptin 10 Tablet",
    },
    {
      nom: "Respidon 4 Tablet",
    },
    {
      nom: "Revomin Tablet",
    },
    {
      nom: "Rexnerve Plus Softgel Capsule",
    },
    {
      nom: "Ramcor-H 2.5 Tablet",
    },
    {
      nom: "Rootz-M10 Solution",
    },
    {
      nom: "R2 10 Tablet",
    },
    {
      nom: "Ramipres 10 Tablet",
    },
    {
      nom: "Retense OD Tablet ER",
    },
    {
      nom: "Resque 2mg Tablet",
    },
    {
      nom: "Risnia MD 2 Tablet",
    },
    {
      nom: "Ronycold-M Tablet",
    },
    {
      nom: "Revas 25 Tablet",
    },
    {
      nom: "Rabetero-L Capsule SR",
    },
    {
      nom: "Ramisave 2.5 Capsule",
    },
    {
      nom: "Rosutor-A 10/150 Capsule",
    },
    {
      nom: "Raz Plus Tablet",
    },
    {
      nom: "Roslaren 40 Tablet",
    },
    {
      nom: "Revas AT Tablet",
    },
    {
      nom: "Revac-B Plus Pediatric Vaccine",
    },
    {
      nom: "Ramihart-H 2.5 Tablet",
    },
    {
      nom: "Reetor Cream",
    },
    {
      nom: "Rolifin-XL Cream",
    },
    {
      nom: "Rivatane 20 Tablet",
    },
    {
      nom: "Reclimet MR Tablet",
    },
    {
      nom: "Recofast LM Tablet",
    },
    {
      nom: "Ropark XL 4 Tablet",
    },
    {
      nom: "Rostrum-D Capsule",
    },
    {
      nom: "Revas-AM 2.5 Tablet",
    },
    {
      nom: "Rexidin Mouth Wash",
    },
    {
      nom: "Riasis 30mg Tablet",
    },
    {
      nom: "Rotocef 500mg Tablet",
    },
    {
      nom: "Rafacol LS Tablet CR",
    },
    {
      nom: "Ramicure 2.5mg Tablet",
    },
    {
      nom: "Rozstyl 10 Tablet",
    },
    {
      nom: "Ramisave 10 Capsule",
    },
    {
      nom: "Rifarex 550mg Tablet",
    },
    {
      nom: "Rostar-F Tablet",
    },
    {
      nom: "Rospitril Plus 4 Tablet MD",
    },
    {
      nom: "Revelol-CH 50mg/12.5mg Tablet ER",
    },
    {
      nom: "Rami Race 5 Tablet",
    },
    {
      nom: "Rosurica 20 Tablet",
    },
    {
      nom: "Rivofonet Tablet",
    },
    {
      nom: "Rosta 10 Tablet",
    },
    {
      nom: "Rabe-Max DSR Capsule",
    },
    {
      nom: "Ranx 1000 Tablet ER",
    },
    {
      nom: "Rivizole F Ointment",
    },
    {
      nom: "Ranozest 500 SR Tablet",
    },
    {
      nom: "Ramistar-A 2.5 Tablet",
    },
    {
      nom: "Raptic 50 Injection",
    },
    {
      nom: "Relysal Ointment",
    },
    {
      nom: "Remo Zen M 100mg/1000mg Tablet",
    },
    {
      nom: "Rastrol 20 Tablet",
    },
    {
      nom: "Rabetex 20mg Tablet",
    },
    {
      nom: "Revas-H Tablet",
    },
    {
      nom: "Rozution-T Tablet",
    },
    {
      nom: "Ritocom 50 mg/200 mg Tablet",
    },
    {
      nom: "Rovio 5 Tablet",
    },
    {
      nom: "Renvela 800mg Sachet",
    },
    {
      nom: "Rabezox-D Capsule SR",
    },
    {
      nom: "Risnia MD 4 Tablet",
    },
    {
      nom: "Rozula 20mg Tablet",
    },
    {
      nom: "Rovio 20 Tablet",
    },
    {
      nom: "Ramisave H 5 Capsule",
    },
    {
      nom: "Repepsa D 30mg/10mg Capsule",
    },
    {
      nom: "Rexizole 1% Cream",
    },
    {
      nom: "Rubrosin-D Tablet",
    },
    {
      nom: "Roximclav 625 Tablet",
    },
    {
      nom: "Regrowee 5% Gel",
    },
    {
      nom: "Ronycuf S Syrup",
    },
    {
      nom: "Recosulin R 40IU/ml Injection",
    },
    {
      nom: "Respicure FM 10 mg/120 mg Tablet",
    },
    {
      nom: "Rebeat 2.5mg Tablet",
    },
    {
      nom: "Rosbest 10 Tablet",
    },
    {
      nom: "Rebeat 2.5mg Tablet",
    },
    {
      nom: "Rosbest 10 Tablet",
    },
    {
      nom: "Rexidin Mouth Wash",
    },
    {
      nom: "Rizora ODS 10 Disintegrating Strip",
    },
    {
      nom: "Rosupack 20 Tablet",
    },
    {
      nom: "Rozustat 10 D Tablet",
    },
    {
      nom: "Rizora ODS 5 Disintegrating Strip",
    },
    {
      nom: "Rosave D 20 Tablet",
    },
    {
      nom: "Rosave D 20 Tablet",
    },
    {
      nom: "Regrow 5% Solution",
    },
    {
      nom: "Rosucia-Gold Capsule",
    },
    {
      nom: "Riax-M XR 5mg/1000mg Tablet",
    },
    {
      nom: "Rabio Vaccine",
    },
    {
      nom: "Raptac Tablet",
    },
    {
      nom: "Ramilace 5mg Tablet",
    },
    {
      nom: "Spexib Capsule",
    },
    {
      nom: "Stemetil MD Tablet",
    },
    {
      nom: "Sumo Tablet",
    },
    {
      nom: "Sompraz D 40 Capsule SR",
    },
    {
      nom: "Signoflam Tablet",
    },
    {
      nom: "Surfaz-SN Cream",
    },
    {
      nom: "Solvin Cold Tablet",
    },
    {
      nom: "Sompraz 40 Tablet",
    },
    {
      nom: "Stugeron Tablet",
    },
    {
      nom: "Sucral-O Suspension",
    },
    {
      nom: "Sorbitrate 5 Tablet",
    },
    {
      nom: "Sibelium 10mg Tablet",
    },
    {
      nom: "Sucrafil O Gel Sugar Free",
    },
    {
      nom: "Septran DS 800mg/160mg Tablet",
    },
    {
      nom: "Smuth Cream",
    },
    {
      nom: "Sumo Cold Tablet",
    },
    {
      nom: "Silodal 8 Capsule",
    },
    {
      nom: "Syndopa Plus Tablet",
    },
    {
      nom: "Silodal-D 8 Capsule",
    },
    {
      nom: "Susten SR 200 Tablet",
    },
    {
      nom: "Susten 200 Soft Gelatin Capsule",
    },
    {
      nom: "Seroflo 250 Inhaler",
    },
    {
      nom: "Stamlo 5 Tablet",
    },
    {
      nom: "Suhagra 100 Tablet",
    },
    {
      nom: "Sucral Suspension",
    },
    {
      nom: "Sucral Ano Cream",
    },
    {
      nom: "Skinlite Cream",
    },
    {
      nom: "Spasmonil 20mg/325mg Tablet",
    },
    {
      nom: "Skinshine Cream",
    },
    {
      nom: "Susten SR 300 Tablet",
    },
    {
      nom: "Sucrafil Suspension Sugar Free",
    },
    {
      nom: "Strocit Plus Tablet",
    },
    {
      nom: "Sompraz L Capsule SR",
    },
    {
      nom: "Satrogyl-O Tablet",
    },
    {
      nom: "Sporidex 500 Capsule",
    },
    {
      nom: "Stemetil Injection",
    },
    {
      nom: "Solvin Cold Syrup",
    },
    {
      nom: "Stugeron Forte Tablet",
    },
    {
      nom: "Stugeron Plus Tablet",
    },
    {
      nom: "Soliten 5mg Tablet",
    },
    {
      nom: "Swich CV 325 Tablet",
    },
    {
      nom: "Swich 200 Tablet",
    },
    {
      nom: "Sitcom Tablet",
    },
    {
      nom: "Suhagra 50 Tablet",
    },
    {
      nom: "Sinarest LP New Tablet",
    },
    {
      nom: "Sizodon MD 0.5 Tablet",
    },
    {
      nom: "Serta 25 Tablet",
    },
    {
      nom: "Serta 50 Tablet",
    },
    {
      nom: "Sibelium 5mg Tablet",
    },
    {
      nom: "Sinarest Paediatric Drops",
    },
    {
      nom: "SN 15 Plus Tablet",
    },
    {
      nom: "Sensiclav 625 Tablet",
    },
    {
      nom: "Strocit 500 Tablet",
    },
    {
      nom: "Sporidex-CV 750 Tablet ER",
    },
    {
      nom: "Storvas 10 Tablet",
    },
    {
      nom: "Symbal 20 Tablet",
    },
    {
      nom: "Supacef 1.5gm Powder for Injection",
    },
    {
      nom: "Sysron-N Tablet",
    },
    {
      nom: "Stamlo Beta Tablet",
    },
    {
      nom: "Solu-Medrol 1gm Injection",
    },
    {
      nom: "Sorbitrate 10 Tablet",
    },
    {
      nom: "Serenace Injection 1ml",
    },
    {
      nom: "Secnil Forte Tablet",
    },
    {
      nom: "Seloken XL 25mg Tablet",
    },
    {
      nom: "Stalopam 10 Tablet",
    },
    {
      nom: "Sebonac Gel",
    },
    {
      nom: "Sompraz IT Capsule SR",
    },
    {
      nom: "Setolac 300 ER Tablet",
    },
    {
      nom: "Silofast D 8 Tablet",
    },
    {
      nom: "Soha 0.1% Eye Drop",
    },
    {
      nom: "Starpress XL 25 Tablet",
    },
    {
      nom: "Sumo L 650 Tablet",
    },
    {
      nom: "Sotret 20mg Capsule",
    },
    {
      nom: "Styptovit E 500mg Tablet",
    },
    {
      nom: "Stanlip 145mg Tablet",
    },
    {
      nom: "Sompraz HP Combipack",
    },
    {
      nom: "Sumo L DS Suspension",
    },
    {
      nom: "Silofast 8 Capsule",
    },
    {
      nom: "Starpress XL 50 Tablet",
    },
    {
      nom: "Supirocin Ointment",
    },
    {
      nom: "Spasmodart Tablet",
    },
    {
      nom: "Surfaz Cream",
    },
    {
      nom: "Sensival 25 Tablet",
    },
    {
      nom: "Solvin Cold AF Syrup",
    },
    {
      nom: "Stator 10 Tablet",
    },
    {
      nom: "Solvin Cold Drop",
    },
    {
      nom: "Super Manforce Tablet",
    },
    {
      nom: "Seroflo 250 Rotacap",
    },
    {
      nom: "Safexim 200mg Tablet",
    },
    {
      nom: "Smuth Capsule",
    },
    {
      nom: "Silybon Suspension",
    },
    {
      nom: "Syscan 150 Capsule",
    },
    {
      nom: "Sebowash  Shampoo",
    },
    {
      nom: "Stiloz 100 Tablet",
    },
    {
      nom: "Sustanon 250 Injection",
    },
    {
      nom: "Seradic-P Tablet",
    },
    {
      nom: "Scaboma Lotion",
    },
    {
      nom: "Sysron-NCR Tablet",
    },
    {
      nom: "Sofinox Cream",
    },
    {
      nom: "Sizodon LS Tablet",
    },
    {
      nom: "Siloderm Mixi Cream",
    },
    {
      nom: "Susten 400 Soft Gelatin Capsule",
    },
    {
      nom: "Stugil Tablet",
    },
    {
      nom: "Stablanz-PV Tablet",
    },
    {
      nom: "Swich 100 Dry Syrup",
    },
    {
      nom: "Snake Venom Antiserum Injection",
    },
    {
      nom: "Solicept 5 Tablet",
    },
    {
      nom: "Swich 50 Dry Syrup",
    },
    {
      nom: "Skelebenz 15 Capsule ER",
    },
    {
      nom: "Sumo L Plus Paediatric Suspension",
    },
    {
      nom: "Seloken XL 50mg Tablet",
    },
    {
      nom: "Sizodon Plus Tablet",
    },
    {
      nom: "Syndopa CR Tablet",
    },
    {
      nom: "Superspas RF Injection",
    },
    {
      nom: "Susten 100 Injection",
    },
    {
      nom: "Sumo L Drops",
    },
    {
      nom: "Stamlo 2.5 Tablet",
    },
    {
      nom: "Stamlo-T Tablet",
    },
    {
      nom: "Sildoo 8 Capsule",
    },
    {
      nom: "Storvas 20 Tablet",
    },
    {
      nom: "Storvas 40 Tablet",
    },
    {
      nom: "Strocit Injection",
    },
    {
      nom: "Sylate 500 Tablet",
    },
    {
      nom: "Sufrate LA Cream",
    },
    {
      nom: "Spasmonil Plus Tablet",
    },
    {
      nom: "Solacid-O Suspension Sugar Free",
    },
    {
      nom: "Sedogest 300mg Tablet",
    },
    {
      nom: "Sebifin Tablet",
    },
    {
      nom: "Silnafil 25mg Tablet",
    },
    {
      nom: "Suhagra 25 Tablet",
    },
    {
      nom: "Suvida Tablet",
    },
    {
      nom: "Sotret NF 16mg Capsule",
    },
    {
      nom: "Soliten 10mg Tablet",
    },
    {
      nom: "Solvin-OD Tablet SR",
    },
    {
      nom: "Sporidex AF 750 Tablet ER",
    },
    {
      nom: "Suminat 50 Tablet",
    },
    {
      nom: "Stablon Tablet",
    },
    {
      nom: "Septran Paediatric Oral Suspension",
    },
    {
      nom: "Swich Drops",
    },
    {
      nom: "Sepgard AR Gel",
    },
    {
      nom: "Sucral MU Ointment",
    },
    {
      nom: "Solvin LS Syrup",
    },
    {
      nom: "Sumo L 125 Suspension",
    },
    {
      nom: "Spenzo 0.5 Tablet",
    },
    {
      nom: "Sorbidiol 300 Tablet",
    },
    {
      nom: "Sorliv Oral Solution",
    },
    {
      nom: "Sartel 40 Tablet",
    },
    {
      nom: "Stafcure 500 Tablet",
    },
    {
      nom: "Sartel AM Tablet",
    },
    {
      nom: "Stator-F Tablet",
    },
    {
      nom: "Siphene Tablet",
    },
    {
      nom: "Sinus 77 Tablet",
    },
    {
      nom: "Suprox SR Tablet",
    },
    {
      nom: "Sotret 10mg Capsule",
    },
    {
      nom: "Saltum Tablet",
    },
    {
      nom: "Solvin Cold DS Syrup",
    },
    {
      nom: "Serlift 50 Tablet",
    },
    {
      nom: "Sucraday O Syrup",
    },
    {
      nom: "Stelbid Tablet",
    },
    {
      nom: "Sizopin 25 Tablet",
    },
    {
      nom: "Susten 200 Injection",
    },
    {
      nom: "Sparacid DS Suspension",
    },
    {
      nom: "Supatret 0.04 Aqueous Gel",
    },
    {
      nom: "Seroflo 125 Inhaler",
    },
    {
      nom: "Snapit 85mg/500mg Tablet",
    },
    {
      nom: "Sompraz D 20 Capsule SR",
    },
    {
      nom: "Sompraz 20 Tablet",
    },
    {
      nom: "Serta 100 Tablet",
    },
    {
      nom: "Synriam 150/750mg Tablet",
    },
    {
      nom: "Syntran 200 Capsule",
    },
    {
      nom: "Soventus Jr Syrup",
    },
    {
      nom: "Sulpitac 50 Tablet",
    },
    {
      nom: "Scabelice Lotion",
    },
    {
      nom: "Silotime 8 Capsule",
    },
    {
      nom: "Signoflam-TH 4 Tablet",
    },
    {
      nom: "Syndopa CR 125 Tablet",
    },
    {
      nom: "Sporidex 250 Capsule",
    },
    {
      nom: "Stalopam 5 Tablet",
    },
    {
      nom: "Solvin Cold AF Oral Drops",
    },
    {
      nom: "Stafcure CV 500 Tablet",
    },
    {
      nom: "Sumo L IV Infusion",
    },
    {
      nom: "Silybon 70mg Tablet",
    },
    {
      nom: "Sylate T 500mg/250mg Tablet",
    },
    {
      nom: "Solitral Capsule ER",
    },
    {
      nom: "Sulpitac 100 Tablet",
    },
    {
      nom: "Saril Tablet",
    },
    {
      nom: "Stopache Tablet",
    },
    {
      nom: "Sartel Trio Tablet",
    },
    {
      nom: "Syntran Capsule",
    },
    {
      nom: "Susten 300 Soft Gelatin Capsule",
    },
    {
      nom: "Sternon-S Lotion",
    },
    {
      nom: "Sulisent 100mg Tablet",
    },
    {
      nom: "Step-UP Syrup",
    },
    {
      nom: "Solu-Medrol 500mg Injection",
    },
    {
      nom: "Sporidex 100mg Paediatric Drops",
    },
    {
      nom: "Silodal 4 Capsule",
    },
    {
      nom: "Stamlo D Tablet",
    },
    {
      nom: "Synca Eye Drop",
    },
    {
      nom: "Scabex Lotion",
    },
    {
      nom: "Siphene 100 Tablet",
    },
    {
      nom: "Symbicort 160mcg/4.5mcg Turbuhaler",
    },
    {
      nom: "Soliact 5 Tablet",
    },
    {
      nom: "Sudin Cold Tablet",
    },
    {
      nom: "Sistal Forte Tablet",
    },
    {
      nom: "Semi Reclimet 40mg/500mg Tablet",
    },
    {
      nom: "Sibofix 400 Tablet",
    },
    {
      nom: "Sartel-LN 40 Tablet",
    },
    {
      nom: "Sevcar 400 Tablet",
    },
    {
      nom: "Sizopin 100mg Tablet",
    },
    {
      nom: "Sgltr Tablet",
    },
    {
      nom: "Serowel Tablet",
    },
    {
      nom: "Sizodon Forte Tablet",
    },
    {
      nom: "S-Mucolite Syrup",
    },
    {
      nom: "Symbal 30 Tablet",
    },
    {
      nom: "Superspas Oral Gel Orange Sugar Free",
    },
    {
      nom: "Seradic-AP Tablet",
    },
    {
      nom: "Sparacid O Oral Suspension Mint No Added Sugar",
    },
    {
      nom: "Simbrinza Ophthalmic Suspension",
    },
    {
      nom: "Sporidex AF 375 Tablet ER",
    },
    {
      nom: "Sildoo-D8 Capsule Combipack",
    },
    {
      nom: "Sefdin Capsule",
    },
    {
      nom: "Scabisin Lotion",
    },
    {
      nom: "Suminat 25 Tablet",
    },
    {
      nom: "Supatret C Aqueous Gel",
    },
    {
      nom: "Sucral Cream",
    },
    {
      nom: "Skin Shine Cream",
    },
    {
      nom: "Sizodon 1 Tablet",
    },
    {
      nom: "Serlift 25 Tablet",
    },
    {
      nom: "Sonaderm-NM Cream",
    },
    {
      nom: "Suthin Gold Eye Drop",
    },
    {
      nom: "Suthin Eye Drop",
    },
    {
      nom: "Spectra 25mg Capsule",
    },
    {
      nom: "Sartel-Beta 50 Tablet ER",
    },
    {
      nom: "Softvisc New Softvisc Lubricant Eye Drop",
    },
    {
      nom: "Soventus-LS Syrup",
    },
    {
      nom: "Smulax Liquid",
    },
    {
      nom: "Smuth Fiber",
    },
    {
      nom: "Sirdalud 2mg Tablet",
    },
    {
      nom: "Solvin Cough Tablet",
    },
    {
      nom: "Sorvate Ointment",
    },
    {
      nom: "Semi-Amaryl Tablet",
    },
    {
      nom: "Sovihep V Tablet",
    },
    {
      nom: "Susten 8% Gel",
    },
    {
      nom: "Saflutan Eye Drop",
    },
    {
      nom: "Spegra Tablet",
    },
    {
      nom: "Seroflo 250 Synchrobreathe",
    },
    {
      nom: "Syscan 200 Capsule",
    },
    {
      nom: "Sibolone Tablet",
    },
    {
      nom: "Sorbidiol 150 Tablet",
    },
    {
      nom: "Seriva Cream",
    },
    {
      nom: "Sartel H 40 Tablet",
    },
    {
      nom: "Softdrops Liquigel",
    },
    {
      nom: "Solvin-EX Expectorant Passion Fruit Sugar Free",
    },
    {
      nom: "Solu-Medrol 125mg Injection",
    },
    {
      nom: "Solvin-DX Syrup Raspberry Sugar Free",
    },
    {
      nom: "S-Numlo 2.5 Tablet",
    },
    {
      nom: "Symbiotik Capsule",
    },
    {
      nom: "Sensiclav BD 228.5mg Dry Syrup",
    },
    {
      nom: "Sifasi 5000IU Injection",
    },
    {
      nom: "Susten 100 Soft Gelatin Capsule",
    },
    {
      nom: "Sebifin Plus Cream",
    },
    {
      nom: "Salbair 50mcg Transhaler",
    },
    {
      nom: "Sylate 250 Tablet",
    },
    {
      nom: "Susten SR 400 Tablet",
    },
    {
      nom: "Seroflo 100 Rotacaps",
    },
    {
      nom: "Spastone Tablet",
    },
    {
      nom: "Sizodon Oral Solution",
    },
    {
      nom: "Silvacure Plus Cream",
    },
    {
      nom: "Suganril Tablet",
    },
    {
      nom: "Superia DSR Capsule",
    },
    {
      nom: "Siphene -M Tablet",
    },
    {
      nom: "Symhylo 1% Eye Drop",
    },
    {
      nom: "Soha 0.1% Eye Drop",
    },
    {
      nom: "Supermet XL 50 Tablet",
    },
    {
      nom: "Sreyas Tablet",
    },
    {
      nom: "Sartel-Beta 25 Tablet ER",
    },
    {
      nom: "Sumo L 120 Suspension Strawberry",
    },
    {
      nom: "Salbetol 4mg Tablet",
    },
    {
      nom: "Strone 200 Capsule",
    },
    {
      nom: "Synaptol SR 150 Tablet",
    },
    {
      nom: "Sporanox Capsule",
    },
    {
      nom: "Smarti-M Tablet",
    },
    {
      nom: "S-Numlo 5 Tablet",
    },
    {
      nom: "Solitair Tablet",
    },
    {
      nom: "SR Pevesca Plus 75 Tablet",
    },
    {
      nom: "Spasmindon Paediatric Drops",
    },
    {
      nom: "Sysfol Plus Tablet",
    },
    {
      nom: "Skinbrite Cream",
    },
    {
      nom: "Sinate -OD Tablet",
    },
    {
      nom: "Seromune 500 Tablet",
    },
    {
      nom: "Soltus 50 Tablet",
    },
    {
      nom: "Solvin Cough Syrup Sugar Free",
    },
    {
      nom: "Sudif Cream",
    },
    {
      nom: "Selgin Tablet",
    },
    {
      nom: "Seradic Tablet",
    },
    {
      nom: "Salbair-I Transhaler",
    },
    {
      nom: "Synflorix Vaccine",
    },
    {
      nom: "Syncapone 100 Tablet",
    },
    {
      nom: "Syndopa 275 Tablet",
    },
    {
      nom: "Sizodon 2 Tablet",
    },
    {
      nom: "Stelbid 2 Tablet",
    },
    {
      nom: "Susten VT 200 Tablet",
    },
    {
      nom: "Sizopin 50 Tablet",
    },
    {
      nom: "Stamlo 10 Tablet",
    },
    {
      nom: "Starpress-AM XL 50 Tablet",
    },
    {
      nom: "Stator 20 Tablet",
    },
    {
      nom: "Starclav 625 Tablet",
    },
    {
      nom: "Sufrate O Suspension",
    },
    {
      nom: "Storfib 145 Tablet",
    },
    {
      nom: "Sustanon 100 Injection",
    },
    {
      nom: "Soft Tears Eye Drop",
    },
    {
      nom: "Safecet Tablet",
    },
    {
      nom: "Safepodox 200mg Tablet DT",
    },
    {
      nom: "Soframax Cream",
    },
    {
      nom: "Solicept 10 Tablet",
    },
    {
      nom: "Surfaz Dusting Powder",
    },
    {
      nom: "Stoplos A Plus Tablet Lemon",
    },
    {
      nom: "SR Fil Enema",
    },
    {
      nom: "Sporidex Oral Suspension",
    },
    {
      nom: "Sebifin Cream",
    },
    {
      nom: "Salbair Neb 0.63 Transpules",
    },
    {
      nom: "Serenace Liquid",
    },
    {
      nom: "Sorvate C Ointment",
    },
    {
      nom: "Solfe Tablet",
    },
    {
      nom: "Sucramal-O Oral Suspension",
    },
    {
      nom: "Silocap 8 Capsule",
    },
    {
      nom: "Swich 100 DT Tablet",
    },
    {
      nom: "Sicriptin Tablet",
    },
    {
      nom: "Sysron-NCR 15 Tablet",
    },
    {
      nom: "Storvas 80 Tablet",
    },
    {
      nom: "Skinshine Cream",
    },
    {
      nom: "Swich CV 50 Dry Syrup",
    },
    {
      nom: "Sevcar 800 Tablet",
    },
    {
      nom: "Silotrif 8 Capsule",
    },
    {
      nom: "Stablanz Tablet",
    },
    {
      nom: "Sulpitac 200 Tablet",
    },
    {
      nom: "Supermet XL 25 Tablet",
    },
    {
      nom: "Stelbid Spas 80mg/50mg Tablet",
    },
    {
      nom: "Sporidex DS 250mg Tablet",
    },
    {
      nom: "Syntran SB Capsule",
    },
    {
      nom: "Soventus-DC Oral Suspension",
    },
    {
      nom: "S-Celepra 10 Tablet",
    },
    {
      nom: "Sibofix 550 Tablet",
    },
    {
      nom: "Staphonex 500mg Capsule",
    },
    {
      nom: "Sartel 20 Tablet",
    },
    {
      nom: "Szetalo 10 Tablet",
    },
    {
      nom: "Sartel-C 40 Tablet",
    },
    {
      nom: "Spirodin 650 Tablet MR",
    },
    {
      nom: "Seradic-Plus Tablet",
    },
    {
      nom: "Spiromide Tablet",
    },
    {
      nom: "Silofast 4 Capsule",
    },
    {
      nom: "Storax PR Tablet",
    },
    {
      nom: "Synvisc Hylan GF 20mg Injection",
    },
    {
      nom: "Smartilon 20 Tablet",
    },
    {
      nom: "Stafcure 250 Tablet",
    },
    {
      nom: "Sodanet 500mg Tablet",
    },
    {
      nom: "Sofraxine Cream",
    },
    {
      nom: "Sinarest-AF Paediatric Drops",
    },
    {
      nom: "Seradic-MR Tablet",
    },
    {
      nom: "Seroflo 500 Rotacap",
    },
    {
      nom: "Senzmox Eye Drop",
    },
    {
      nom: "Sotalar 40 Tablet",
    },
    {
      nom: "SzHH Cream",
    },
    {
      nom: "Starpress R XL 25 Tablet",
    },
    {
      nom: "Saferet 10 Tablet",
    },
    {
      nom: "Sertaspor Cream",
    },
    {
      nom: "Supirocin Cream",
    },
    {
      nom: "Starpress XL 12.5 Tablet",
    },
    {
      nom: "Sistal Plus Tablet",
    },
    {
      nom: "Synpirox Cream",
    },
    {
      nom: "Saptob Eye Drop",
    },
    {
      nom: "Swich O Tablet",
    },
    {
      nom: "Sunapro Tablet",
    },
    {
      nom: "Sonirab-DSR Capsule",
    },
    {
      nom: "Supirocin-B Plus Ointment",
    },
    {
      nom: "Sofirash Cream",
    },
    {
      nom: "Sifasi Aqua 5000IU Injection",
    },
    {
      nom: "Sifasi Aqua 5000IU Injection",
    },
    {
      nom: "S Citadep 10 Tablet",
    },
    {
      nom: "Stonil Oral Solution",
    },
    {
      nom: "Samlokind-AT Tablet",
    },
    {
      nom: "Synaps-NT Tablet",
    },
    {
      nom: "Spiromont-F Tablet",
    },
    {
      nom: "Somazina Plus 400 Tablet",
    },
    {
      nom: "Statpure 20 Tablet",
    },
    {
      nom: "Swiftolac Syrup",
    },
    {
      nom: "Softee Cream",
    },
    {
      nom: "Stator CV 10mg/75mg Capsule",
    },
    {
      nom: "Sysnit-SR Tablet",
    },
    {
      nom: "Smartinor CR 10mg Tablet",
    },
    {
      nom: "Sebumclear N Gel",
    },
    {
      nom: "Sucralcoat Ano Rectal Cream",
    },
    {
      nom: "Spurge Tablet",
    },
    {
      nom: "Sertima 50 Tablet",
    },
    {
      nom: "Starcad-Beta 25 Tablet ER",
    },
    {
      nom: "Stanhist 10 Tablet",
    },
    {
      nom: "Spasmonil Drop",
    },
    {
      nom: "Safexim 200 Tablet DT",
    },
    {
      nom: "Skintop Cream",
    },
    {
      nom: "Silybon Suspension",
    },
    {
      nom: "Serlift 100 Tablet",
    },
    {
      nom: "Semi Amaryl M Tablet PR",
    },
    {
      nom: "Synaptol 50 Tablet",
    },
    {
      nom: "Safeova Tablet",
    },
    {
      nom: "Symbiotik XL 625 Tablet",
    },
    {
      nom: "Scabiped Lotion",
    },
    {
      nom: "Serax D Tablet",
    },
    {
      nom: "Seretide 50mcg/500mcg Accuhaler",
    },
    {
      nom: "Salazar DS Tablet",
    },
    {
      nom: "Sclerifuma 240 Capsule DR",
    },
    {
      nom: "Smartilon 30 Tablet",
    },
    {
      nom: "Silodal-D4 Tablet Combipack",
    },
    {
      nom: "Symbicort 320mcg/9mcg Turbuhaler",
    },
    {
      nom: "Sufrate TP Ointment",
    },
    {
      nom: "Storvas EZ 10 Tablet",
    },
    {
      nom: "Storax 500 Tablet",
    },
    {
      nom: "Soltus 100 Tablet",
    },
    {
      nom: "Siromus 1mg Tablet",
    },
    {
      nom: "Silagra 100mg Tablet",
    },
    {
      nom: "Senseit Gel",
    },
    {
      nom: "Sporidex Redimix Oral Suspension",
    },
    {
      nom: "Sensiclav 375 Tablet",
    },
    {
      nom: "Stimufol 2.5mg Tablet",
    },
    {
      nom: "Somagesic Forte Tablet",
    },
    {
      nom: "Sympta 20 Tablet",
    },
    {
      nom: "Sonaxa NT 75mg/10mg Tablet",
    },
    {
      nom: "Septasteril Tablet",
    },
    {
      nom: "Spasmopriv 100mg Capsule",
    },
    {
      nom: "Strozina Plus Tablet",
    },
    {
      nom: "Sucral Tablet",
    },
    {
      nom: "Skinn-C Soap",
    },
    {
      nom: "Sizopin 200 Tablet",
    },
    {
      nom: "Solvin LS Syrup",
    },
    {
      nom: "Safediclo 20mg/100mg Capsule SR",
    },
    {
      nom: "Switglim-M 2/500 Tablet PR",
    },
    {
      nom: "Soliact 10 Tablet",
    },
    {
      nom: "Synaptol SR 300 Tablet",
    },
    {
      nom: "Superia Tablet",
    },
    {
      nom: "Switglim MV 2/0.3 Tablet ER",
    },
    {
      nom: "Storvas 5 Tablet",
    },
    {
      nom: "Suppol Child 170mg Suppository",
    },
    {
      nom: "Superia L Capsule SR",
    },
    {
      nom: "Seroflo 125 Synchrobreathe",
    },
    {
      nom: "SII TD-Vac Vaccine",
    },
    {
      nom: "Starpress R XL 50 Tablet",
    },
    {
      nom: "Silverkind Nanofine Gel",
    },
    {
      nom: "Sporidex 125 Tablet DT",
    },
    {
      nom: "Spafast D 2mg/37.5mg Injection",
    },
    {
      nom: "Starvog 0.3 Tablet MD",
    },
    {
      nom: "Stalopam 20 Tablet",
    },
    {
      nom: "Salbair-I 100mcg/40mcg Transcaps",
    },
    {
      nom: "Sucral Kid Oral Suspension",
    },
    {
      nom: "Swich XP 1000mg Injection",
    },
    {
      nom: "Scabelice Lotion",
    },
    {
      nom: "Sildoo 4 Capsule",
    },
    {
      nom: "Supacef 750mg Injection",
    },
    {
      nom: "Stozic 50 Tablet",
    },
    {
      nom: "Sequadra Inhaler",
    },
    {
      nom: "Spirodin-AX Tablet",
    },
    {
      nom: "Smarti Tablet",
    },
    {
      nom: "Sofinox Cream",
    },
    {
      nom: "Sofinox Cream",
    },
    {
      nom: "Strone SR 200 Tablet",
    },
    {
      nom: "Sertee 50 Tablet",
    },
    {
      nom: "Starpress T 25-XL Tablet",
    },
    {
      nom: "Salbetol 2 Tablet",
    },
    {
      nom: "Sporidex Redimix Suspension",
    },
    {
      nom: "Safecet 10 Tablet",
    },
    {
      nom: "Sprintas 100mg Capsule",
    },
    {
      nom: "Salbair I Neb 0.63mg Transpules 2.5ml",
    },
    {
      nom: "Stugil D Tablet",
    },
    {
      nom: "Seacure -SR 200 Tablet",
    },
    {
      nom: "Synaptol 100 Tablet",
    },
    {
      nom: "Sicriptin 1.25 Tablet",
    },
    {
      nom: "Seretide 250 Evohaler",
    },
    {
      nom: "Sugamet MC 500 Tablet SR",
    },
    {
      nom: "Synclar Paediatric Dry Syrup Banana",
    },
    {
      nom: "Synobrim-T Eye Drops",
    },
    {
      nom: "Spenzo Depot 40 Injection",
    },
    {
      nom: "Selzic 300 Tablet",
    },
    {
      nom: "Syncapone 50 Tablet",
    },
    {
      nom: "Symbal 40 Tablet",
    },
    {
      nom: "Seriva Cream",
    },
    {
      nom: "Sibofix 200 Tablet",
    },
    {
      nom: "Sotret 30mg Capsule",
    },
    {
      nom: "Syncapone 150 Tablet",
    },
    {
      nom: "Seacure SR 300 Tablet",
    },
    {
      nom: "Sertima 100 Tablet",
    },
    {
      nom: "Starpress-AM XL 25 Tablet",
    },
    {
      nom: "Sclerifuma 120 Capsule DR",
    },
    {
      nom: "Sentidor Gel",
    },
    {
      nom: "Serutan 212.5mg Tablet",
    },
    {
      nom: "Simvotin 10 Tablet",
    },
    {
      nom: "Sorifix Solo Ointment",
    },
    {
      nom: "Sporidex Redimix Drop Orange",
    },
    {
      nom: "Solikem 5 Tablet",
    },
    {
      nom: "Spiroflut Nasal Spray",
    },
    {
      nom: "Sizodon MD 1 Tablet",
    },
    {
      nom: "Sterio 4mg Tablet",
    },
    {
      nom: "Strocit Injection",
    },
    {
      nom: "Salbair 100mcg Transcaps",
    },
    {
      nom: "Soha Liquigel",
    },
    {
      nom: "Sepgard Solution",
    },
    {
      nom: "Somazina 500mg Tablet",
    },
    {
      nom: "Sertagress 50mg Tablet",
    },
    {
      nom: "Sandimmun Neoral 50mg Soft Gelatin Capsule",
    },
    {
      nom: "Sizon 5 Tablet",
    },
    {
      nom: "Sodicarb Tablet",
    },
    {
      nom: "Supermet-AM Tablet PR",
    },
    {
      nom: "Solian 100mg Tablet",
    },
    {
      nom: "Spiroflut A Nasal Spray",
    },
    {
      nom: "Step-UP Oral Drops",
    },
    {
      nom: "Seroflo 50 Inhaler",
    },
    {
      nom: "Setrabet 2% Cream",
    },
    {
      nom: "S-Methiwave 200 Tablet",
    },
    {
      nom: "Skizoril 100mg Tablet",
    },
    {
      nom: "Scaboma Lotion",
    },
    {
      nom: "S-Celepra 5 Tablet",
    },
    {
      nom: "Sudin D Syrup",
    },
    {
      nom: "Subsyde-CR Capsule",
    },
    {
      nom: "Solvin Decongestant Syrup Sugar Free",
    },
    {
      nom: "Seloken XL 100mg Tablet",
    },
    {
      nom: "Spiromont-F 180 Tablet",
    },
    {
      nom: "Sizodon 4 Tablet",
    },
    {
      nom: "Salobet Ointment",
    },
    {
      nom: "Synoflex Tablet",
    },
    {
      nom: "Suminat 100 Tablet",
    },
    {
      nom: "Sertagress 25mg Tablet",
    },
    {
      nom: "Surfaz-O Tablet",
    },
    {
      nom: "Sentim-SF Toothpaste",
    },
    {
      nom: "Saferet 20 Tablet",
    },
    {
      nom: "Starcad-Beta 50 Tablet ER",
    },
    {
      nom: "Strone AQ Injection",
    },
    {
      nom: "Sifasi 10000IU Injection",
    },
    {
      nom: "Scalnex CT Lotion",
    },
    {
      nom: "Strocit Oral Drops",
    },
    {
      nom: "S-Amlosafe 2.5 Tablet",
    },
    {
      nom: "Salbair-B Transhaler",
    },
    {
      nom: "Salobet Ointment",
    },
    {
      nom: "Sartel AM 80 Tablet",
    },
    {
      nom: "Skizoril 50mg Tablet",
    },
    {
      nom: "Sartel 80 Tablet",
    },
    {
      nom: "Skizoril 25mg Tablet",
    },
    {
      nom: "Suprox Tablet",
    },
    {
      nom: "Soltus 200 Tablet",
    },
    {
      nom: "Symbal 60 Tablet",
    },
    {
      nom: "Sulpitac 300 Tablet",
    },
    {
      nom: "Sizon Forte Tablet",
    },
    {
      nom: "Sertaspor Cream",
    },
    {
      nom: "Surfaz Topical Solution",
    },
    {
      nom: "Silotrif-D 8 Capsule Combipack",
    },
    {
      nom: "S-Amlosafe 5 Tablet",
    },
    {
      nom: "Silverstream Liquid",
    },
    {
      nom: "Strone SR 300 Tablet",
    },
    {
      nom: "SLC Face Wash",
    },
    {
      nom: "Strone 100 Capsule",
    },
    {
      nom: "Silotime 4 Capsule",
    },
    {
      nom: "Solet Tablet",
    },
    {
      nom: "Suppol Baby 80mg Suppository",
    },
    {
      nom: "Sucrapen-O Suspension",
    },
    {
      nom: "Salbair I Neb 1.25 Transpules 2.5ml",
    },
    {
      nom: "Sibastin Tablet",
    },
    {
      nom: "Sertima 25mg Tablet",
    },
    {
      nom: "Salista C Ointment",
    },
    {
      nom: "Sunheal Pure Cream",
    },
    {
      nom: "Stator 80 Tablet",
    },
    {
      nom: "S Citadep 5 Tablet",
    },
    {
      nom: "Steri Mouth Wash",
    },
    {
      nom: "Stamlo-T 80 Tablet",
    },
    {
      nom: "Sternon-S Ointment",
    },
    {
      nom: "Sino Nasal Spray",
    },
    {
      nom: "Sulpitac 400 Tablet",
    },
    {
      nom: "Spenzo 3 Tablet",
    },
    {
      nom: "Sulbacef 1000mg/500mg Injection",
    },
    {
      nom: "Starvog 0.2 Tablet MD",
    },
    {
      nom: "Septiace Ointment",
    },
    {
      nom: "Sermind 50 Tablet",
    },
    {
      nom: "Suncros Soft 2% Cream",
    },
    {
      nom: "Shaltop A Solution",
    },
    {
      nom: "Spirodin-M Tablet SR",
    },
    {
      nom: "Soltus OD 100 Tablet SR",
    },
    {
      nom: "Sucramal Suspension",
    },
    {
      nom: "Sucralrose Suspension Orange Sugar Free",
    },
    {
      nom: "Sertin 50 Tablet",
    },
    {
      nom: "Synpirox Vaginal Cream",
    },
    {
      nom: "Seleno Gel",
    },
    {
      nom: "Sonirab 20 Tablet",
    },
    {
      nom: "Stancort 40mg Injection",
    },
    {
      nom: "Salisia KT Soap",
    },
    {
      nom: "Solian 200mg Tablet",
    },
    {
      nom: "Scabiped Lotion",
    },
    {
      nom: "Sustameto 50 Tablet ER",
    },
    {
      nom: "Sucral Povi Ointment",
    },
    {
      nom: "Serocit 46.7% Injection",
    },
    {
      nom: "Spiromont-A Tablet",
    },
    {
      nom: "Sonaxa 75 Capsule",
    },
    {
      nom: "Strolin P 400 Tablet",
    },
    {
      nom: "Sizodon 3 Tablet",
    },
    {
      nom: "Sertaspor Cream",
    },
    {
      nom: "Spiromont-FA Tablet SR",
    },
    {
      nom: "Salicure Ointment",
    },
    {
      nom: "Skizoril 200 Tablet",
    },
    {
      nom: "Starcad-T 50 Tablet ER",
    },
    {
      nom: "Starpress-H 50 XL Tablet",
    },
    {
      nom: "Scaboma Soap",
    },
    {
      nom: "Statix 20 Tablet",
    },
    {
      nom: "S-Amcard 5 Tablet",
    },
    {
      nom: "Seretide 50mcg/250mcg Accuhaler",
    },
    {
      nom: "Somazina P Tablet",
    },
    {
      nom: "Simvotin 40 Tablet",
    },
    {
      nom: "Sulpitac OD 200mg Tablet",
    },
    {
      nom: "Syra Softgel Capsule",
    },
    {
      nom: "Sonirab-D Tablet",
    },
    {
      nom: "Soltus OD 300mg Tablet",
    },
    {
      nom: "Sucralcoat O Suspension",
    },
    {
      nom: "Singulair 4mg Chewable Tablet",
    },
    {
      nom: "Supermet XL 100 Tablet",
    },
    {
      nom: "Suxinate Tablet",
    },
    {
      nom: "Sugamet MC 1000 Tablet PR",
    },
    {
      nom: "Sildaprep Tablet",
    },
    {
      nom: "Salitol Tablet",
    },
    {
      nom: "Selzic-OD 600mg Tablet ER",
    },
    {
      nom: "Seizgard 100 Tablet",
    },
    {
      nom: "Supiroban 2% Ointment",
    },
    {
      nom: "Soltus 400 Tablet",
    },
    {
      nom: "Sefdin Dry Syrup",
    },
    {
      nom: "Samliza 12 Tablet",
    },
    {
      nom: "Sepomax 500 Tablet",
    },
    {
      nom: "S R T 100mg Tablet",
    },
    {
      nom: "Sufrate Ssd Cream",
    },
    {
      nom: "Sorest 100 Tablet",
    },
    {
      nom: "Starvog GM 1 Tablet SR",
    },
    {
      nom: "S Citadep 20 Tablet",
    },
    {
      nom: "Stonark 5% Solution",
    },
    {
      nom: "Strolin P 800 Tablet",
    },
    {
      nom: "Soltus 300 Tablet",
    },
    {
      nom: "Solprate CR 500 Tablet",
    },
    {
      nom: "Solprate CR 500 Tablet",
    },
    {
      nom: "Sucrazide MF Forte Tablet SR",
    },
    {
      nom: "Sercos-VT Tablet",
    },
    {
      nom: "StayHappi Chlorzoxazone+Diclofenac+Paracetamol 500mg/50mg/325mg Tablet",
    },
    {
      nom: "Salbair-B Forte 200mcg/200mcg Transcaps",
    },
    {
      nom: "S-Amlong 2.5 Tablet",
    },
    {
      nom: "Strafos Cream",
    },
    {
      nom: "Sugest 200 Soft Gelatin Capsule",
    },
    {
      nom: "Stanza 20 Tablet",
    },
    {
      nom: "Solian 400mg Tablet",
    },
    {
      nom: "Sebotar-S Soap",
    },
    {
      nom: "Soralen Forte 25mg Tablet",
    },
    {
      nom: "Salbair-B 100mcg/100mcg Transcaps",
    },
    {
      nom: "Seraclin-AD Gel",
    },
    {
      nom: "Soronil 0.005% Ointment",
    },
    {
      nom: "Swelinex Gel",
    },
    {
      nom: "Sefcold Tablet",
    },
    {
      nom: "Saliderm CL Face Wash",
    },
    {
      nom: "Saliderm CL Face Wash",
    },
    {
      nom: "Scino 5 Solution",
    },
    {
      nom: "SGK Cream",
    },
    {
      nom: "Stonil Oral Solution Mixed fruit flavour Sugar Free",
    },
    {
      nom: "Selzic 450mg Tablet",
    },
    {
      nom: "Seizgard 50 Tablet",
    },
    {
      nom: "Scaby Lotion",
    },
    {
      nom: "Skitofine 250 Tablet",
    },
    {
      nom: "Skizoril MD 50 Tablet",
    },
    {
      nom: "Sertacide Cream",
    },
    {
      nom: "Sucrazide MF 80mg/500mg Tablet SR",
    },
    {
      nom: "SII-Onco-BCG Injection",
    },
    {
      nom: "Systroin 20 Capsule",
    },
    {
      nom: "Simvofix 10mg Tablet",
    },
    {
      nom: "Sarpot AM Tablet",
    },
    {
      nom: "Superfen Gel",
    },
    {
      nom: "Susten 100 Injection",
    },
    {
      nom: "Sebandro Soap",
    },
    {
      nom: "Statin R 20 Tablet",
    },
    {
      nom: "Salen Capsule",
    },
    {
      nom: "Simlup 20mg Tablet",
    },
    {
      nom: "Stonark-5 AX Solution",
    },
    {
      nom: "Seboret-Plus Gel",
    },
    {
      nom: "Sulpitac OD 100mg Tablet",
    },
    {
      nom: "Steadpan-DSR Capsule",
    },
    {
      nom: "Simvotin 5 Tablet",
    },
    {
      nom: "Sertin 100 Tablet",
    },
    {
      nom: "Seriva 2% Lotion",
    },
    {
      nom: "Selzic -OD 150mg Tablet ER",
    },
    {
      nom: "Salizer Lotion",
    },
    {
      nom: "Snigzole D 30mg/40mg Capsule",
    },
    {
      nom: "Seroflo Ecopack 125 Inhaler",
    },
    {
      nom: "Sure Rab Vaccine",
    },
    {
      nom: "Stamace Capsule",
    },
    {
      nom: "Scabiped 2%/0.5% Lotion",
    },
    {
      nom: "Supraglip Tablet",
    },
    {
      nom: "Silverstream Liquid",
    },
    {
      nom: "SFZ DS Tablet",
    },
    {
      nom: "Switglim-M 3mg/500mg Tablet PR",
    },
    {
      nom: "Supraglip-M Tablet SR",
    },
    {
      nom: "Satasun Cream",
    },
    {
      nom: "Seizgard 200mg Tablet",
    },
    {
      nom: "Seizgard 200mg Tablet",
    },
    {
      nom: "Sertawar Cream",
    },
    {
      nom: "Sercos Cream",
    },
    {
      nom: "Solotrate 30mg Tablet SR",
    },
    {
      nom: "Sertavin Cream",
    },
    {
      nom: "Sertiva Tablet",
    },
    {
      nom: "Supranerv-P Tablet SR",
    },
    {
      nom: "StayHappi Diclofenac+Paracetamol 50mg/325mg Tablet",
    },
    {
      nom: "S-Amopress 5mg Tablet",
    },
    {
      nom: "Steno Cream",
    },
    {
      nom: "Scodia SR 500 Tablet",
    },
    {
      nom: "Scabcare Lotion",
    },
    {
      nom: "Scabcare Lotion",
    },
    {
      nom: "Sernext 25 Tablet",
    },
    {
      nom: "Tabi Tablet",
    },
    {
      nom: "Taxim-O 200 Tablet",
    },
    {
      nom: "T-Bact 2% Ointment",
    },
    {
      nom: "Thrombophob Ointment",
    },
    {
      nom: "Toba Eye Drop",
    },
    {
      nom: "Tryptomer 10mg Tablet",
    },
    {
      nom: "Telma 40 Tablet",
    },
    {
      nom: "Tretin 0.025% Cream",
    },
    {
      nom: "Tabi Tablet",
    },
    {
      nom: "Trenaxa 500 Tablet",
    },
    {
      nom: "Terbinaforce-Plus NF Cream",
    },
    {
      nom: "Thrombophob Gel",
    },
    {
      nom: "Telma H Tablet",
    },
    {
      nom: "Telma-AM Tablet",
    },
    {
      nom: "Trajenta 5mg Tablet",
    },
    {
      nom: "Telmikind 40 Tablet",
    },
    {
      nom: "TusQ-DX Liquid",
    },
    {
      nom: "Tear Drops",
    },
    {
      nom: "Telmikind-AM Tablet",
    },
    {
      nom: "Temoside 100 Capsule",
    },
    {
      nom: "Tobastar Eye/Ear Drops",
    },
    {
      nom: "Tenovate Cream",
    },
    {
      nom: "Taxim 1gm Injection",
    },
    {
      nom: "Tobacin Eye/Ear Drops",
    },
    {
      nom: "Trental 400 Tablet PR",
    },
    {
      nom: "Teczine Tablet",
    },
    {
      nom: "Telekast-L Tablet",
    },
    {
      nom: "Toba F Eye Drop",
    },
    {
      nom: "Terbinaforce Tablet",
    },
    {
      nom: "Tretin 0.05% Cream",
    },
    {
      nom: "Trapic MF Tablet",
    },
    {
      nom: "Tazloc 40 Tablet",
    },
    {
      nom: "Telma 20 Tablet",
    },
    {
      nom: "Telmikind-H Tablet",
    },
    {
      nom: "Terifrac Injection",
    },
    {
      nom: "Telvas 3D Tablet",
    },
    {
      nom: "Tryptomer 25mg Tablet",
    },
    {
      nom: "Thyronorm 50mcg Tablet",
    },
    {
      nom: "Tonact-TG Tablet",
    },
    {
      nom: "Tyrodin Cream",
    },
    {
      nom: "Tess Oral Paste",
    },
    {
      nom: "Tolvat 15 Tablet",
    },
    {
      nom: "Trenaxa MF Tablet",
    },
    {
      nom: "Tegrital 200 Tablet",
    },
    {
      nom: "T-98 Paediatric Drops",
    },
    {
      nom: "Tide Plus 10 Tablet",
    },
    {
      nom: "Tonact 10 Tablet",
    },
    {
      nom: "Triglynase 2 Tablet SR",
    },
    {
      nom: "Terbinaforce Cream",
    },
    {
      nom: "Torex Cough Syrup",
    },
    {
      nom: "Testoviron Depot 250 Injection",
    },
    {
      nom: "Temoside 250 Capsule",
    },
    {
      nom: "Tugain 5% Solution",
    },
    {
      nom: "Taxim-O Drops",
    },
    {
      nom: "Topaz 25 Tablet",
    },
    {
      nom: "Tacroz Forte Ointment",
    },
    {
      nom: "Trenaxa Injection 5ml",
    },
    {
      nom: "Triluma Cream",
    },
    {
      nom: "Thiamin Injection",
    },
    {
      nom: "Texakind-MF Tablet",
    },
    {
      nom: "Tofe Tablet",
    },
    {
      nom: "Targocid 400mg Injection",
    },
    {
      nom: "Trapic 500mg Tablet",
    },
    {
      nom: "Telma-CT 40/6.25 Tablet",
    },
    {
      nom: "Telvas H 40/12.5 Tablet",
    },
    {
      nom: "Tazzle 10 Tablet",
    },
    {
      nom: "Telmikind-AMH Tablet",
    },
    {
      nom: "Telma-AM H 40 Tablet",
    },
    {
      nom: "Trinerve LC Tablet",
    },
    {
      nom: "Tamdura Capsule PR",
    },
    {
      nom: "Tazar 4.5g Injection",
    },
    {
      nom: "Topisal 6% Ointment",
    },
    {
      nom: "Tazloc-AM Tablet",
    },
    {
      nom: "Tiniba 500 Tablet",
    },
    {
      nom: "Tenovate-M Cream",
    },
    {
      nom: "Tadaflo 5 Tablet",
    },
    {
      nom: "Teczine 10 Tablet",
    },
    {
      nom: "Testosterone Undecanoate 40mg Capsule",
    },
    {
      nom: "Tizan 2 Tablet",
    },
    {
      nom: "Tolperitas-D Tablet",
    },
    {
      nom: "T-Bact 2% Ointment",
    },
    {
      nom: "TusQ-DX SF Syrup",
    },
    {
      nom: "Tobastar F Eye Drop",
    },
    {
      nom: "Trinicalm Plus Tablet",
    },
    {
      nom: "Tamodex 20mg Tablet",
    },
    {
      nom: "Tonact 40 Tablet",
    },
    {
      nom: "Tricaine Mps Gel Cardamom Sugar Free",
    },
    {
      nom: "Tide 10 Tablet",
    },
    {
      nom: "Thyronorm 75mcg Tablet",
    },
    {
      nom: "Tacroz Ointment",
    },
    {
      nom: "Tolperitas 150 Tablet",
    },
    {
      nom: "Tresiba 100IU/ml Flextouch",
    },
    {
      nom: "Turbocort Oromucosal Paste",
    },
    {
      nom: "Topamac 25mg Tablet",
    },
    {
      nom: "Tazloc Trio 40 Tablet",
    },
    {
      nom: "Telmikind-CT 40 Tablet",
    },
    {
      nom: "Torglip M 50/500 Tablet",
    },
    {
      nom: "Taxim-O DT 100 Tablet",
    },
    {
      nom: "Tazloc-Beta 25 Tablet PR",
    },
    {
      nom: "Texakind 500mg Tablet",
    },
    {
      nom: "Trajenta Duo 2.5mg/500mg Tablet",
    },
    {
      nom: "Telvas-CT 40 Tablet",
    },
    {
      nom: "Tretiva 20 Capsule",
    },
    {
      nom: "Tinnex Capsule",
    },
    {
      nom: "Tiova Inhaler",
    },
    {
      nom: "Taxim-O CV 200 Tablet",
    },
    {
      nom: "T-Minic Syrup Orange",
    },
    {
      nom: "Tenovate Ointment",
    },
    {
      nom: "Terbinaforce 500 Tablet",
    },
    {
      nom: "Toujeo 300 U/mL Solostar",
    },
    {
      nom: "Tazloc-Beta 50 Tablet PR",
    },
    {
      nom: "Tricort 40 Injection",
    },
    {
      nom: "Tazomac 4.5gm Injection",
    },
    {
      nom: "Tolpa D Tablet",
    },
    {
      nom: "Thyronorm 12.5mcg Tablet",
    },
    {
      nom: "Telma-LN 40 Tablet",
    },
    {
      nom: "Tazloc-CT 40 Tablet",
    },
    {
      nom: "Tripride 2 Tablet SR",
    },
    {
      nom: "Telma-CT 40/12.5 Tablet",
    },
    {
      nom: "Tidilan 10 Tablet",
    },
    {
      nom: "Telmikind-Trio 6.25 Tablet",
    },
    {
      nom: "Telvas Beta 50 Tablet ER",
    },
    {
      nom: "Telmikind Beta 50 Tablet ER",
    },
    {
      nom: "Tazzle 5 Tablet",
    },
    {
      nom: "Tonact-ASP 75 Capsule",
    },
    {
      nom: "Tranostat Tablet",
    },
    {
      nom: "Taxim-O 400 Tablet",
    },
    {
      nom: "Theo-Asthalin Tablet",
    },
    {
      nom: "Telmikind Beta 40mg/25mg Tablet ER",
    },
    {
      nom: "Tonact 20 Tablet",
    },
    {
      nom: "Telma-Beta 25 Tablet ER",
    },
    {
      nom: "Topcef 200 Tablet DT",
    },
    {
      nom: "Trigabantin 100 Tablet",
    },
    {
      nom: "Telista 40 Tablet",
    },
    {
      nom: "Telvas Beta 25 Tablet ER",
    },
    {
      nom: "Topifort-NX Topical Suspension",
    },
    {
      nom: "Tenvir Tablet",
    },
    {
      nom: "Topcid 40 Tablet",
    },
    {
      nom: "Telmikind 20 Tablet",
    },
    {
      nom: "Trapic E Tablet",
    },
    {
      nom: "Triolmezest 40 Tablet",
    },
    {
      nom: "Telma-Beta 50 Tablet ER",
    },
    {
      nom: "Tadacip 20 Tablet",
    },
    {
      nom: "Tresiba 100 Units/ml Penfill",
    },
    {
      nom: "Typbar TCV Vaccine",
    },
    {
      nom: "Topisal 6% Lotion",
    },
    {
      nom: "Tinnicar Capsule",
    },
    {
      nom: "Tusq-D Cough Lozenges Orange",
    },
    {
      nom: "Thyronorm 62.5mcg Tablet",
    },
    {
      nom: "Tadact 10 Tablet",
    },
    {
      nom: "T-Minic Oral Drops Orange",
    },
    {
      nom: "Telma 40 Tablet",
    },
    {
      nom: "Telsar 40 Tablet",
    },
    {
      nom: "Tellzy 40 Tablet",
    },
    {
      nom: "Telekast 10 Tablet",
    },
    {
      nom: "Topisal 3% Lotion",
    },
    {
      nom: "Tropicacyl Plus Eye Drops",
    },
    {
      nom: "Trigan D Tablet",
    },
    {
      nom: "Tazloc 20 Tablet",
    },
    {
      nom: "Teniva-M Tablet ER",
    },
    {
      nom: "Tobaflam Eye Drop",
    },
    {
      nom: "Travatan Ophthalmic Solution",
    },
    {
      nom: "Telma 80 Tablet",
    },
    {
      nom: "Thyrox 12.5 Tablet",
    },
    {
      nom: "Topaz 50 Tablet",
    },
    {
      nom: "Tenlimac Tablet",
    },
    {
      nom: "Topinate Cream",
    },
    {
      nom: "Triglynase 1 Tablet SR",
    },
    {
      nom: "Triglimiprex 2 Tablet SR",
    },
    {
      nom: "Topirol 25 Tablet",
    },
    {
      nom: "Teczine Syrup",
    },
    {
      nom: "Taxim 500mg Injection",
    },
    {
      nom: "Tretiva 10 Capsule",
    },
    {
      nom: "Topisal 3% Ointment",
    },
    {
      nom: "Tusq-X Plus Expectorant",
    },
    {
      nom: "Telekast-L Kid Syrup",
    },
    {
      nom: "Tazloc-H Tablet",
    },
    {
      nom: "Tapease NS Nasal Spray",
    },
    {
      nom: "Thyronorm 37.5mcg Tablet",
    },
    {
      nom: "Tazret Gel",
    },
    {
      nom: "Temsan 40 Tablet",
    },
    {
      nom: "Terbest Cream",
    },
    {
      nom: "Telsartan 40 Tablet",
    },
    {
      nom: "Tropan 5 Tablet",
    },
    {
      nom: "Telekast A Tablet PR",
    },
    {
      nom: "Tear Drops Gel",
    },
    {
      nom: "Tricium PTH Injection",
    },
    {
      nom: "Tears Naturale Forte Ophthalmic Solution",
    },
    {
      nom: "Torplat 90 Tablet",
    },
    {
      nom: "Telvas-LN 40 Tablet",
    },
    {
      nom: "Triquilar Kit",
    },
    {
      nom: "Telma 80-H Tablet",
    },
    {
      nom: "Tide 5 Tablet",
    },
    {
      nom: "Tossex DMR Syrup Kiwi Sugar Free",
    },
    {
      nom: "Tolifast 150 Tablet",
    },
    {
      nom: "Tidilan Retard Tablet SR",
    },
    {
      nom: "Teczine M Tablet",
    },
    {
      nom: "Tegrital CR 200 Divitabs",
    },
    {
      nom: "Tolagin 4 Tablet",
    },
    {
      nom: "Torglip 50 Tablet",
    },
    {
      nom: "Tonact-TG 20 Tablet",
    },
    {
      nom: "Tavera M Tablet",
    },
    {
      nom: "Torsid 10 Tablet",
    },
    {
      nom: "Topp 40 Tablet",
    },
    {
      nom: "Tropan 2.5 Tablet",
    },
    {
      nom: "Tolkem-D 150mg/50mg Tablet",
    },
    {
      nom: "Tenepride M  500 Tablet SR",
    },
    {
      nom: "Trazine-H Tablet",
    },
    {
      nom: "Terbest Tablet",
    },
    {
      nom: "Torfix 400 Tablet",
    },
    {
      nom: "Tafnat Tablet",
    },
    {
      nom: "Terbicip Cream",
    },
    {
      nom: "Tolperitas-SR 450 Tablet",
    },
    {
      nom: "Tranlok E 500mg/250mg Tablet",
    },
    {
      nom: "Tolifast D Tablet",
    },
    {
      nom: "Telplus Tablet",
    },
    {
      nom: "Tidomet Plus Tablet",
    },
    {
      nom: "Tobox Eye Drop",
    },
    {
      nom: "Thyronorm 125mcg Tablet",
    },
    {
      nom: "Tenoric 50 Tablet",
    },
    {
      nom: "Tugain 10% Solution",
    },
    {
      nom: "Trulicity 1.5mg Pre-Filled Pen",
    },
    {
      nom: "Ticavic 90 Tablet",
    },
    {
      nom: "Trunex MS Aqueous Gel",
    },
    {
      nom: "Tenglyn M 500 Tablet SR",
    },
    {
      nom: "TD Pill Tablet",
    },
    {
      nom: "Tacroz Forte Ointment",
    },
    {
      nom: "Tobamist Respules",
    },
    {
      nom: "Telista CL Tablet",
    },
    {
      nom: "Tenovate GN Cream",
    },
    {
      nom: "Tuspel Plus Expectorant Strawberry",
    },
    {
      nom: "Tolmove 150mg Tablet",
    },
    {
      nom: "Tribet 2 Tablet ER",
    },
    {
      nom: "Telista-CH 40 Tablet",
    },
    {
      nom: "Telma 80-AM Tablet",
    },
    {
      nom: "Timolet Eye Drop",
    },
    {
      nom: "Trigabantin 300 Tablet",
    },
    {
      nom: "Tellzy-AM Tablet",
    },
    {
      nom: "Trimop Forte Tablet",
    },
    {
      nom: "Telista-AM Tablet",
    },
    {
      nom: "Tadact 20 Tablet",
    },
    {
      nom: "Ticaspan Tablet",
    },
    {
      nom: "T-98 Paediatric Suspension",
    },
    {
      nom: "Tsart 40 Tablet",
    },
    {
      nom: "Tibrolin Tablet",
    },
    {
      nom: "Tranostat-MF Tablet",
    },
    {
      nom: "Telmikind-H 80 Tablet",
    },
    {
      nom: "Telpres CT 40/6.25 Tablet",
    },
    {
      nom: "Trapic 650 Tablet",
    },
    {
      nom: "Triplixam 4mg/1.25mg/5mg Tablet",
    },
    {
      nom: "Torleva 500 Tablet",
    },
    {
      nom: "Tellzy-CH 40 Tablet",
    },
    {
      nom: "Tacmod Forte Ointment",
    },
    {
      nom: "Tacroz Forte XL Ointment",
    },
    {
      nom: "Tenepride 20 Tablet",
    },
    {
      nom: "Tamlocept 0.4 Capsule PR",
    },
    {
      nom: "Tinnitod 20mg Capsule",
    },
    {
      nom: "Toff DC Syrup",
    },
    {
      nom: "Takfa Forte Ointment",
    },
    {
      nom: "Tiniba 300 Tablet",
    },
    {
      nom: "Tazzle 20 Tablet",
    },
    {
      nom: "Tinzit Tablet",
    },
    {
      nom: "Travacom Eye Drop",
    },
    {
      nom: "Topamac 50mg Tablet",
    },
    {
      nom: "Takfresh Eye Drop",
    },
    {
      nom: "Telista MT 50 Tablet SR",
    },
    {
      nom: "Tolkem Tablet",
    },
    {
      nom: "Telmavas 40 Tablet",
    },
    {
      nom: "Teneliglip 20 Tablet",
    },
    {
      nom: "Tenefit-M Tablet SR",
    },
    {
      nom: "Tenglyn Tablet",
    },
    {
      nom: "Trimacsart Tablet",
    },
    {
      nom: "Terol LA 2 Capsule ER",
    },
    {
      nom: "Telsar Beta 25 Tablet ER",
    },
    {
      nom: "Telmiride 40 Tablet",
    },
    {
      nom: "Triopil 2 Tablet SR",
    },
    {
      nom: "Tiova Rotacap",
    },
    {
      nom: "Telpres CT 40/12.5 Tablet",
    },
    {
      nom: "Toplap Gel",
    },
    {
      nom: "Tugain 2% Solution",
    },
    {
      nom: "Ticstop Tablet",
    },
    {
      nom: "Telmed 40 Tablet",
    },
    {
      nom: "Tamlocept-D Capsule PR",
    },
    {
      nom: "Thyronorm 88mcg Tablet",
    },
    {
      nom: "Tronin 0.05% Cream",
    },
    {
      nom: "Triben B Cream",
    },
    {
      nom: "Tecum 0.1% Ointment",
    },
    {
      nom: "Tenefit 20 Tablet",
    },
    {
      nom: "Tegrital 100 Chewable Tablet",
    },
    {
      nom: "Tricort Tablet",
    },
    {
      nom: "Trivedon MR Tablet",
    },
    {
      nom: "Telista-H Tablet",
    },
    {
      nom: "Thromboscar Gel",
    },
    {
      nom: "Tretin-Iso 20 Capsule",
    },
    {
      nom: "T-98 DS Suspension",
    },
    {
      nom: "Telmiduce 40mg Tablet",
    },
    {
      nom: "Topisal 3% Lotion",
    },
    {
      nom: "Torex Junior Syrup",
    },
    {
      nom: "Triglynase 2 Forte Tablet SR",
    },
    {
      nom: "Terbest Cream",
    },
    {
      nom: "Triben- B Lotion",
    },
    {
      nom: "Torsid 5 Tablet",
    },
    {
      nom: "Telsartan-AM Tablet",
    },
    {
      nom: "Telvas 3D 80 Tablet",
    },
    {
      nom: "Toff DC Tablet",
    },
    {
      nom: "Telsar Beta 50 Tablet ER",
    },
    {
      nom: "Temsan-H Tablet",
    },
    {
      nom: "Tah 40 Tablet",
    },
    {
      nom: "Tebokan Forte Tablet",
    },
    {
      nom: "Tenacid MF Tablet",
    },
    {
      nom: "Tripride 1 Tablet SR",
    },
    {
      nom: "Ticagat Tablet",
    },
    {
      nom: "Triolmezest Tablet",
    },
    {
      nom: "Trazonil 50 Tablet",
    },
    {
      nom: "Tyza M Gel",
    },
    {
      nom: "Thyronorm 150mcg Tablet",
    },
    {
      nom: "Tazloc Trio 80 Tablet",
    },
    {
      nom: "Talimus Ointment",
    },
    {
      nom: "Trioflam Tablet",
    },
    {
      nom: "Tadaza 10mg/30mg Tablet",
    },
    {
      nom: "Thalix 50 Capsule",
    },
    {
      nom: "Tazloc-CT 6.25 Tablet",
    },
    {
      nom: "Triplent 10mg Tablet",
    },
    {
      nom: "Trfy 250 Tablet",
    },
    {
      nom: "Thichoren AC 4 Tablet",
    },
    {
      nom: "Tsart Trio 12.5 Tablet",
    },
    {
      nom: "Tyza Cream",
    },
    {
      nom: "Telma 20 Tablet",
    },
    {
      nom: "Tazret Forte Cream",
    },
    {
      nom: "Taximax 1500 mg Injection",
    },
    {
      nom: "Tritelsar 40 Tablet",
    },
    {
      nom: "Telmikind CT 40mg/6.25mg Tablet",
    },
    {
      nom: "Terbest 500 Tablet",
    },
    {
      nom: "Trinicalm Forte Tablet",
    },
    {
      nom: "Triben Plus Cream",
    },
    {
      nom: "Tegrital CR 300 Divitabs",
    },
    {
      nom: "Tocin Eye Drop",
    },
    {
      nom: "Topcid 20 Tablet",
    },
    {
      nom: "Tsart Trio 6.25 Tablet",
    },
    {
      nom: "Tetglob 500IU Injection",
    },
    {
      nom: "Telsar A Tablet",
    },
    {
      nom: "Tiare 90mg Tablet",
    },
    {
      nom: "Tasulin 0.4 Tablet PR",
    },
    {
      nom: "Tamodex 10mg Tablet",
    },
    {
      nom: "Telmiduce AM 40mg/5mg Tablet",
    },
    {
      nom: "Topnac P Tablet",
    },
    {
      nom: "Takfa Ointment",
    },
    {
      nom: "Trajenta Duo 2.5mg/1000mg Tablet",
    },
    {
      nom: "Telrose Tablet",
    },
    {
      nom: "Tusq-D Cough Lozenges Sugar Free",
    },
    {
      nom: "Taxim-O Forte Dry Syrup",
    },
    {
      nom: "Tenepla Tablet",
    },
    {
      nom: "Tibrolin D  Tablet",
    },
    {
      nom: "Testoviron Depot 100 Injection",
    },
    {
      nom: "Thioford AP Tablet",
    },
    {
      nom: "Trimegavog 2 Tablet SR",
    },
    {
      nom: "Torglip M 50/1000 Tablet",
    },
    {
      nom: "Telvas H 80/12.5 Tablet",
    },
    {
      nom: "Telmikind 80 Tablet",
    },
    {
      nom: "Tribet 1 Tablet ER",
    },
    {
      nom: "Thalix 100 Capsule",
    },
    {
      nom: "Trivoglitor 2 Tablet SR",
    },
    {
      nom: "Telmed AM Tablet",
    },
    {
      nom: "Thyrox 125 Tablet",
    },
    {
      nom: "Triglimiprex 1 Tablet SR",
    },
    {
      nom: "Telista MT 25 Tablet SR",
    },
    {
      nom: "Twinkle Cream",
    },
    {
      nom: "Topirol 50 Tablet",
    },
    {
      nom: "Torvate Chrono 500 Tablet CR",
    },
    {
      nom: "Tbis 0.1% Ointment",
    },
    {
      nom: "T Glip-M 500 Tablet ER",
    },
    {
      nom: "Telekast-L Kid Tablet",
    },
    {
      nom: "Telpres 40 Tablet",
    },
    {
      nom: "Tovaxo Eye Drop BAK Free",
    },
    {
      nom: "Triptolol 10mg/40mg Tablet",
    },
    {
      nom: "Tropicacyl Eye Drop",
    },
    {
      nom: "Taxim-O CV Dry Syrup",
    },
    {
      nom: "Tyrodin Tablet",
    },
    {
      nom: "Torsinex Plus Tablet",
    },
    {
      nom: "Telsar H Tablet",
    },
    {
      nom: "Turbovas-F Tablet",
    },
    {
      nom: "Tenvir-EM Tablet",
    },
    {
      nom: "Telma-CT 80/12.5 Tablet",
    },
    {
      nom: "Tiate Transhaler",
    },
    {
      nom: "Tamflo DFZ Capsule PR",
    },
    {
      nom: "Tenohep AF Tablet",
    },
    {
      nom: "Tenoric 25 Tablet",
    },
    {
      nom: "Tantum Oral rinse",
    },
    {
      nom: "Thrize DS Tablet",
    },
    {
      nom: "Topinate Gel",
    },
    {
      nom: "Tonact EZ Tablet",
    },
    {
      nom: "Tranlok-M Tablet",
    },
    {
      nom: "Tigemac 90 Tablet",
    },
    {
      nom: "Telkonol AM 40mg/5mg Tablet",
    },
    {
      nom: "Telmiride AM Tablet",
    },
    {
      nom: "Tolkem SR 450 Tablet",
    },
    {
      nom: "Terbitotal Tablet",
    },
    {
      nom: "Trivoglitor Forte 2 Tablet SR",
    },
    {
      nom: "Telsartan Trio Tablet",
    },
    {
      nom: "Targocid 200mg Injection",
    },
    {
      nom: "Tropan XL 5 Tablet",
    },
    {
      nom: "Toplap Gel",
    },
    {
      nom: "Tazloc-CT 80 Tablet",
    },
    {
      nom: "Teneblu Tablet",
    },
    {
      nom: "Tosti Oral Gel",
    },
    {
      nom: "Taxim 250mg Injection",
    },
    {
      nom: "Terabet-GM Skin Cream",
    },
    {
      nom: "Telista 20 Tablet",
    },
    {
      nom: "Telsartan-H Tablet",
    },
    {
      nom: "Trazonil 25 Tablet",
    },
    {
      nom: "Tynept Tablet",
    },
    {
      nom: "Telma-AM H 80 Tablet",
    },
    {
      nom: "Triohale Inhaler",
    },
    {
      nom: "Telma-AM Tablet",
    },
    {
      nom: "Triglycomet Tablet SR",
    },
    {
      nom: "Telvas-AM 80/5 Tablet",
    },
    {
      nom: "Thrize Tablet",
    },
    {
      nom: "Thrize Plus Tablet",
    },
    {
      nom: "Tronin MS Gel",
    },
    {
      nom: "Telmed Beta 50 Tablet",
    },
    {
      nom: "Tacroz Ointment",
    },
    {
      nom: "Telvas-CT 80 Tablet",
    },
    {
      nom: "Trulicity 0.75mg Pre-Filled Pen",
    },
    {
      nom: "Telpres LN 40 Tablet",
    },
    {
      nom: "T-Stat 500 Tablet",
    },
    {
      nom: "Tacvido Forte Cream",
    },
    {
      nom: "Tretin-Iso 10 Capsule",
    },
    {
      nom: "Theo-Asthalin Forte Tablet",
    },
    {
      nom: "Topp D Capsule",
    },
    {
      nom: "Trfy Cream",
    },
    {
      nom: "Triactin 4 Tablet",
    },
    {
      nom: "Tenepla M 500mg/20mg Tablet SR",
    },
    {
      nom: "Tazloc 80 Tablet",
    },
    {
      nom: "Thyrox 150 Tablet",
    },
    {
      nom: "Telma-NB Tablet",
    },
    {
      nom: "Topnac-TH Tablet",
    },
    {
      nom: "Triolmighty 40 Tablet",
    },
    {
      nom: "Tryptomer G 100 mg/10 mg Tablet",
    },
    {
      nom: "Tazloc-AM 80 Tablet",
    },
    {
      nom: "Tinfal Plus Solution",
    },
    {
      nom: "TG Goal 145 Tablet",
    },
    {
      nom: "Triolmezest CH 40 Tablet",
    },
    {
      nom: "Takchlor-C Eye Ointment",
    },
    {
      nom: "Tamsin 0.4mg Tablet PR",
    },
    {
      nom: "Telsartan 20 Tablet",
    },
    {
      nom: "Tenormin 50 Tablet",
    },
    {
      nom: "Telday 40 Tablet",
    },
    {
      nom: "Tolaz DT 5 Tablet",
    },
    {
      nom: "Tyrodin -FSR Tablet",
    },
    {
      nom: "Tocin-F Eye Drop",
    },
    {
      nom: "Telkonol  40mg Tablet",
    },
    {
      nom: "Torbulk Powder",
    },
    {
      nom: "Thyrox 88 Tablet",
    },
    {
      nom: "Telsar 20 Tablet",
    },
    {
      nom: "Tendolife Capsule",
    },
    {
      nom: "Tegrital 400 Tablet",
    },
    {
      nom: "Torget 10 Tablet",
    },
    {
      nom: "Tretiva 5 Capsule",
    },
    {
      nom: "Tel-Revelol 40/50 Tablet ER",
    },
    {
      nom: "Typbar Vaccine",
    },
    {
      nom: "Tegrital CR 400 Divitabs",
    },
    {
      nom: "TOR 10 Tablet",
    },
    {
      nom: "Tellzy-MT 50 Tablet ER",
    },
    {
      nom: "Tranostat Injection",
    },
    {
      nom: "Tentide AF 25mg Tablet",
    },
    {
      nom: "Tadaflo 20mg Tablet",
    },
    {
      nom: "Topcort Cream",
    },
    {
      nom: "Tellzy-MT 25 Tablet ER",
    },
    {
      nom: "Thyronorm 112mcg Tablet",
    },
    {
      nom: "Telmed Beta 25 Tablet ER",
    },
    {
      nom: "Torkast-FX Tablet",
    },
    {
      nom: "Terbinaforce-M Cream",
    },
    {
      nom: "Telma-CT 80/6.25 Tablet",
    },
    {
      nom: "Telmavas-AM Tablet",
    },
    {
      nom: "Torfix Tablet",
    },
    {
      nom: "Telmiride Amh Tablet",
    },
    {
      nom: "Trioday Tablet",
    },
    {
      nom: "Torvason 10 Tablet",
    },
    {
      nom: "Telista-D Tablet SR",
    },
    {
      nom: "Theo Tears 0.18% Eye Drop",
    },
    {
      nom: "Trazine-S Tablet",
    },
    {
      nom: "Tellzy-H Tablet",
    },
    {
      nom: "Tidilan 20 Tablet",
    },
    {
      nom: "Telmiget 40mg Tablet",
    },
    {
      nom: "Texid Tablet",
    },
    {
      nom: "Tamsin D Tablet PR",
    },
    {
      nom: "Tobaren Eye/Ear Drops",
    },
    {
      nom: "Tenolol 50 Tablet",
    },
    {
      nom: "Thiox OD 8 Capsule SR",
    },
    {
      nom: "Telpres CT 80 Tablet",
    },
    {
      nom: "Telvas CT LS Tablet",
    },
    {
      nom: "Trump D Syrup",
    },
    {
      nom: "Telma-D Tablet SR",
    },
    {
      nom: "Tocin Eye Ointment",
    },
    {
      nom: "Tolagin 8 Tablet",
    },
    {
      nom: "Teczine CP Tablet",
    },
    {
      nom: "Teneliglip-M 500 Tablet PR",
    },
    {
      nom: "Teniva-M Forte Tablet ER",
    },
    {
      nom: "Trofame XR Capsule",
    },
    {
      nom: "Tolsama 15 Tablet",
    },
    {
      nom: "TRAVO-Z Eye Drop",
    },
    {
      nom: "Tiomate Transhaler",
    },
    {
      nom: "Telpres-MT 50 Tablet PR",
    },
    {
      nom: "Troyace SP Tablet",
    },
    {
      nom: "Taloprex 10 Tablet",
    },
    {
      nom: "Tenormin 25 Tablet",
    },
    {
      nom: "Tide 20 Tablet",
    },
    {
      nom: "Torvate 500 Tablet CR",
    },
    {
      nom: "Trazalon 50 Tablet",
    },
    {
      nom: "Thyrox 62.5mcg Tablet",
    },
    {
      nom: "Tenohep Tablet",
    },
    {
      nom: "Torsinex 10 Tablet",
    },
    {
      nom: "Tripin OM 40 Tablet",
    },
    {
      nom: "Tranlok 500 Tablet",
    },
    {
      nom: "Teleact 40 Tablet",
    },
    {
      nom: "Tenefit-M Forte Tablet SR",
    },
    {
      nom: "Topisal 6% Lotion",
    },
    {
      nom: "Timolet OD BKC free Eye Drop",
    },
    {
      nom: "Tolmove 450mg Tablet SR",
    },
    {
      nom: "Telmaxx 25 Tablet ER",
    },
    {
      nom: "Tenolol 25 Tablet",
    },
    {
      nom: "Tricinod 10/12.5 Tablet",
    },
    {
      nom: "Tacroz Forte Solution",
    },
    {
      nom: "Telsartan-CT 40 Tablet",
    },
    {
      nom: "Tolvasca 15 Tablet",
    },
    {
      nom: "Tacvido Forte Oral Gel",
    },
    {
      nom: "Torvate Chrono 300 Tablet CR",
    },
    {
      nom: "Tacroren 1 Capsule",
    },
    {
      nom: "Topaz 100 Tablet",
    },
    {
      nom: "Tsart-AM Tablet",
    },
    {
      nom: "Temsan-AM Tablet",
    },
    {
      nom: "Thrombotroy QPS Solution",
    },
    {
      nom: "Tyza Dusting Powder",
    },
    {
      nom: "Teniva 20 Tablet",
    },
    {
      nom: "Terbinaforce Dusting Powder",
    },
    {
      nom: "Tenlison-M 500 Tablet ER",
    },
    {
      nom: "Tetan 40 Tablet",
    },
    {
      nom: "Triben AD Anti-Dandruff Lotion",
    },
    {
      nom: "Tellzy 20 Tablet",
    },
    {
      nom: "Tretiva 30 Capsule",
    },
    {
      nom: "Tryptomer 50mg Tablet",
    },
    {
      nom: "Telmiduce H 40mg/12.5mg Tablet",
    },
    {
      nom: "Traxol S 1000 mg/500 mg Injection",
    },
    {
      nom: "Tacrotor 0.1% Ointment",
    },
    {
      nom: "Tenebite-M 20/500 Tablet SR",
    },
    {
      nom: "Telista-CH 40/6.25 Tablet",
    },
    {
      nom: "Teneblu-M Tablet PR",
    },
    {
      nom: "Toldin ER 600 Tablet",
    },
    {
      nom: "Telmed H Tablet",
    },
    {
      nom: "Tears Naturale II Lubricant Eye Drops",
    },
    {
      nom: "Takfa 1 Capsule",
    },
    {
      nom: "Temsan 20 Tablet",
    },
    {
      nom: "TGR Tablet",
    },
    {
      nom: "Theolate 250mg/250mg Tablet",
    },
    {
      nom: "Tenali M 500 Tablet ER",
    },
    {
      nom: "Torfix 550 Tablet",
    },
    {
      nom: "Tazloc-H 80 Tablet",
    },
    {
      nom: "Tenglyn M 1000 Tablet SR",
    },
    {
      nom: "Tgkem 50mg Injection",
    },
    {
      nom: "Telmaxx 50 Tablet ER",
    },
    {
      nom: "Tricaine Alma Gel Mango Sugar Free",
    },
    {
      nom: "Tretwin Cream",
    },
    {
      nom: "Transfer 4000 Injection",
    },
    {
      nom: "Telzox 40 Tablet",
    },
    {
      nom: "Texid-MF Tablet",
    },
    {
      nom: "Tresmox CV 500mg/125mg Tablet",
    },
    {
      nom: "Trivogo 2 Tablet SR",
    },
    {
      nom: "Ticarnic  3.1 Injection",
    },
    {
      nom: "Terbitotal 500 Tablet",
    },
    {
      nom: "Twinblok Trio Tablet ER",
    },
    {
      nom: "Tumsup Drop",
    },
    {
      nom: "Triexer 2 Tablet ER",
    },
    {
      nom: "Tolaz DT 10 Tablet",
    },
    {
      nom: "T-Film 20mg Disintegrating Strip",
    },
    {
      nom: "Texifen 250mg Tablet",
    },
    {
      nom: "Temsan-CT 40 Tablet",
    },
    {
      nom: "Tugain 5% Gel",
    },
    {
      nom: "Tachyra 100 Tablet",
    },
    {
      nom: "Talecalm Plus Tablet",
    },
    {
      nom: "Trajenta Duo 2.5mg/850mg Tablet",
    },
    {
      nom: "Tecum 0.03% Ointment",
    },
    {
      nom: "Trexjoy Gel",
    },
    {
      nom: "Tamgress 0.4 Tablet MR",
    },
    {
      nom: "Telekast 4 Chewable Tablet",
    },
    {
      nom: "Tacrotor 0.03% Ointment",
    },
    {
      nom: "Tonact 5 Tablet",
    },
    {
      nom: "Trimegavog 1 Tablet SR",
    },
    {
      nom: "Tacrograf 1 Capsule",
    },
    {
      nom: "Tolaz LA 405mg/vial Convenience Kit",
    },
    {
      nom: "Torq SR 2 Capsule",
    },
    {
      nom: "Tiate 18mcg Transcaps",
    },
    {
      nom: "Tryptomer G 300mg/10mg Tablet",
    },
    {
      nom: "Telmiride LN 10mg/40mg Tablet",
    },
    {
      nom: "Telmikind CT 80mg/12.5mg Tablet",
    },
    {
      nom: "Tsart-M 40/50 Tablet ER",
    },
    {
      nom: "Tresivac Vaccine",
    },
    {
      nom: "Tolpazen Tablet",
    },
    {
      nom: "Telmed CT Tablet",
    },
    {
      nom: "Tetanus Vaccine Adsorbed 0.5ml",
    },
    {
      nom: "Tovaxo-T Eye Drop",
    },
    {
      nom: "Topnac 100mg Tablet",
    },
    {
      nom: "Torget 5 Tablet",
    },
    {
      nom: "Tiban M 20/500mg Tablet ER",
    },
    {
      nom: "Trivoglitor 1 Tablet SR",
    },
    {
      nom: "Tobacin 80mg Injection",
    },
    {
      nom: "Tigatel 20 Tablet",
    },
    {
      nom: "Tricinod 10/6.25 Tablet",
    },
    {
      nom: "Tadasure 10 Orally Disintegrating Strip",
    },
    {
      nom: "Tendrone 1% Cream",
    },
    {
      nom: "Trulimax 500mg Tablet",
    },
    {
      nom: "Triolmighty 20 Tablet",
    },
    {
      nom: "Tacrocord 1mg Capsule",
    },
    {
      nom: "Tamgress-D Capsule PR",
    },
    {
      nom: "Thioact D 4 Capsule",
    },
    {
      nom: "Torcilin 10 Tablet",
    },
    {
      nom: "Tyza Cream",
    },
    {
      nom: "Tiomate Transcaps",
    },
    {
      nom: "Troxip-OD Tablet PR",
    },
    {
      nom: "Telekast-Plus Tablet",
    },
    {
      nom: "Tenoclor 50 Tablet",
    },
    {
      nom: "Thioril 10 Tablet",
    },
    {
      nom: "Turbovas Gold 10 Capsule",
    },
    {
      nom: "Torleva XR 500 Tablet",
    },
    {
      nom: "Trimium Transhaler",
    },
    {
      nom: "Telmiduce 20mg Tablet",
    },
    {
      nom: "Temsan-AM 5 Tablet",
    },
    {
      nom: "Topinate Ointment",
    },
    {
      nom: "Telplus Trio 40mg/10mg/6.25mg Tablet",
    },
    {
      nom: "Triopil 1 Tablet SR",
    },
    {
      nom: "Tugain 5% Foam",
    },
    {
      nom: "Trancodol DT 5 Tablet",
    },
    {
      nom: "Tebina Tablet",
    },
    {
      nom: "Triolmezest CH 20 Tablet",
    },
    {
      nom: "Tolvamac 15mg Tablet",
    },
    {
      nom: "Telmikaa AMH Tablet",
    },
    {
      nom: "Telmed-AH Tablet",
    },
    {
      nom: "Thank OD Forte Tablet",
    },
    {
      nom: "Terbigen 250 Tablet",
    },
    {
      nom: "Topnac 200mg Tablet SR",
    },
    {
      nom: "Tozam Tablet",
    },
    {
      nom: "Terphylate Syrup",
    },
    {
      nom: "Trueceprol OD Tablet SR",
    },
    {
      nom: "Tegrital Suspension",
    },
    {
      nom: "Testoki Tablet",
    },
    {
      nom: "Trend XR 500 Tablet",
    },
    {
      nom: "Trivon Tablet",
    },
    {
      nom: "Targit 40 Tablet",
    },
    {
      nom: "Texifen Cream",
    },
    {
      nom: "Trazonil 100 Tablet",
    },
    {
      nom: "Tolperitas-DSR Tablet",
    },
    {
      nom: "Tonact D 10 Tablet",
    },
    {
      nom: "Teleact AM Tablet",
    },
    {
      nom: "Tiban Tablet",
    },
    {
      nom: "Totalax NF Syrup",
    },
    {
      nom: "Trustiva Tablet",
    },
    {
      nom: "Tezcort Cream",
    },
    {
      nom: "Tidomet LS Tablet",
    },
    {
      nom: "Telmed 20 Tablet",
    },
    {
      nom: "Tryptinol 25 Tablet",
    },
    {
      nom: "Tolmex 150mg Tablet",
    },
    {
      nom: "Terbicip Spray",
    },
    {
      nom: "Talsil Forte Suspension",
    },
    {
      nom: "Tromide Plus Eye Drop",
    },
    {
      nom: "Tamsukem D 0.4mg/0.5mg Tablet",
    },
    {
      nom: "Triactin 8 Tablet",
    },
    {
      nom: "Triobimet 1mg/500mg/15mg Tablet ER",
    },
    {
      nom: "Tolfree 150 Tablet",
    },
    {
      nom: "Telkonol M 40mg/25mg Tablet",
    },
    {
      nom: "Tarry Shine Lotion",
    },
    {
      nom: "T-Muce Ointment",
    },
    {
      nom: "Trivastal LA Tablet SR",
    },
    {
      nom: "Tolvat 30 Tablet",
    },
    {
      nom: "Tropin Paediatric Eye Drop",
    },
    {
      nom: "Topamac 100mg Tablet",
    },
    {
      nom: "Ticin Cream",
    },
    {
      nom: "Thycad 100mg Capsule",
    },
    {
      nom: "Travosun Eye Drop",
    },
    {
      nom: "Trilopace Tablet",
    },
    {
      nom: "Trigem 2 Tablet SR",
    },
    {
      nom: "Tenali Tablet",
    },
    {
      nom: "Tiaprex 25 Tablet",
    },
    {
      nom: "Trineurosol HP 1000mcg Injection",
    },
    {
      nom: "Tropac Eye Drop",
    },
    {
      nom: "Tsart 40 CT Tablet",
    },
    {
      nom: "Tadovas 20mg Tablet",
    },
    {
      nom: "Torsid 20 Tablet",
    },
    {
      nom: "Tryptomer 75mg Tablet",
    },
    {
      nom: "Tsart-H Tablet",
    },
    {
      nom: "Tasulin-D Tablet ER",
    },
    {
      nom: "Tilstigmin Tablet",
    },
    {
      nom: "Tinilact-CL Softgels",
    },
    {
      nom: "Troxip Tablet",
    },
    {
      nom: "Telsar-LN 10 Tablet",
    },
    {
      nom: "Telminorm AM 40/5 Tablet",
    },
    {
      nom: "Trivoglitor Forte 1 Tablet SR",
    },
    {
      nom: "Tetan-AM Tablet",
    },
    {
      nom: "Timol P Eye Drop",
    },
    {
      nom: "Tachyra 200 Tablet",
    },
    {
      nom: "Thioril 25 Tablet",
    },
    {
      nom: "Torsid Plus 20/50 Tablet",
    },
    {
      nom: "Telista Trio CL 6.25 Tablet",
    },
    {
      nom: "Telsite 40mg Tablet",
    },
    {
      nom: "Terozesta 2mg Tablet",
    },
    {
      nom: "Temsan 80 Tablet",
    },
    {
      nom: "Torq SR 4 Capsule",
    },
    {
      nom: "Torvate 300 Tablet CR",
    },
    {
      nom: "Tozaar 50 Tablet",
    },
    {
      nom: "Trancodol LA Injection",
    },
    {
      nom: "Telista-CH 80 Tablet",
    },
    {
      nom: "Trimacontin 35 Tablet",
    },
    {
      nom: "Trinerve NT Tablet",
    },
    {
      nom: "Tebina Cream",
    },
    {
      nom: "Topex-DX Cough Syrup",
    },
    {
      nom: "T-Vobit VX2 Tablet SR",
    },
    {
      nom: "Tacvido Forte Ointment",
    },
    {
      nom: "TOR 20 Tablet",
    },
    {
      nom: "Tfil 10mg Tablet",
    },
    {
      nom: "Topinate Solution",
    },
    {
      nom: "Torvate 200 Tablet CR",
    },
    {
      nom: "Tenepla M 1000mg/20mg Tablet SR",
    },
    {
      nom: "Thioquest ET 4 Tablet",
    },
    {
      nom: "Teli 20 Tablet",
    },
    {
      nom: "Tagon 20 Tablet",
    },
    {
      nom: "Terbicort-Total Cream",
    },
    {
      nom: "Tampil D 0.4mg/0.5mg Capsule PR",
    },
    {
      nom: "Twincal 10 Tablet",
    },
    {
      nom: "Tiomist CFC Free 9mcg Inhaler",
    },
    {
      nom: "Tellzy Ach 40/5/6.25 Tablet",
    },
    {
      nom: "Tenolol 12.5 Tablet",
    },
    {
      nom: "Telmital 40 Tablet",
    },
    {
      nom: "Trimop Tablet",
    },
    {
      nom: "Trioptal 300 Tablet",
    },
    {
      nom: "Tynept OD Tablet ER",
    },
    {
      nom: "Torvigress 20 Tablet",
    },
    {
      nom: "Tuffclav LB Tablet",
    },
    {
      nom: "Travopure Eye Drop",
    },
    {
      nom: "Tricodex Syrup",
    },
    {
      nom: "Telista 80 Tablet",
    },
    {
      nom: "Thyronorm 137mcg Tablet",
    },
    {
      nom: "Trilosar 6.25 Tablet",
    },
    {
      nom: "Telmiride 20mg Tablet",
    },
    {
      nom: "Teli CL  40 Tablet",
    },
    {
      nom: "Trueceprol Capsule",
    },
    {
      nom: "Temsan-80 H  Tablet",
    },
    {
      nom: "Telekast 5 Chewable Tablet",
    },
    {
      nom: "Tufacne 20 Capsule",
    },
    {
      nom: "Tebina 500 Tablet",
    },
    {
      nom: "Tam Dart Tablet",
    },
    {
      nom: "Triolsar 40 Tablet",
    },
    {
      nom: "Telday 20 Tablet",
    },
    {
      nom: "Torvason 20mg Tablet",
    },
    {
      nom: "Tenginow Tablet",
    },
    {
      nom: "Triluma RD Cream",
    },
    {
      nom: "Torleva 250 Tablet",
    },
    {
      nom: "Teleact D Tablet",
    },
    {
      nom: "Tancet L Tablet",
    },
    {
      nom: "Tacromus 1 Capsule",
    },
    {
      nom: "Thyrox 200 Tablet",
    },
    {
      nom: "Telvas-LN 80 Tablet",
    },
    {
      nom: "Tusq-D Cough Lozenges Honey lemon",
    },
    {
      nom: "Tamcontin 0.4 Tablet CR",
    },
    {
      nom: "Telsar 80 Tablet",
    },
    {
      nom: "Tolaz LA 300mg/vial Convenience Kit",
    },
    {
      nom: "Trimacontin 60 Tablet CR",
    },
    {
      nom: "Tirofuse Injection",
    },
    {
      nom: "Ten20 Tablet",
    },
    {
      nom: "Tretiva 25 Capsule",
    },
    {
      nom: "Terefin Cream",
    },
    {
      nom: "Trigaine Solution",
    },
    {
      nom: "Ticus 90 Tablet",
    },
    {
      nom: "Tufacne 10 Capsule",
    },
    {
      nom: "Tellzy-CH 80 Tablet",
    },
    {
      nom: "Torplat 60 Tablet",
    },
    {
      nom: "Tenof EM Tablet",
    },
    {
      nom: "Tritelsar 80 Tablet",
    },
    {
      nom: "Torcilin-T Tablet",
    },
    {
      nom: "Trend XR 250 Tablet",
    },
    {
      nom: "Tossex XP Expectorant Mango",
    },
    {
      nom: "Teleact Trio Tablet",
    },
    {
      nom: "Terbiderm Cream",
    },
    {
      nom: "Tacmod Lotion",
    },
    {
      nom: "Tampil 0.4 Capsule PR",
    },
    {
      nom: "Trump A Syrup",
    },
    {
      nom: "Tri-Olmetor 40 Tablet",
    },
    {
      nom: "Tolby-DS Soft Gelatin Capsule",
    },
    {
      nom: "Tidomet Forte Tablet",
    },
    {
      nom: "Telmisat 40 Tablet",
    },
    {
      nom: "Tegliptin-M 500mg Tablet SR",
    },
    {
      nom: "Torcoxia BCD 90 Tablet",
    },
    {
      nom: "Thichoren AC 100mg/8mg Tablet",
    },
    {
      nom: "Takfa 0.5 Capsule",
    },
    {
      nom: "Topsor S Lotion",
    },
    {
      nom: "Telsite AM Tablet",
    },
    {
      nom: "Torget 20 Tablet",
    },
    {
      nom: "Tacrograf 2 Capsule",
    },
    {
      nom: "Tacrograf 0.5 Capsule",
    },
    {
      nom: "Tariflox 200mg Tablet",
    },
    {
      nom: "Tide 100 Tablet",
    },
    {
      nom: "Takfresh Fusion Eye Drop",
    },
    {
      nom: "Trizulu Tablet",
    },
    {
      nom: "Tenoclor 25 Tablet",
    },
    {
      nom: "Teleact CT 40 Tablet",
    },
    {
      nom: "Torvigress 100 Tablet",
    },
    {
      nom: "Tubervac Vaccine",
    },
    {
      nom: "Telpres-AMH Tablet",
    },
    {
      nom: "T-Mart R Tablet",
    },
    {
      nom: "Tugain 10% Foam",
    },
    {
      nom: "Thyronex 100 Tablet",
    },
    {
      nom: "T-Muce Ointment",
    },
    {
      nom: "Trizid SR Tablet",
    },
    {
      nom: "Trivoglicad 2 Tablet SR",
    },
    {
      nom: "Torvel 10 Tablet",
    },
    {
      nom: "Tfil 5mg Tablet",
    },
    {
      nom: "Typbar-PFS Vaccine",
    },
    {
      nom: "Toxifite Tablet",
    },
    {
      nom: "Thio-Seradic Tablet",
    },
    {
      nom: "Thycad 50mg Capsule",
    },
    {
      nom: "Targit-H 40/12.5mg Tablet",
    },
    {
      nom: "Telista-H 80 Tablet",
    },
    {
      nom: "Topirol 100 Tablet",
    },
    {
      nom: "Tribetrol 1 Tablet SR",
    },
    {
      nom: "Tetan-H Tablet",
    },
    {
      nom: "Telsartan-AM 80 Tablet",
    },
    {
      nom: "Thioceclo 4 Tablet",
    },
    {
      nom: "Telsartan-H 80 Tablet",
    },
    {
      nom: "Telmikaa MT 25 Tablet ER",
    },
    {
      nom: "Timebond Dry Syrup",
    },
    {
      nom: "Tretiva 40 Capsule",
    },
    {
      nom: "Tufderm Cream",
    },
    {
      nom: "Terbinator 250 Tablet",
    },
    {
      nom: "Telekast-T Tablet CR",
    },
    {
      nom: "Telpres H 40 Tablet",
    },
    {
      nom: "Trigulin 2 Tablet SR",
    },
    {
      nom: "Tritelsar 80 HS Tablet",
    },
    {
      nom: "Trebor 0.025% Cream",
    },
    {
      nom: "Telcure 40mg Tablet",
    },
    {
      nom: "Tenolol-AM 25 Tablet",
    },
    {
      nom: "Telmijub 40 Tablet",
    },
    {
      nom: "Triglimicure 2mg/500mg/15mg Tablet SR",
    },
    {
      nom: "Telmikaa MT 50mg Tablet",
    },
    {
      nom: "Tuloplast 2 Transdermal Patch",
    },
    {
      nom: "Telkonol  20 Tablet",
    },
    {
      nom: "Torvate Chrono 200 Tablet CR",
    },
    {
      nom: "Teneliglip-M 1000mg/20mg Tablet",
    },
    {
      nom: "Tbis Lotion",
    },
    {
      nom: "Tendrone Cream",
    },
    {
      nom: "Torleva 750 Tablet",
    },
    {
      nom: "Torleva XR 750 Tablet",
    },
    {
      nom: "Trancodol DT 10 Tablet",
    },
    {
      nom: "Triolsar 20 Tablet",
    },
    {
      nom: "Tenoric 100 Tablet",
    },
    {
      nom: "Telsite H 40mg Tablet",
    },
    {
      nom: "Telmikaa 40 Tablet",
    },
    {
      nom: "Terbest Dusting Powder",
    },
    {
      nom: "Tolol AM 50 Tablet PR",
    },
    {
      nom: "Tacromus 2mg Capsule",
    },
    {
      nom: "Telzox-H 40mg/12.5mg Tablet",
    },
    {
      nom: "Trebor Cream",
    },
    {
      nom: "Tacvido Forte Solution",
    },
    {
      nom: "Telday 80 Tablet",
    },
    {
      nom: "Triben CN Cream",
    },
    {
      nom: "Torvigress 40 Tablet",
    },
    {
      nom: "Tacvido Ointment",
    },
    {
      nom: "Tolu 2mg Tablet XR",
    },
    {
      nom: "Tellzy-AH Tablet",
    },
    {
      nom: "Telmital-A Tablet",
    },
    {
      nom: "Toltam Capsule",
    },
    {
      nom: "Torleva Syrup",
    },
    {
      nom: "Tegliptin Tablet",
    },
    {
      nom: "Tegliptin Tablet",
    },
    {
      nom: "Trivedon 20 Tablet",
    },
    {
      nom: "Targit-AM 40mg/5mg Tablet",
    },
    {
      nom: "Tacvido Ointment",
    },
    {
      nom: "Tolaz LA 210mg/vial Convenience Kit",
    },
    {
      nom: "Talecalm 5mg Tablet",
    },
    {
      nom: "Terbest Dusting Powder",
    },
    {
      nom: "Tolu 2mg Tablet XR",
    },
    {
      nom: "Thioquest 4mg Fast Acting Capsule",
    },
    {
      nom: "Tronin 0.05% Cream",
    },
    {
      nom: "Tacsant 0.5mg Capsule",
    },
    {
      nom: "Torleva Syrup",
    },
    {
      nom: "Temsan 80 CT Tablet",
    },
    {
      nom: "Trioderm-OC Cream",
    },
    {
      nom: "Tacrograf 0.25 Capsule",
    },
    {
      nom: "Tobrasone Eye Drop",
    },
    {
      nom: "Trancodol DT 1.5 Tablet",
    },
    {
      nom: "Tinytret 20mg Tablet",
    },
    {
      nom: "Tamica 40 Tablet",
    },
    {
      nom: "Telma-R 5 Tablet",
    },
    {
      nom: "Telmital-CT Tablet",
    },
    {
      nom: "Tri-Azulix DS 2 Tablet SR",
    },
    {
      nom: "Tlm 40mg Tablet",
    },
    {
      nom: "Teli 40 Tablet",
    },
    {
      nom: "Trigaine Forte Lotion",
    },
    {
      nom: "TG-Tor F 160 Tablet",
    },
    {
      nom: "Trigem 1 Tablet",
    },
    {
      nom: "Traxido 500mg Tablet SR",
    },
    {
      nom: "Triben Lotion",
    },
    {
      nom: "Timolen 0.5% Eye Drop",
    },
    {
      nom: "Tenligress-M 500 Tablet SR",
    },
    {
      nom: "Tolol -XR 12.5 Tablet",
    },
    {
      nom: "Tri-Olmetor 20 Tablet",
    },
    {
      nom: "Terapress 2 Tablet",
    },
    {
      nom: "Traxin Junior 15mg/5ml/0.5mg/5ml/50mg/5ml Syrup",
    },
    {
      nom: "Tricaine S Suspension Mango Sugar Free",
    },
    {
      nom: "Teli-H Tablet",
    },
    {
      nom: "Tacrovera Solution",
    },
    {
      nom: "Trioptal 600 Tablet",
    },
    {
      nom: "Teevir Tablet",
    },
    {
      nom: "Takfa 2 Capsule",
    },
    {
      nom: "Teldawn Beta 40mg/50mg Tablet",
    },
    {
      nom: "Telmikaa AM Tablet",
    },
    {
      nom: "Tenumet 500mg/20mg Tablet ER",
    },
    {
      nom: "Tenof Tablet",
    },
    {
      nom: "Telmiprime 40mg Tablet",
    },
    {
      nom: "Telsar 80 H Tablet",
    },
    {
      nom: "Terbocet 250 Tablet",
    },
    {
      nom: "Thioquest DP 4 Capsule",
    },
    {
      nom: "Tiban M 20/1000mg  Tablet ER",
    },
    {
      nom: "Tenomac 25mg Tablet",
    },
    {
      nom: "Terbimax-F Cream",
    },
    {
      nom: "Tenali M 1000mg/20mg Tablet ER",
    },
    {
      nom: "Telicad 3D Tablet",
    },
    {
      nom: "Torsinex 20 Tablet",
    },
    {
      nom: "Tetan Beta 50 Tablet ER",
    },
    {
      nom: "Terapress 1 Tablet",
    },
    {
      nom: "Telmisat H Tablet",
    },
    {
      nom: "Triglynase 1 Forte Tablet SR",
    },
    {
      nom: "Track D 80mg/250mg/250mg Tablet",
    },
    {
      nom: "Trineurosol HV Injection",
    },
    {
      nom: "Telmiwock  40mg Tablet",
    },
    {
      nom: "TG-Tor EZ Tablet",
    },
    {
      nom: "Telmisat CT 40 Tablet",
    },
    {
      nom: "Tonact Plus Tablet ER",
    },
    {
      nom: "Tonact Plus Tablet ER",
    },
    {
      nom: "Tozaar-H Tablet",
    },
    {
      nom: "Tolol AM 25mg Tablet",
    },
    {
      nom: "Tetan CT 12.5 Tablet",
    },
    {
      nom: "Triformin 5mg/500mg/15mg Tablet",
    },
    {
      nom: "Tendrone 1% Lotion",
    },
    {
      nom: "Telmed 80 Tablet",
    },
    {
      nom: "Telzox 20 Tablet",
    },
    {
      nom: "Trioptal 150 Tablet",
    },
    {
      nom: "Triamaderm Ointment",
    },
    {
      nom: "Torleva XR 1000 Tablet",
    },
    {
      nom: "Tenolol-AM 50 Tablet",
    },
    {
      nom: "Trikorium Cream",
    },
    {
      nom: "Teravir Tablet",
    },
    {
      nom: "Telmijub CH 40 Tablet",
    },
    {
      nom: "Trimetaday V 2 Tablet SR",
    },
    {
      nom: "Tramic-MF Tablet",
    },
    {
      nom: "Telsite 20mg Tablet",
    },
    {
      nom: "Tantum Gel",
    },
    {
      nom: "T-Him Depot Injection",
    },
    {
      nom: "Tellzy 80-H Tablet",
    },
    {
      nom: "Telmikaa CT Tablet",
    },
    {
      nom: "Telmikaa CT Tablet",
    },
    {
      nom: "Tretinec A 0.025% Cream",
    },
    {
      nom: "Telfirst 40 Tablet",
    },
    {
      nom: "Twinblok  10 Tablet",
    },
    {
      nom: "Tiomist Respicap",
    },
    {
      nom: "Trinogab-M Tablet",
    },
    {
      nom: "Trioptal Suspension",
    },
    {
      nom: "Tacromus 0.5 Capsule",
    },
    {
      nom: "Thioquest 8mg Fast Acting Capsule",
    },
    {
      nom: "Tearmist Eye Drop",
    },
    {
      nom: "Targit 20 Tablet",
    },
    {
      nom: "Tcris Cream",
    },
    {
      nom: "Terbison Cream",
    },
    {
      nom: "Ticabest Tablet",
    },
    {
      nom: "Telmed H 80 Tablet",
    },
    {
      nom: "Telong 40mg Tablet",
    },
    {
      nom: "Thiofer AC4 Tablet",
    },
    {
      nom: "Twinrix Adult Injection",
    },
    {
      nom: "Telmijub AM 40 Tablet",
    },
    {
      nom: "Tenamit-M Tablet ER",
    },
    {
      nom: "Telday 80 AM Tablet",
    },
    {
      nom: "Torbulk Powder",
    },
    {
      nom: "Telma-R 2.5 Tablet",
    },
    {
      nom: "Telmed-AH 80 Tablet",
    },
    {
      nom: "Trelax Tablet",
    },
    {
      nom: "Telmijub Beta 25 Tablet ER",
    },
    {
      nom: "Triolvance 20 Tablet",
    },
    {
      nom: "Trigulin 1 Tablet SR",
    },
    {
      nom: "Torget 40 Tablet",
    },
    {
      nom: "Telmikaa H Tablet",
    },
    {
      nom: "Tolaz DT 2.5 Tablet",
    },
    {
      nom: "Telsar CH 80mg/12.5mg Tablet",
    },
    {
      nom: "Tulac 10gm Syrup",
    },
    {
      nom: "TG-Tor 5 Tablet",
    },
    {
      nom: "Trimetride 2 Tablet PR",
    },
    {
      nom: "Twincal 20 Tablet",
    },
    {
      nom: "Tigatel-CH 80mg/12.5mg Tablet",
    },
    {
      nom: "Twincal 5 Tablet",
    },
    {
      nom: "Tribetrol 1 Forte Tablet SR",
    },
    {
      nom: "Telday 80 H Tablet",
    },
    {
      nom: "Trioptal 450 Tablet",
    },
    {
      nom: "Takfenac Eye Drop",
    },
    {
      nom: "Torleva 1000 Tablet",
    },
    {
      nom: "Tacloran 1 Capsule",
    },
    {
      nom: "Timanol 0.5% Eye Drop",
    },
    {
      nom: "Triolvance 40 Tablet",
    },
    {
      nom: "Thicomus-AC 4 Tablet",
    },
    {
      nom: "Telpil 40mg Tablet",
    },
    {
      nom: "Tel-Cad-AM 40 Tablet",
    },
    {
      nom: "Triben Dusting Powder",
    },
    {
      nom: "Trigli 2 Tablet SR",
    },
    {
      nom: "Thalitero Capsule",
    },
    {
      nom: "Telzox M 40mg/50mg Tablet ER",
    },
    {
      nom: "Thioquest DP8 Capsule",
    },
    {
      nom: "Tretoact 25 Capsule",
    },
    {
      nom: "Tebina 125mg Tablet DT",
    },
    {
      nom: "Telpres H 80 Tablet",
    },
    {
      nom: "Tadasure 20 Disintegrating Strip",
    },
    {
      nom: "Tel-Cad 20 Tablet",
    },
    {
      nom: "Tacstead  1.0 Capsule",
    },
    {
      nom: "Tetanus 40IU Vaccine",
    },
    {
      nom: "Topaz 200 Tablet",
    },
    {
      nom: "Terbicort Cream",
    },
    {
      nom: "Tenoric-LD 50/6.25 Tablet",
    },
    {
      nom: "Tadgo 10mg Disintegrating Strip",
    },
    {
      nom: "Twinblok M 50 Tablet ER",
    },
    {
      nom: "Terbimax-F Lotion",
    },
    {
      nom: "Tricodruf Anti-Dandruff Lotion",
    },
    {
      nom: "Tenlison-M 1000mg/20mg Tablet",
    },
    {
      nom: "Tolar Eye Drop",
    },
    {
      nom: "Tamica-H 40 Tablet",
    },
    {
      nom: "Telmipharm 40 Tablet",
    },
    {
      nom: "Troid 5mg Tablet",
    },
    {
      nom: "Tercin WHP Powder",
    },
    {
      nom: "Telkonol 80H Tablet",
    },
    {
      nom: "Translol -XL 50 Tablet",
    },
    {
      nom: "Topmycin Gel",
    },
    {
      nom: "Tenuvia Tablet",
    },
    {
      nom: "Tenlitab M 500mg/20mg Tablet",
    },
    {
      nom: "Terbiskin-M Cream",
    },
    {
      nom: "Tinitraz 200 Capsule",
    },
    {
      nom: "Tazpure-LN 80 Tablet",
    },
    {
      nom: "Twintel 40 Tablet",
    },
    {
      nom: "Triben Dusting Powder",
    },
    {
      nom: "Trilen Tablet",
    },
    {
      nom: "Terostil 20mg Tablet",
    },
    {
      nom: "Tafsure Tablet",
    },
    {
      nom: "Terfin Cream",
    },
    {
      nom: "Triolsar 20 HS Tablet",
    },
    {
      nom: "Telmisar 40mg Tablet",
    },
    {
      nom: "Targit 80 Tablet",
    },
    {
      nom: "Thioquest D 4 Capsule",
    },
    {
      nom: "T 1 Eye Drop",
    },
    {
      nom: "T Plus Eye Drop",
    },
    {
      nom: "Terbiface Cream",
    },
    {
      nom: "Temsi-AM 40 Tablet",
    },
    {
      nom: "Trancodol 20mg Tablet DT",
    },
    {
      nom: "Trimetride 1 Tablet PR",
    },
    {
      nom: "Telcros H Tablet",
    },
    {
      nom: "Tetanus Toxoid Vaccine Adsorbed",
    },
    {
      nom: "Telelak MT 40mg/50mg Tablet",
    },
    {
      nom: "Telmijub 20 Tablet",
    },
    {
      nom: "Tretinec A 0.05% Cream",
    },
    {
      nom: "Tcris Cream",
    },
    {
      nom: "Tincher-OZ Ointment",
    },
    {
      nom: "Telmikaa 20 Tablet",
    },
    {
      nom: "Tenlip-M Forte Tablet SR",
    },
    {
      nom: "Tenepan-M 500 Tablet ER",
    },
    {
      nom: "Teglipt M 500mg/20mg Tablet",
    },
    {
      nom: "Trabec 1mg Solution for Infusion",
    },
    {
      nom: "TenDC Tablet",
    },
    {
      nom: "Trifect Syrup",
    },
    {
      nom: "Travoprostin-T Ophthalmic Solution",
    },
    {
      nom: "Thyrotas 12.5 Tablet",
    },
    {
      nom: "Thyrotas 12.5 Tablet",
    },
    {
      nom: "Tenarica Tablet",
    },
    {
      nom: "Taxalic Ointment",
    },
    {
      nom: "Triexer 1 Kit",
    },
    {
      nom: "Terbicrat Cream",
    },
    {
      nom: "Twinblok  5mg Tablet",
    },
    {
      nom: "Tolol -XR 100 Tablet",
    },
    {
      nom: "Terbifast 1% Cream",
    },
    {
      nom: "Tenzulix M 500 Tablet ER",
    },
    {
      nom: "Teleact 80 Tablet",
    },
    {
      nom: "Topaine 25mg Tablet",
    },
    {
      nom: "Telsite 80mg Tablet",
    },
    {
      nom: "Topcos 500 Tablet",
    },
    {
      nom: "Tenzulix Tablet",
    },
    {
      nom: "Tetan 80 Tablet",
    },
    {
      nom: "Thalitel 40 Tablet",
    },
    {
      nom: "Theowind 400mg Tablet",
    },
    {
      nom: "Terfin Dusting Powder",
    },
    {
      nom: "Telmijub AM 80mg Tablet",
    },
    {
      nom: "Tazopen 4000 mg/500 mg Injection",
    },
    {
      nom: "Tcris Cream",
    },
    {
      nom: "Termonix Cream",
    },
    {
      nom: "Terbee Cream",
    },
    {
      nom: "Thalitel 80 Tablet",
    },
    {
      nom: "Tenepace Tablet",
    },
    {
      nom: "Torsilong 5 Tablet",
    },
    {
      nom: "Tripride 1 LV Tablet SR",
    },
    {
      nom: "Tablura 40 Tablet",
    },
    {
      nom: "Tadgo 20mg Disintegrating Strip",
    },
    {
      nom: "Thyrotas 25 Tablet",
    },
    {
      nom: "Telday CH 80 Tablet",
    },
    {
      nom: "Telmijub CH 80mg Tablet",
    },
    {
      nom: "Udiliv 300 Tablet",
    },
    {
      nom: "Urispas Tablet",
    },
    {
      nom: "Urimax D Tablet MR",
    },
    {
      nom: "Urimax 0.4 Capsule MR",
    },
    {
      nom: "Ursocol 300 Tablet",
    },
    {
      nom: "Udiliv 150mg Tablet",
    },
    {
      nom: "Unwanted 21 Days Tablet",
    },
    {
      nom: "Udapa 10 Tablet",
    },
    {
      nom: "Urikind Tablet",
    },
    {
      nom: "Uribid Tablet",
    },
    {
      nom: "Urotone Tablet",
    },
    {
      nom: "Ugesic Sublingual tablet",
    },
    {
      nom: "Ulgel-A Oral Suspension",
    },
    {
      nom: "Ulgel Oral Suspension Saunf Sugar Free",
    },
    {
      nom: "Ubicar Tablet",
    },
    {
      nom: "Unicontin-E 400 Tablet CR",
    },
    {
      nom: "Uphold Tablet",
    },
    {
      nom: "Urikind-K Solution",
    },
    {
      nom: "Ursocol SR 450 Tablet",
    },
    {
      nom: "Ultrabrite Cream",
    },
    {
      nom: "Unistar 75 Capsule",
    },
    {
      nom: "Urifast Capsule",
    },
    {
      nom: "Ursocol 150 Tablet",
    },
    {
      nom: "Ulpan-DSR Capsule",
    },
    {
      nom: "Ultitar CS Lotion",
    },
    {
      nom: "Ursetor 300 Tablet",
    },
    {
      nom: "Ursokem 300 Tablet",
    },
    {
      nom: "Ursomax 300 Tablet",
    },
    {
      nom: "Urimax F Capsule MR",
    },
    {
      nom: "Urimax DX Tablet MR",
    },
    {
      nom: "Udiliv 450mg Tablet",
    },
    {
      nom: "Usibon 300 Tablet",
    },
    {
      nom: "Urivoid Tablet",
    },
    {
      nom: "Uprise-D3 6L Injection 1ml",
    },
    {
      nom: "Ultra Gel Eye Drop",
    },
    {
      nom: "Urdohep 300 Tablet",
    },
    {
      nom: "Urivron Tablet",
    },
    {
      nom: "Urimax 0.2 Capsule MR",
    },
    {
      nom: "Uritin-D Tablet MR",
    },
    {
      nom: "Udcament Oral Suspension",
    },
    {
      nom: "Uripro 0.4 Capsule PR",
    },
    {
      nom: "Ursocad 300 Tablet",
    },
    {
      nom: "Uriliser MB6 Oral Solution Lemon Sugar Free",
    },
    {
      nom: "Uticept Tablet",
    },
    {
      nom: "Udihep Forte Tablet",
    },
    {
      nom: "UDP-AT Tablet",
    },
    {
      nom: "Ulpan-D Tablet",
    },
    {
      nom: "Uvox Tablet",
    },
    {
      nom: "Urosol Syrup",
    },
    {
      nom: "Urinif 100mg Tablet SR",
    },
    {
      nom: "Udiliv 600 Tablet",
    },
    {
      nom: "Ultiderm Lotion",
    },
    {
      nom: "Uniprogestin 500mg Injection",
    },
    {
      nom: "Urivel Tablet",
    },
    {
      nom: "Ulgel Oral Suspension Saunf",
    },
    {
      nom: "Uritin 0.4mg Tablet",
    },
    {
      nom: "Ursodil 300mg Tablet",
    },
    {
      nom: "Udihep Tablet",
    },
    {
      nom: "Ulpan Tablet",
    },
    {
      nom: "Udgrace 300mg Tablet",
    },
    {
      nom: "Unicarbazan Forte Tablet",
    },
    {
      nom: "Udimarin Tablet",
    },
    {
      nom: "Uvox 100 Tablet",
    },
    {
      nom: "Unistar 20/150 Capsule",
    },
    {
      nom: "Uvox CR 150 Tablet",
    },
    {
      nom: "Ulitas 5 Tablet",
    },
    {
      nom: "Unicontin-E 600 Tablet CR",
    },
    {
      nom: "Ursetor 150 Tablet",
    },
    {
      nom: "Urofit Oral Solution",
    },
    {
      nom: "Udinol 300mg Tablet",
    },
    {
      nom: "Usibon 150 Tablet",
    },
    {
      nom: "U-B Fair Cream",
    },
    {
      nom: "U Tryp 100000IU Injection",
    },
    {
      nom: "Ubil Tablet",
    },
    {
      nom: "Uthral 500mg Tablet",
    },
    {
      nom: "Ursetor SR 450 Tablet",
    },
    {
      nom: "Unistar Gold 10/75 Capsule",
    },
    {
      nom: "Ultigel",
    },
    {
      nom: "Unistar 150 Capsule",
    },
    {
      nom: "Urdohep 150 Tablet",
    },
    {
      nom: "Ursocol SR 600 Tablet",
    },
    {
      nom: "Unicalcin 100IU Injection",
    },
    {
      nom: "Urifree Tablet",
    },
    {
      nom: "Urdiogem 300 Tablet",
    },
    {
      nom: "Ulgel Tablet Saunf",
    },
    {
      nom: "Unistar 5/75 Capsule",
    },
    {
      nom: "Utamide Tablet",
    },
    {
      nom: "Ultravex S6 Ointment",
    },
    {
      nom: "Uvdyne Mouth Wash",
    },
    {
      nom: "Uvox CR 100mg Tablet",
    },
    {
      nom: "Uprise-D3 6L Injection 1ml",
    },
    {
      nom: "Ulgel Oral Suspension Elaichi Sugar Free",
    },
    {
      nom: "Urisurge-D Capsule PR",
    },
    {
      nom: "Ulgel Tablet",
    },
    {
      nom: "Ultitar CS Ointment",
    },
    {
      nom: "Urinet 200mg Tablet",
    },
    {
      nom: "Usal LS Drops",
    },
    {
      nom: "Ursodil -SR Tablet",
    },
    {
      nom: "Unigef 250mg Tablet",
    },
    {
      nom: "Ubexa 80 Tablet",
    },
    {
      nom: "Ultravex Cream",
    },
    {
      nom: "Urgiso Tablet",
    },
    {
      nom: "Utreva Vaginal gel",
    },
    {
      nom: "Ursomax 450 SR Tablet",
    },
    {
      nom: "Ultravex S3 Ointment",
    },
    {
      nom: "Udimarin Forte SR Tablet",
    },
    {
      nom: "Urofit Oral Solution",
    },
    {
      nom: "Ursocad 150 Tablet",
    },
    {
      nom: "Udcoliv 300 Tablet",
    },
    {
      nom: "Urikem Syrup",
    },
    {
      nom: "Udinorm 300mg Tablet",
    },
    {
      nom: "Urisurge Tablet PR",
    },
    {
      nom: "Urijon 300mg Tablet",
    },
    {
      nom: "Uniair FX Tablet",
    },
    {
      nom: "Udzire 100mg Tablet",
    },
    {
      nom: "Ubiphene Tablet",
    },
    {
      nom: "Udicol 150mg Tablet",
    },
    {
      nom: "Ubiphene 50 Tablet",
    },
    {
      nom: "Ultituss Oral Suspension",
    },
    {
      nom: "Utrogestan 200mg Soft Gelatin Capsule",
    },
    {
      nom: "Uterone SR 300 Tablet",
    },
    {
      nom: "Ubicar Cream",
    },
    {
      nom: "Uniwalk Capsule",
    },
    {
      nom: "UGR Free Softgel Capsule",
    },
    {
      nom: "Ultigest -SR 200 Tablet",
    },
    {
      nom: "Udigold 300 Tablet",
    },
    {
      nom: "Ubiphene 100 Tablet",
    },
    {
      nom: "Ubiphene 100 Tablet",
    },
    {
      nom: "Uterone 100 Injection",
    },
    {
      nom: "Ultican 200mg Capsule",
    },
    {
      nom: "Ulphix D Capsule",
    },
    {
      nom: "Urigal 200 Tablet",
    },
    {
      nom: "Ultigest-SR 300 Tablet",
    },
    {
      nom: "Ultichem-SP Tablet",
    },
    {
      nom: "Vertin 16 Tablet",
    },
    {
      nom: "Vigore 100 Red Tablet",
    },
    {
      nom: "Vasograin Tablet",
    },
    {
      nom: "Voveran SR 100 Tablet",
    },
    {
      nom: "VSL 3 Capsule",
    },
    {
      nom: "Vertin 8mg Tablet",
    },
    {
      nom: "Veloz D Capsule SR",
    },
    {
      nom: "Vomikind -MD 4 Tablet",
    },
    {
      nom: "Vymada 50mg Tablet",
    },
    {
      nom: "Vitcofol Injection",
    },
    {
      nom: "Veltam 0.4 Tablet MR",
    },
    {
      nom: "Vigamox Ophthalmic Solution",
    },
    {
      nom: "Viagra 50mg Tablet",
    },
    {
      nom: "Veltam Plus Tablet MR",
    },
    {
      nom: "Vertigon Tablet",
    },
    {
      nom: "Vomikind Syrup",
    },
    {
      nom: "Vigore Lido Spray",
    },
    {
      nom: "Veloz 20 Tablet",
    },
    {
      nom: "Vitamin A Chewable Tablet",
    },
    {
      nom: "Ventidox-M Tablet SR",
    },
    {
      nom: "Voveran 50 GE Tablet",
    },
    {
      nom: "Valcivir 1000 Tablet",
    },
    {
      nom: "Vertistar -MD 16 Tablet",
    },
    {
      nom: "Voveran AQ Injection",
    },
    {
      nom: "Vildamac M 50/500 Tablet",
    },
    {
      nom: "Vigore 50 Red Tablet",
    },
    {
      nom: "Vozet Tablet",
    },
    {
      nom: "Volibo 0.3 Tablet",
    },
    {
      nom: "Vertin 24 Tablet",
    },
    {
      nom: "Veldrop Lubricant Eye Drop",
    },
    {
      nom: "Voveran-D Tablet DT",
    },
    {
      nom: "Vertizac Tablet",
    },
    {
      nom: "Vymada 100mg Tablet",
    },
    {
      nom: "Valbet Cream",
    },
    {
      nom: "Vitcofol-C Combipack Injection",
    },
    {
      nom: "Valprol -CR 500 Tablet",
    },
    {
      nom: "Voveran SR 75 Tablet",
    },
    {
      nom: "Viscodyne  Syrup Sugar Free",
    },
    {
      nom: "Venusmin 300 Tablet",
    },
    {
      nom: "Verifica-M 500mg/50mg Tablet",
    },
    {
      nom: "Vernace Tablet",
    },
    {
      nom: "Vomilast -OD Tablet",
    },
    {
      nom: "Valparin 200 Oral Solution Delicious Pineapple",
    },
    {
      nom: "VaxiFlu 4 Vaccine",
    },
    {
      nom: "Victoza Solution for Injection",
    },
    {
      nom: "Veloz L Capsule SR",
    },
    {
      nom: "Vomistop Tablet",
    },
    {
      nom: "Valcivir 500 Tablet",
    },
    {
      nom: "Veloz IT Capsule PR",
    },
    {
      nom: "Veltam-S Combipack",
    },
    {
      nom: "Vepan 500mg Tablet",
    },
    {
      nom: "Vylda-M 500 Tablet",
    },
    {
      nom: "Vertistar - MD 8 Tablet",
    },
    {
      nom: "Veltam-F Tablet MR",
    },
    {
      nom: "Valprol -CR 300 Tablet",
    },
    {
      nom: "Vetory SP Tablet",
    },
    {
      nom: "Veniz XR 75 Capsule",
    },
    {
      nom: "Vomiford -MD Tablet",
    },
    {
      nom: "Vertigen Tablet",
    },
    {
      nom: "Ventidox-Bro Tablet",
    },
    {
      nom: "Vertiford 16mg Tablet",
    },
    {
      nom: "Virson Ophthalmic Gel",
    },
    {
      nom: "Vinglyn M 500 Tablet",
    },
    {
      nom: "Visanne Tablet",
    },
    {
      nom: "Venusmin 900 Tablet",
    },
    {
      nom: "Voveran Plus Tablet",
    },
    {
      nom: "Ventab Dxt 50 Tablet ER",
    },
    {
      nom: "Vildamac 50 Tablet",
    },
    {
      nom: "Vegaz OD Tablet PR",
    },
    {
      nom: "Vitamin C Injection",
    },
    {
      nom: "Volix 0.3mg Tablet",
    },
    {
      nom: "Vertin OD 48mg Tablet SR",
    },
    {
      nom: "Veldrop Gel",
    },
    {
      nom: "Vigadexa Ophthalmic Solution",
    },
    {
      nom: "Vanlid 250mg Capsule",
    },
    {
      nom: "Verbet 16 Tablet",
    },
    {
      nom: "Visbiome Capsule",
    },
    {
      nom: "Vasoglor 90 Tablet",
    },
    {
      nom: "Vigoquin-LP Eye Drop",
    },
    {
      nom: "Voage 10mg Tablet",
    },
    {
      nom: "Veltam 0.2 Tablet MR",
    },
    {
      nom: "Vitcofol S 100mg Injection",
    },
    {
      nom: "Viropil Tablet",
    },
    {
      nom: "Valgan Tablet",
    },
    {
      nom: "Vertigon Forte Tablet",
    },
    {
      nom: "Valprol-CR 200 Tablet",
    },
    {
      nom: "Vomikind-Fast Strip",
    },
    {
      nom: "Venlor-XR 37.5 Capsule",
    },
    {
      nom: "Vertiron Tablet",
    },
    {
      nom: "Vogs-GM 2 Tablet SR",
    },
    {
      nom: "Vetory P Tablet",
    },
    {
      nom: "Vasfree 100 Capsule",
    },
    {
      nom: "Varimax 20 Tablet",
    },
    {
      nom: "Viscodyne-D Syrup",
    },
    {
      nom: "Vomikind Injection",
    },
    {
      nom: "Ventryl-D Syrup",
    },
    {
      nom: "Vertidom Tablet",
    },
    {
      nom: "Vorier 200mg Tablet",
    },
    {
      nom: "Veniz XR 37.5 Capsule",
    },
    {
      nom: "Venlor-XR 75 Capsule",
    },
    {
      nom: "Ventab DXT 25 Tablet ER",
    },
    {
      nom: "Vermact 12 Tablet DT",
    },
    {
      nom: "Volibo 0.2 Tablet",
    },
    {
      nom: "Vasocon Injection",
    },
    {
      nom: "Voglimac GM 2 Tablet SR",
    },
    {
      nom: "Valtoval 1g Tablet",
    },
    {
      nom: "Vymada 200mg Tablet",
    },
    {
      nom: "Voritrol 200 Tablet",
    },
    {
      nom: "Volibo M 0.3 Tablet",
    },
    {
      nom: "Voglimet-GM Tablet SR",
    },
    {
      nom: "Valera Tablet",
    },
    {
      nom: "Vildamac M 50/1000 Tablet",
    },
    {
      nom: "Vigora Spray",
    },
    {
      nom: "Vilnip M 500 Tablet",
    },
    {
      nom: "Veenat 400 Tablet",
    },
    {
      nom: "Vilpower-M 500 Tablet",
    },
    {
      nom: "Vinicor XL 25 Tablet PR",
    },
    {
      nom: "Volapride-Plus Capsule SR",
    },
    {
      nom: "Variped Vaccine",
    },
    {
      nom: "Vinicor XL 50 Tablet",
    },
    {
      nom: "Vertin OD 24mg Tablet SR",
    },
    {
      nom: "Viraday Tablet",
    },
    {
      nom: "Valzaar 40 Tablet",
    },
    {
      nom: "Vitilex 150mg Tablet",
    },
    {
      nom: "Volix Trio 2 Tablet ER",
    },
    {
      nom: "Valdiff-M 500 Tablet",
    },
    {
      nom: "Vildapride 50 Tablet",
    },
    {
      nom: "Viscodyne-LS Plus Expectorant",
    },
    {
      nom: "Ventryl Expectorant",
    },
    {
      nom: "Varimax 10 Tablet",
    },
    {
      nom: "Viboliv Tablet",
    },
    {
      nom: "Vinglyn Tablet",
    },
    {
      nom: "Vogli Trio 0.3 Tablet SR",
    },
    {
      nom: "Virovir 500 Tablet",
    },
    {
      nom: "Valanext 1000mg Tablet",
    },
    {
      nom: "Vozole Eye Drop",
    },
    {
      nom: "Vinicor-AM 50/5 Tablet PR",
    },
    {
      nom: "Vintor 4000 Injection",
    },
    {
      nom: "Verifica Tablet",
    },
    {
      nom: "Voglinorm GM Forte 2 Tablet SR",
    },
    {
      nom: "Ventocore DL Tablet SR",
    },
    {
      nom: "Voritek 200 Tablet",
    },
    {
      nom: "VesiBeta 25 Tablet ER",
    },
    {
      nom: "Venpres 40mg Tablet",
    },
    {
      nom: "Volix M 0.3 Tablet",
    },
    {
      nom: "Vintor 10000IU Injection",
    },
    {
      nom: "Vogli-GM 2 Tablet",
    },
    {
      nom: "Velfu Tablet PR",
    },
    {
      nom: "Vitaresp FX Suspension",
    },
    {
      nom: "Volix 0.2mg Tablet",
    },
    {
      nom: "Vertistar -MD 24 Tablet",
    },
    {
      nom: "Ventab XL 75 Tablet PR",
    },
    {
      nom: "VesiBeta 50 Tablet ER",
    },
    {
      nom: "Vilact M 500 Tablet",
    },
    {
      nom: "Vertiford 8mg Tablet",
    },
    {
      nom: "Vogliboz-GM2 Tablet",
    },
    {
      nom: "Venpres-AM Tablet",
    },
    {
      nom: "Vogli-Rapid 0.3/1.0 Tablet",
    },
    {
      nom: "Vibite M 500 Tablet",
    },
    {
      nom: "Valkem-OD 500 Tablet SR",
    },
    {
      nom: "Valamac 1000mg Tablet",
    },
    {
      nom: "Vitaresp FX 180 Tablet",
    },
    {
      nom: "Volibo M 0.2 Tablet",
    },
    {
      nom: "Voglistar -MD 0.3 Tablet",
    },
    {
      nom: "Vominorm 10mg Tablet",
    },
    {
      nom: "Vilatin-M 50/500 Tablet",
    },
    {
      nom: "V D3 Sachet",
    },
    {
      nom: "Vaxirab N 2.5IU Injection",
    },
    {
      nom: "Vildaphage-M Tablet",
    },
    {
      nom: "Viviloref Tablet",
    },
    {
      nom: "Vogs-GM 2/0.3 Tablet SR",
    },
    {
      nom: "Vanking 500mg Injection",
    },
    {
      nom: "Valent 40 Tablet",
    },
    {
      nom: "Valprid CR 500 Tablet",
    },
    {
      nom: "Voxate Tablet",
    },
    {
      nom: "Voglitor MF 0.3 Tablet",
    },
    {
      nom: "Voglinorm-GM2 Tablet SR",
    },
    {
      nom: "Vidaglo-M 50/500 Tablet",
    },
    {
      nom: "Vogli Trio 0.2 Tablet SR",
    },
    {
      nom: "Vinicor-AM 25/5 Tablet Tablet PR",
    },
    {
      nom: "Voglitor MF 0.2 Tablet",
    },
    {
      nom: "Varivax Vaccine",
    },
    {
      nom: "Voglimac GM 1 Tablet SR",
    },
    {
      nom: "Vinicor-D 50 Tablet",
    },
    {
      nom: "Vogli-M  0.3 Tablet",
    },
    {
      nom: "Veniz XR 150 Capsule",
    },
    {
      nom: "Vobose 0.3 Tablet",
    },
    {
      nom: "Verifica-M 1000mg/50mg Tablet",
    },
    {
      nom: "Vilano 20 Tablet",
    },
    {
      nom: "Ventab XL 37.5 Tablet",
    },
    {
      nom: "Viveta Cream",
    },
    {
      nom: "Vominos 25mg Tablet",
    },
    {
      nom: "Vitilex 50mg Tablet",
    },
    {
      nom: "Vysov 50mg Tablet",
    },
    {
      nom: "Vinlep 300 Tablet",
    },
    {
      nom: "Venpres-H 40mg/12.5mg Tablet",
    },
    {
      nom: "Vesigard 7.5 Tablet PR",
    },
    {
      nom: "Vogli 0.2 Tablet MD",
    },
    {
      nom: "Veltride Tablet",
    },
    {
      nom: "Vildanat-M 500mg/50mg Tablet",
    },
    {
      nom: "Venusmin 150 Tablet",
    },
    {
      nom: "Vildanex M 500mg/50mg Tablet",
    },
    {
      nom: "Voglibite-GM 2 Tablet SR",
    },
    {
      nom: "Valance Oral Solution",
    },
    {
      nom: "Valkem-OD 250 Tablet SR",
    },
    {
      nom: "Venlite OD 50 Tablet ER",
    },
    {
      nom: "Veloz M Capsule SR",
    },
    {
      nom: "Vogli-GM 1 Tablet SR",
    },
    {
      nom: "Vitanova-D3 6L Injection",
    },
    {
      nom: "Vysov-M 500mg/50mg Tablet",
    },
    {
      nom: "Vilpower 50 Tablet",
    },
    {
      nom: "Valprid CR 300 Tablet",
    },
    {
      nom: "Volix M 0.2 Tablet",
    },
    {
      nom: "Valamac 500mg Tablet",
    },
    {
      nom: "Valent 80 Tablet",
    },
    {
      nom: "Vogs-M 0.3 Tablet SR",
    },
    {
      nom: "Vibanuron Tablet",
    },
    {
      nom: "Vildaphage Tablet",
    },
    {
      nom: "Vintel-CtC Tablet",
    },
    {
      nom: "Vingraf 1 Capsule",
    },
    {
      nom: "Valtec CR 500 Tablet",
    },
    {
      nom: "Vinglyn M 1000 Tablet",
    },
    {
      nom: "Verbet 8 Tablet",
    },
    {
      nom: "Vogli-GM 2 Forte Tablet SR",
    },
    {
      nom: "Vozuca Activ 0.3 Tablet",
    },
    {
      nom: "Venla -XR 75 capsule",
    },
    {
      nom: "Voglinorm GM 2/0.3 Tablet SR",
    },
    {
      nom: "Vomikind Injection",
    },
    {
      nom: "Ventab DXT 100 Tablet ER",
    },
    {
      nom: "Venlift OD 75 Capsule PR",
    },
    {
      nom: "Venlor-XR 150 Capsule",
    },
    {
      nom: "Venphylin-M Tablet SR",
    },
    {
      nom: "Vobose 0.2 Tablet",
    },
    {
      nom: "Vobit M 0.3 Tablet SR",
    },
    {
      nom: "Vilazine 20 Tablet",
    },
    {
      nom: "Vinicor-D 25 Tablet ER",
    },
    {
      nom: "Vorifast 200 Tablet",
    },
    {
      nom: "Vasosure Tablet",
    },
    {
      nom: "Ventocore AX 75mg/5mg/10mg Tablet",
    },
    {
      nom: "VitBuz Softgel Capsule",
    },
    {
      nom: "V 2 Plus Tablet",
    },
    {
      nom: "Voglimac 0.3 Tablet",
    },
    {
      nom: "Voglinorm-GM1 Tablet SR",
    },
    {
      nom: "Vigoquin-T Eye Drop",
    },
    {
      nom: "Vogli-Rapid 0.3/0.5 Tablet",
    },
    {
      nom: "Virovir 250 Tablet",
    },
    {
      nom: "Viatran 1000mg/500mg Injection",
    },
    {
      nom: "Vetory MX Tablet",
    },
    {
      nom: "Viscodyne-LS Expectorant",
    },
    {
      nom: "Vinicor-AM 25/2.5 Tablet PR",
    },
    {
      nom: "Vysov-M 50mg/1000mg Tablet",
    },
    {
      nom: "Valtoval 500 Tablet",
    },
    {
      nom: "Vertipress 16 Tablet",
    },
    {
      nom: "Voxamin 50 Tablet",
    },
    {
      nom: "Venlift OD 37.5 Capsule PR",
    },
    {
      nom: "Vasovin - XL 2.5 Capsule",
    },
    {
      nom: "Valprol -CR 750 Tablet",
    },
    {
      nom: "Vigoquin-KT Eye Drop",
    },
    {
      nom: "Vogli-M  0.2 Tablet",
    },
    {
      nom: "Vogo-M 0.3 Tablet",
    },
    {
      nom: "Valtec CR 300 Tablet",
    },
    {
      nom: "Vobose M 0.3 Tablet SR",
    },
    {
      nom: "Valanix 1000mg Tablet",
    },
    {
      nom: "Vilnip M 1000 Tablet",
    },
    {
      nom: "Voxidep 25 Tablet",
    },
    {
      nom: "Vertin MDS Orally Disintegrating Strip",
    },
    {
      nom: "Voxamin 100 Tablet",
    },
    {
      nom: "Valz 20 Tablet",
    },
    {
      nom: "Vilodon 20 Tablet",
    },
    {
      nom: "Valgress -CR 500 Tablet",
    },
    {
      nom: "Valanext 500mg Tablet",
    },
    {
      nom: "Voxylid 600mg Tablet",
    },
    {
      nom: "Vinlep Suspension Delicious Lemon Plum",
    },
    {
      nom: "Voriways Tablet",
    },
    {
      nom: "Voglimac MF 0.3 Tablet SR",
    },
    {
      nom: "Vertirest 16mg Tablet",
    },
    {
      nom: "Valzaar 160 Tablet",
    },
    {
      nom: "Vpl 5mg Injection",
    },
    {
      nom: "Valprol -CR 400 Tablet",
    },
    {
      nom: "Veenat 100 Capsule",
    },
    {
      nom: "Valest 1 Tablet",
    },
    {
      nom: "Vidaglo Tablet",
    },
    {
      nom: "Valembic 40mg Tablet",
    },
    {
      nom: "Voxidep 50 Tablet",
    },
    {
      nom: "Ventirex-A Tablet",
    },
    {
      nom: "Ventab XL 150 Tablet",
    },
    {
      nom: "Voglistar-Plus 0.3 Tablet",
    },
    {
      nom: "Verbet 24 Tablet",
    },
    {
      nom: "Voglibite-GM 1 Tablet SR",
    },
    {
      nom: "Velol 50mg Tablet XL",
    },
    {
      nom: "Valgress-CR 300 Tablet",
    },
    {
      nom: "Vilpower-M 1000 Tablet",
    },
    {
      nom: "Voraze 200mg Tablet",
    },
    {
      nom: "Vilact M 1000 Tablet",
    },
    {
      nom: "Voxidep 100mg Tablet",
    },
    {
      nom: "Valrate CR 300 Tablet",
    },
    {
      nom: "Vitator SP Tablet",
    },
    {
      nom: "Valrate CR 500 Tablet",
    },
    {
      nom: "Vactyph Vaccine",
    },
    {
      nom: "Vesilife 5mg Tablet",
    },
    {
      nom: "Valent 160 Tablet",
    },
    {
      nom: "Valembic 80mg Tablet",
    },
    {
      nom: "Valzaar 80 Tablet",
    },
    {
      nom: "Vinlep 600 Tablet",
    },
    {
      nom: "Valdiff-M 1000 Tablet",
    },
    {
      nom: "Virolfi 450mg Tablet",
    },
    {
      nom: "Venosuf Capsule",
    },
    {
      nom: "Vintel 40AM Tablet",
    },
    {
      nom: "Varenya Cream",
    },
    {
      nom: "Vintel 40 Tablet",
    },
    {
      nom: "Vermact 12 Tablet DT",
    },
    {
      nom: "Vilamid 20 Tablet",
    },
    {
      nom: "Vendep-D 50 Tablet ER",
    },
    {
      nom: "Valkem OD  750mg Tablet",
    },
    {
      nom: "Valzaar-H 160 Tablet",
    },
    {
      nom: "Voglibite 0.3 Tablet MD",
    },
    {
      nom: "Vogo-M 0.2  Tablet",
    },
    {
      nom: "Versitol Retard 200 Tablet PR",
    },
    {
      nom: "Vesifa 5mg Tablet",
    },
    {
      nom: "Valros-F Tablet",
    },
    {
      nom: "Valgress-CR 200 Tablet",
    },
    {
      nom: "Vokanamet 50mg/500mg Tablet",
    },
    {
      nom: "Vozuca-M 0.3 Activ Tablet SR",
    },
    {
      nom: "Versitol Retard 300 Tablet PR",
    },
    {
      nom: "Venla -XR 150 Capsule",
    },
    {
      nom: "Vaniza HC Gel",
    },
    {
      nom: "Vidinorm Ophthalmic Solution",
    },
    {
      nom: "Valprol -CR 600 Tablet",
    },
    {
      nom: "Vilano 40 Tablet",
    },
    {
      nom: "Vildanat M 1000mg/50mg Tablet",
    },
    {
      nom: "Votrient 200mg Tablet",
    },
    {
      nom: "Vinlep 450 Tablet",
    },
    {
      nom: "Voglibite-M 0.3 Tablet SR",
    },
    {
      nom: "Vinpocare 5 Tablet",
    },
    {
      nom: "Vozuca Activ 0.2 Tablet",
    },
    {
      nom: "Velin-M 500 Tablet",
    },
    {
      nom: "Vilatin Tablet",
    },
    {
      nom: "Voglimac 0.2 Tablet",
    },
    {
      nom: "Voglitor MF Forte 0.3 Tablet",
    },
    {
      nom: "Volix Trio Forte 1 Tablet ER",
    },
    {
      nom: "Valent-H Tablet",
    },
    {
      nom: "Viclob N Cream",
    },
    {
      nom: "Voglistar-Plus 0.2 Tablet",
    },
    {
      nom: "Voglibite 0.2 Tablet",
    },
    {
      nom: "Vobose M 0.2 Tablet SR",
    },
    {
      nom: "Vidglit-M Tablet SR",
    },
    {
      nom: "Venphylin Plus Syrup",
    },
    {
      nom: "Vingraf 2mg Capsule",
    },
    {
      nom: "Vivian 1.16% Gel",
    },
    {
      nom: "Vogloyd 3D 2.2 Tablet PR",
    },
    {
      nom: "Valance 500 Oral Solution Colourless",
    },
    {
      nom: "Voglibite-M 0.2 Tablet SR",
    },
    {
      nom: "Voglitab-M 0.3 Tablet SR",
    },
    {
      nom: "Vylda-M 850 Tablet",
    },
    {
      nom: "Vibite M 1000 Tablet",
    },
    {
      nom: "Versitol Retard 400 Tablet PR",
    },
    {
      nom: "Vilodon 40mg Tablet",
    },
    {
      nom: "Volga R 0.5mg/0.3mg Tablet",
    },
    {
      nom: "Vilazine 40 Tablet",
    },
    {
      nom: "Vil-G Tablet",
    },
    {
      nom: "Valz 40 Tablet",
    },
    {
      nom: "Venlift OD 150 Capsule PR",
    },
    {
      nom: "Vonavir Tablet",
    },
    {
      nom: "Vinodine Antiseptic Germicidal Spray",
    },
    {
      nom: "Voxinix CR 100 Tablet",
    },
    {
      nom: "Vitaresp FX 30 Oral Suspension Mango",
    },
    {
      nom: "Volitra-Enzo Tablet",
    },
    {
      nom: "V Druf Lotion",
    },
    {
      nom: "Vibraset PNT 75mg/10mg/1500mcg Tablet",
    },
    {
      nom: "Vozuca-M Activ Tablet SR",
    },
    {
      nom: "Valanix 500 Tablet",
    },
    {
      nom: "Voxinix 100 Tablet",
    },
    {
      nom: "Valrate CR 200 Tablet",
    },
    {
      nom: "Vilarest 20 Tablet",
    },
    {
      nom: "Vidglit-M Forte Tablet PR",
    },
    {
      nom: "Voxee 100 Tablet SR",
    },
    {
      nom: "Vintel-CT Tablet",
    },
    {
      nom: "Vinicor XL 100 Tablet",
    },
    {
      nom: "Vertipress 24 Tablet",
    },
    {
      nom: "Vincan Injection",
    },
    {
      nom: "Vilamid 40 Tablet",
    },
    {
      nom: "Voglitab MD 0.3 Tablet",
    },
    {
      nom: "Vingraf 0.25 Capsule",
    },
    {
      nom: "Vito Gold D3 Oral Solution",
    },
    {
      nom: "Venlanz 2.5 Tablet MD",
    },
    {
      nom: "Vilmax-M 1000 Tablet",
    },
    {
      nom: "Voglikem 0.2 Tablet MD",
    },
    {
      nom: "Voglitab-M 0.2 Tablet SR",
    },
    {
      nom: "Vorto Gel",
    },
    {
      nom: "Vasozine 0.05% Eye Drop",
    },
    {
      nom: "Voglitab 0.2 Tablet",
    },
    {
      nom: "Vasnerv-P Tablet",
    },
    {
      nom: "Vidglit Tablet",
    },
    {
      nom: "Valepsy 500 Tablet",
    },
    {
      nom: "Vogligress 0.2mg Tablet",
    },
    {
      nom: "Vactyph Vaccine",
    },
    {
      nom: "Vysov-M 850mg/50mg Tablet",
    },
    {
      nom: "Vilarest 40 Tablet",
    },
    {
      nom: "Voglikem-M 0.2 Forte Tablet SR",
    },
    {
      nom: "Vomega-HD Soft Gelatin Capsule",
    },
    {
      nom: "Vomega-HD Soft Gelatin Capsule",
    },
    {
      nom: "Vesnac Tablet",
    },
    {
      nom: "Vasnerv Tablet",
    },
    {
      nom: "Vingose Met 0.3/500mg Tablet",
    },
    {
      nom: "Vomicare Oral Solution",
    },
    {
      nom: "Vomicare Oral Solution",
    },
    {
      nom: "Vabitus-LS Syrup",
    },
    {
      nom: "Wysolone 10 Tablet DT",
    },
    {
      nom: "Wikoryl DS Syrup Orange",
    },
    {
      nom: "Wysolone 5 Tablet DT",
    },
    {
      nom: "Walamycin Suspension",
    },
    {
      nom: "Wysolone 20 Tablet DT",
    },
    {
      nom: "Winolap Eye Drop",
    },
    {
      nom: "Wikoryl AF Syrup",
    },
    {
      nom: "Welminic Syrup Gluten Free",
    },
    {
      nom: "Warf 5 Tablet",
    },
    {
      nom: "Wikoryl 325 Tablet DT",
    },
    {
      nom: "Wikoryl AF Drops",
    },
    {
      nom: "Winolap DS Eye Drop",
    },
    {
      nom: "Wikoryl Oral Suspension American Ice Cream",
    },
    {
      nom: "Wokadine 10% Ointment",
    },
    {
      nom: "Willgo CR Tablet",
    },
    {
      nom: "Welminic Oral Drops",
    },
    {
      nom: "Walamycin  DS 25mg Suspension",
    },
    {
      nom: "Warf 2 Tablet",
    },
    {
      nom: "Winolap 5 Tablet",
    },
    {
      nom: "Wat-R Eye Drop",
    },
    {
      nom: "Welminic-P Syrup",
    },
    {
      nom: "Wingesic Plus Tablet",
    },
    {
      nom: "Wepox 10000IU Injection",
    },
    {
      nom: "Welminic DX Syrup",
    },
    {
      nom: "Wormin 100mg Tablet",
    },
    {
      nom: "Wakfree Tablet",
    },
    {
      nom: "Wincold Z Tablet",
    },
    {
      nom: "Wax-Off Kid Ear Drop",
    },
    {
      nom: "Wokadine Germicide Gargle 2% with Menthol",
    },
    {
      nom: "Welset Cold Tablet",
    },
    {
      nom: "Wokride-D Capsule SR",
    },
    {
      nom: "Wosulin-R 40IU/ml Injection",
    },
    {
      nom: "Womenox Injection",
    },
    {
      nom: "Walaphage -SR 500 Tablet",
    },
    {
      nom: "Winbp MT 50 Tablet",
    },
    {
      nom: "Walaphage 500 Tablet",
    },
    {
      nom: "Wokadine 10% Solution",
    },
    {
      nom: "Windose Tablet",
    },
    {
      nom: "Walaphage G 2 Tablet PR",
    },
    {
      nom: "Welset 650 Tablet",
    },
    {
      nom: "Wegamycin A Gel",
    },
    {
      nom: "Wytrol Capsule",
    },
    {
      nom: "Wokadine Gargle",
    },
    {
      nom: "Writex-Gold Soft Gelatin Capsule",
    },
    {
      nom: "Walaphage-G-1 Tablet PR",
    },
    {
      nom: "Wepox Injection",
    },
    {
      nom: "Wetica-DS Eye Drop",
    },
    {
      nom: "Wet-Comod Eye Drop",
    },
    {
      nom: "Wetica Eye Drop",
    },
    {
      nom: "Wokadine 5% Dusting Powder",
    },
    {
      nom: "Wosulin 30/70 40IU/ml Injection",
    },
    {
      nom: "Wokadine 5% Ointment",
    },
    {
      nom: "Winbp-Trio 20 Tablet",
    },
    {
      nom: "Weltelmi Trio 40mg/5mg/12.5mg Tablet",
    },
    {
      nom: "Winbp 40 Tablet",
    },
    {
      nom: "Walaphage -SR 1000 Tablet",
    },
    {
      nom: "Winbp 20 H Tablet",
    },
    {
      nom: "Weltelmi-AM 40 Tablet",
    },
    {
      nom: "Wokadine 5% Solution",
    },
    {
      nom: "Winbp CT 20/6.25 Tablet",
    },
    {
      nom: "Wincit M 5mg/10mg Tablet",
    },
    {
      nom: "Welooz-IG Husk Powder",
    },
    {
      nom: "Wocaine 2% Gel",
    },
    {
      nom: "Winbp CT 40/12.5 Tablet",
    },
    {
      nom: "Waypra-D Capsule SR",
    },
    {
      nom: "Womazol Tablet",
    },
    {
      nom: "Weltelmi MT 40mg/50mg Tablet",
    },
    {
      nom: "Wokadine 7.5% Surgical Scrub",
    },
    {
      nom: "Wosulin 50/50 Injection 40IU/ml",
    },
    {
      nom: "Wepox Safe 5000IU Injection",
    },
    {
      nom: "Wokadine M Cream",
    },
    {
      nom: "Xgeva Solution for Injection",
    },
    {
      nom: "Xbira 250mg Tablet",
    },
    {
      nom: "Xeloda 500mg Tablet",
    },
    {
      nom: "Xylocaine 2% Jelly",
    },
    {
      nom: "Xyzal 5mg Tablet",
    },
    {
      nom: "Xarelto 10mg Tablet",
    },
    {
      nom: "Xykaa MR 4 Tablet",
    },
    {
      nom: "Xone 1000mg Injection",
    },
    {
      nom: "Xyzal Syrup",
    },
    {
      nom: "Xarelto 20mg Tablet",
    },
    {
      nom: "Xyzal M Tablet",
    },
    {
      nom: "Xafinact 50 Tablet",
    },
    {
      nom: "Xylocaine 2% Injection",
    },
    {
      nom: "Xylocaine Viscous Solution",
    },
    {
      nom: "Xtor 10 Tablet",
    },
    {
      nom: "Xarelto 15mg Tablet",
    },
    {
      nom: "Xygrel 90 Tablet",
    },
    {
      nom: "Xylocaine Spray",
    },
    {
      nom: "Xenadom 500 Tablet",
    },
    {
      nom: "Xylocaine 5% Ointment",
    },
    {
      nom: "Xalatan Eye Drop",
    },
    {
      nom: "Xarelto 2.5mg Tablet",
    },
    {
      nom: "Xlha Eye Drop",
    },
    {
      nom: "Xtralite Mild Cream",
    },
    {
      nom: "Xoclave 625 Tablet",
    },
    {
      nom: "Xtralite Cream",
    },
    {
      nom: "Xyzal M Suspension",
    },
    {
      nom: "Xigduo XR 10mg/1000mg Tablet",
    },
    {
      nom: "Xtor-F Tablet",
    },
    {
      nom: "Xymoheal D Tablet",
    },
    {
      nom: "Xet CR 12.5 Tablet",
    },
    {
      nom: "Xpect-B Expectorant Mango Payari Black Currant",
    },
    {
      nom: "Xamic 500 Tablet",
    },
    {
      nom: "Xstan-H Tablet",
    },
    {
      nom: "Xone O 200mg/200mg Tablet",
    },
    {
      nom: "Xtor 40 Tablet",
    },
    {
      nom: "Xenadom 250 Tablet",
    },
    {
      nom: "XPect-PD Syrup Strawberry",
    },
    {
      nom: "Xpect-D Syrup",
    },
    {
      nom: "XTPara Proglet Tablet SR",
    },
    {
      nom: "Xpect-LS Expectorant",
    },
    {
      nom: "Xigduo XR 10mg/500mg Tablet",
    },
    {
      nom: "Xtor 20 Tablet",
    },
    {
      nom: "Xyzal 10mg Tablet",
    },
    {
      nom: "Xarelto 20mg Tablet",
    },
    {
      nom: "Xykaa MR 8 Tablet",
    },
    {
      nom: "Ximeceff 200 Tablet DT",
    },
    {
      nom: "Xoxe-CV Tablet",
    },
    {
      nom: "Xprab Vaccine",
    },
    {
      nom: "Xtane Tablet",
    },
    {
      nom: "XL Mont 5mg/10mg Tablet",
    },
    {
      nom: "Xigduo 5mg/1000mg Tablet IR",
    },
    {
      nom: "Xonift  100mg Tablet SR",
    },
    {
      nom: "Xoxe 500 Tablet",
    },
    {
      nom: "Xafinact 100 Tablet",
    },
    {
      nom: "Xalacom Eye Drop",
    },
    {
      nom: "Xultophy Injection",
    },
    {
      nom: "Xbaren 300 Tablet SR",
    },
    {
      nom: "Xstan-AMH Tablet",
    },
    {
      nom: "Xet CR 25 Tablet",
    },
    {
      nom: "Xamic MF Tablet",
    },
    {
      nom: "Xanilax SR 200 Tablet",
    },
    {
      nom: "Xymoheal Forte Tablet",
    },
    {
      nom: "Xoxe 250mg Tablet",
    },
    {
      nom: "Xinep Eye Drop",
    },
    {
      nom: "Xbaren 150 Tablet SR",
    },
    {
      nom: "Xmet-SR Tablet",
    },
    {
      nom: "Xet 10 Tablet",
    },
    {
      nom: "Xtor 5 Tablet",
    },
    {
      nom: "Xpect-B Expectorant Mixed Fruit Sugar Free",
    },
    {
      nom: "Xmet 500 Tablet",
    },
    {
      nom: "Xtin Plus Tablet",
    },
    {
      nom: "Xoclave 375 Tablet",
    },
    {
      nom: "Xet 20 Tablet",
    },
    {
      nom: "Xerofung 200 Capsule",
    },
    {
      nom: "Xilia-M 1 Tablet PR",
    },
    {
      nom: "Xilia-MP 2 Tablet",
    },
    {
      nom: "Xmet-Trio 500/0.2/1 Tablet ER",
    },
    {
      nom: "Xynova Gel",
    },
    {
      nom: "Xilia-M 2 Tablet PR",
    },
    {
      nom: "Xmet 250 Tablet",
    },
    {
      nom: "Xbaren 450 Tablet SR",
    },
    {
      nom: "Xstan 20mg Tablet",
    },
    {
      nom: "Xecute 200mg Tablet",
    },
    {
      nom: "Xicaine Injection",
    },
    {
      nom: "X-Mont LC Tablet",
    },
    {
      nom: "Xilia-Trio 2 Tablet SR",
    },
    {
      nom: "Xerofung 100 Capsule",
    },
    {
      nom: "Xirtam H Tablet",
    },
    {
      nom: "Xet CR 37.5 Tablet",
    },
    {
      nom: "Xmet-SR 1g Tablet",
    },
    {
      nom: "Xbaren 600mg Tablet",
    },
    {
      nom: "Xentas 0.5mg Tablet",
    },
    {
      nom: "Xevor 5mg Tablet",
    },
    {
      nom: "XREL Tablet",
    },
    {
      nom: "Xaldinac Tablet",
    },
    {
      nom: "Xtpara Tablet SR",
    },
    {
      nom: "Xylone Adult Nasal Spray",
    },
    {
      nom: "Xarelto 15mg Tablet",
    },
    {
      nom: "Xylovis Oral Topical Solution",
    },
    {
      nom: "Xarelto 20mg Tablet",
    },
    {
      nom: "Xilia-M1 Forte Tablet",
    },
    {
      nom: "Xirtam AM Tablet",
    },
    {
      nom: "Xcaber Lotion",
    },
    {
      nom: "Xrate Cough Expectorant Sugar Free",
    },
    {
      nom: "Xrate Cough Expectorant Sugar Free",
    },
    {
      nom: "Yasmin Tablet",
    },
    {
      nom: "Yamini Tablet",
    },
    {
      nom: "Yees-D Capsule SR",
    },
    {
      nom: "YAZ Tablet",
    },
    {
      nom: "Yuliprist Tablet",
    },
    {
      nom: "Yamini LS Kit",
    },
    {
      nom: "Yaw 2.5 Tablet",
    },
    {
      nom: "Ycyst M Tablet",
    },
    {
      nom: "Yaw 5 Tablet",
    },
    {
      nom: "Yogatel 40 Tablet",
    },
    {
      nom: "Yogamet-GM 2 Tablet PR",
    },
    {
      nom: "Zerodol-SP Tablet",
    },
    {
      nom: "Zerodol-P Tablet",
    },
    {
      nom: "Zifi 200 Tablet",
    },
    {
      nom: "Zerodol-MR Tablet",
    },
    {
      nom: "Zedex Cough Syrup",
    },
    {
      nom: "Zerodol TH 4 Tablet",
    },
    {
      nom: "Zerodol Tablet",
    },
    {
      nom: "Zenflox-OZ Tablet",
    },
    {
      nom: "Zonegran Tablet",
    },
    {
      nom: "Zyloric Tablet",
    },
    {
      nom: "Zytee RB Gel",
    },
    {
      nom: "Zifi CV 200 Tablet",
    },
    {
      nom: "Zocef 500 Tablet",
    },
    {
      nom: "Zenflox-UTI Tablet",
    },
    {
      nom: "Zerodol Spas Tablet",
    },
    {
      nom: "Zentel Oral Suspension",
    },
    {
      nom: "Zole-F Ointment",
    },
    {
      nom: "Zocef-CV 500 Tablet",
    },
    {
      nom: "Zostum 1.5gm Injection",
    },
    {
      nom: "Zentel Chewable Tablet",
    },
    {
      nom: "Zanocin 200 Tablet",
    },
    {
      nom: "Zifi 100 Dry Syrup",
    },
    {
      nom: "Zerodol -CR Tablet",
    },
    {
      nom: "Zenflox 200 Tablet",
    },
    {
      nom: "Zenflox Eye/Ear Drop",
    },
    {
      nom: "Zedott 100mg Capsule",
    },
    {
      nom: "Zady 500 Tablet",
    },
    {
      nom: "Zocon 150 Tablet",
    },
    {
      nom: "Zofer MD 4 Tablet",
    },
    {
      nom: "Zostum-O 200mg Tablet",
    },
    {
      nom: "Zoryl-M 1 Tablet PR",
    },
    {
      nom: "Zycolchin Tablet",
    },
    {
      nom: "Zedocef 200 Tablet",
    },
    {
      nom: "Zoxan Eye Ointment",
    },
    {
      nom: "Zanocin OZ Tablet",
    },
    {
      nom: "Zoderm E Cream",
    },
    {
      nom: "Zerodol TH 8 Tablet",
    },
    {
      nom: "Zofer 4mg Tablet",
    },
    {
      nom: "ZyrCold Syrup",
    },
    {
      nom: "Zocon AS Tablet",
    },
    {
      nom: "Zocon 200 Tablet",
    },
    {
      nom: "Zifi 100 DT Tablet",
    },
    {
      nom: "Zoryl-M 2 Tablet PR",
    },
    {
      nom: "Zifi 50 Dry Syrup",
    },
    {
      nom: "Zydip-C Lotion",
    },
    {
      nom: "Zocef 250 Tablet",
    },
    {
      nom: "Zeet Syrup",
    },
    {
      nom: "Zoster 800 Tablet",
    },
    {
      nom: "Zathrin 500 Tablet",
    },
    {
      nom: "Zydip Lotion",
    },
    {
      nom: "Zorbax 500mg Tablet",
    },
    {
      nom: "Zyloric 300 Tablet",
    },
    {
      nom: "Zimig 250mg Tablet",
    },
    {
      nom: "Zytanix 5 Tablet",
    },
    {
      nom: "Zosert 50 Tablet",
    },
    {
      nom: "Zyrtec Syrup",
    },
    {
      nom: "Zedocef CV 200 Tablet",
    },
    {
      nom: "Zipod 200mg Tablet",
    },
    {
      nom: "Zerograin 10 Tablet",
    },
    {
      nom: "Zovirax 400 Tablet",
    },
    {
      nom: "Zadonase Tablet",
    },
    {
      nom: "Zoxan Eye/Ear Drops",
    },
    {
      nom: "Zempred 8 Tablet",
    },
    {
      nom: "Zerodol-PG 200/75 Tablet SR",
    },
    {
      nom: "Zinase-D Tablet",
    },
    {
      nom: "Zavamet 500 Tablet",
    },
    {
      nom: "Zerotuss XP Syrup",
    },
    {
      nom: "Zerotuss Oral Suspension",
    },
    {
      nom: "Zeptol CR 200 Tablet",
    },
    {
      nom: "Zady 250 Tablet",
    },
    {
      nom: "Zenoxa 300 Tablet",
    },
    {
      nom: "Zita-Met Plus 20mg/500mg Tablet ER",
    },
    {
      nom: "Zocon 1% Dusting Powder",
    },
    {
      nom: "Zytanix 2.5 Tablet",
    },
    {
      nom: "Zylopred Opthalmic Suspension",
    },
    {
      nom: "Zaha Eye Ointment",
    },
    {
      nom: "ZyrCold Tablet",
    },
    {
      nom: "Zoxan Eye Ointment",
    },
    {
      nom: "Zevert MD 16 Tablet",
    },
    {
      nom: "Zedex Plus Cough Syrup Sugar Free",
    },
    {
      nom: "Zosert 25 Tablet",
    },
    {
      nom: "Zanocin 100 Liquid",
    },
    {
      nom: "Zoxan-D Eye/Ear Drops",
    },
    {
      nom: "Zocon 400 Tablet",
    },
    {
      nom: "Zoline-Plus Eye Drops",
    },
    {
      nom: "Zefu 500 Tablet",
    },
    {
      nom: "Zoster Cream",
    },
    {
      nom: "Zifi Lbx Neo Tablet",
    },
    {
      nom: "Zanocin OD 400mg Tablet ER",
    },
    {
      nom: "Zymoflam D Tablet",
    },
    {
      nom: "Zovirax Suspension",
    },
    {
      nom: "Zerodol-S Tablet",
    },
    {
      nom: "Zoxan 500 Tablet",
    },
    {
      nom: "Zocef-CV 250 Tablet",
    },
    {
      nom: "Zoryl M2 Forte Tablet PR",
    },
    {
      nom: "Zyrtec Tablet",
    },
    {
      nom: "Zoryl 1 Tablet",
    },
    {
      nom: "Zovirax 800 Tablet",
    },
    {
      nom: "Zayo 50 Tablet",
    },
    {
      nom: "Zerograin-Plus New Tablet",
    },
    {
      nom: "Zole Skin Ointment",
    },
    {
      nom: "Zincoderm-GM Neo Cream",
    },
    {
      nom: "Zedott Baby Sachet",
    },
    {
      nom: "Zedex-SF Dry Cough Syrup Sugar Free",
    },
    {
      nom: "Zix-MR Tablet",
    },
    {
      nom: "Zomelis 50mg Tablet",
    },
    {
      nom: "Zathrin 250 Tablet",
    },
    {
      nom: "Zocon 50 DT Tablet",
    },
    {
      nom: "Zempred 4 Tablet",
    },
    {
      nom: "Zocon-T Kit",
    },
    {
      nom: "Zifi Drop",
    },
    {
      nom: "Zucapride-M 500 Tablet SR",
    },
    {
      nom: "Zoldonat 4mg Injection",
    },
    {
      nom: "Zefu 250 Tablet",
    },
    {
      nom: "Zita Plus Tablet",
    },
    {
      nom: "Ziten-M 500mg/20mg Tablet ER",
    },
    {
      nom: "Zyncet Tablet",
    },
    {
      nom: "Zedex-P Syrup",
    },
    {
      nom: "Zyrtec Drops",
    },
    {
      nom: "Zempred 16 Tablet",
    },
    {
      nom: "Zeptol CR 300 Tablet",
    },
    {
      nom: "Zinepra 10 Tablet SR",
    },
    {
      nom: "Zeptol 200 Tablet",
    },
    {
      nom: "Zydip-C Cream",
    },
    {
      nom: "ZEN Retard 200 Tablet ER",
    },
    {
      nom: "Zocon Eye Drop",
    },
    {
      nom: "Zoryl M 1 Forte Tablet PR",
    },
    {
      nom: "Zocef Dry syrup",
    },
    {
      nom: "Zimigut 400 Tablet",
    },
    {
      nom: "Zincold Tablet",
    },
    {
      nom: "Zinase-DP Tablet",
    },
    {
      nom: "ZO Eye/Ear Drops",
    },
    {
      nom: "Zixflam Tablet",
    },
    {
      nom: "Zotide Injection",
    },
    {
      nom: "Ziten Tablet",
    },
    {
      nom: "ZY-Q 200 Tablet",
    },
    {
      nom: "Zymoflam Tablet",
    },
    {
      nom: "Zady Redimix 200mg Syrup",
    },
    {
      nom: "Zosert 100 Tablet",
    },
    {
      nom: "Zofer 2mg/ml Injection",
    },
    {
      nom: "Zomelis Met 50mg/500mg Tablet",
    },
    {
      nom: "Zipod CV 200mg/125mg Tablet",
    },
    {
      nom: "Zukanorm 50 Tablet",
    },
    {
      nom: "Ziprax 100mg Dry Syrup Strawberry",
    },
    {
      nom: "Zytee RB Gel",
    },
    {
      nom: "Zivifresh 0.5% Eye Drop",
    },
    {
      nom: "Zolmist Nasal Spray",
    },
    {
      nom: "Zenegra 100 Tablet",
    },
    {
      nom: "Zyrop 10000 Injection",
    },
    {
      nom: "Zymor-AP Tablet",
    },
    {
      nom: "Zocon L Cream",
    },
    {
      nom: "Zivast 10 Tablet",
    },
    {
      nom: "Zenoxa 150 Tablet",
    },
    {
      nom: "Zincoderm Cream",
    },
    {
      nom: "Zeldinac-SP Tablet",
    },
    {
      nom: "ZO 200 Tablet",
    },
    {
      nom: "Zole-F Lotion",
    },
    {
      nom: "Zifi CV 100 DT Tablet",
    },
    {
      nom: "Zevert 16 Tablet DT",
    },
    {
      nom: "Zoryl M 0.5 Tablet PR",
    },
    {
      nom: "Zeptol CR 400 Tablet",
    },
    {
      nom: "Zyclin Nano Gel",
    },
    {
      nom: "Zerotuss-D Syrup",
    },
    {
      nom: "Zenflox Suspension",
    },
    {
      nom: "Zeebee Tablet",
    },
    {
      nom: "Zaha Eye Drop",
    },
    {
      nom: "Zifi CV 100 Dry Syrup",
    },
    {
      nom: "ZyKT Soap",
    },
    {
      nom: "ZO-D Eye Drop",
    },
    {
      nom: "Zoryl 2 Tablet",
    },
    {
      nom: "Zithrox 200 Readyuse Suspension",
    },
    {
      nom: "Ziprax 200 DT Tablet",
    },
    {
      nom: "Zimig 1% Cream",
    },
    {
      nom: "Zostum O 100mg Dry Syrup",
    },
    {
      nom: "Zitblow 20mg Soft Gelatin Capsule",
    },
    {
      nom: "Zita-Met Plus 20mg/1000mg Tablet ER",
    },
    {
      nom: "Zithium 500 Tablet",
    },
    {
      nom: "Zimigut 550 Tablet",
    },
    {
      nom: "Zenoxa 450 Tablet",
    },
    {
      nom: "Zenflox 400 Tablet",
    },
    {
      nom: "Zefu-CV 250 Tablet",
    },
    {
      nom: "Zitran 200 Capsule",
    },
    {
      nom: "Zeet DX Syrup",
    },
    {
      nom: "Zix-R OD Capsule SR",
    },
    {
      nom: "Zipant 40 Tablet",
    },
    {
      nom: "ZEN 200 Tablet",
    },
    {
      nom: "Zisper LS Tablet",
    },
    {
      nom: "Zinepra 5 Tablet SR",
    },
    {
      nom: "Zoryl-MV 1 Tablet SR",
    },
    {
      nom: "Zincoderm-G Cream",
    },
    {
      nom: "Zofer 2mg Oral Solution",
    },
    {
      nom: "Zulu AT 4 Tablet",
    },
    {
      nom: "Zyrik 100 Tablet",
    },
    {
      nom: "Zithrox 250 Tablet",
    },
    {
      nom: "Zifi 50 DT Tablet",
    },
    {
      nom: "Zocon 1% Soap",
    },
    {
      nom: "Zorno Tablet",
    },
    {
      nom: "Zanocin 50 Liquid",
    },
    {
      nom: "Zeptol 100 Tablet",
    },
    {
      nom: "Zenflox-Plus 100 Tablet",
    },
    {
      nom: "Zisper Plus Tablet",
    },
    {
      nom: "Zotobac Gel",
    },
    {
      nom: "Zomelis Met 50mg/1000mg Tablet",
    },
    {
      nom: "Zolephos 5mg/100ml Infusion",
    },
    {
      nom: "Zeecool Plus Eye Drops",
    },
    {
      nom: "Zydip Lotion",
    },
    {
      nom: "Zimigut 200 Tablet",
    },
    {
      nom: "Zipcet Tablet",
    },
    {
      nom: "Zifi Turbo 600 Tablet",
    },
    {
      nom: "Zoryl MP 2 Tablet ER",
    },
    {
      nom: "Zitblow 10mg Soft Gelatin Capsule",
    },
    {
      nom: "ZEN Retard 300 Tablet ER",
    },
    {
      nom: "Zocon 100 DT Tablet",
    },
    {
      nom: "Zoryl M 3 Forte Tablet PR",
    },
    {
      nom: "Zitcare Foam Wash",
    },
    {
      nom: "Ziglim-M1 Tablet PR",
    },
    {
      nom: "Zyaqua Eye Drop",
    },
    {
      nom: "Zava Tablet",
    },
    {
      nom: "Zoryl MV 2/0.3 Tablet SR",
    },
    {
      nom: "Ziprax 50mg Dry Syrup",
    },
    {
      nom: "Zyrova 10 Tablet",
    },
    {
      nom: "Zipant-DSR Capsule",
    },
    {
      nom: "Zoster 400mg Tablet DT",
    },
    {
      nom: "Zerotuss XP Drop",
    },
    {
      nom: "Zaditen Eye Drop",
    },
    {
      nom: "Zedocef Dxl 200 Tablet ER",
    },
    {
      nom: "Zonisep 100 Capsule",
    },
    {
      nom: "Zoryl 0.5 Tablet",
    },
    {
      nom: "Zyven-OD 50 Tablet ER",
    },
    {
      nom: "Zucator 100 Tablet",
    },
    {
      nom: "Zimivir 1000 Tablet",
    },
    {
      nom: "Zefway 200 DT Tablet",
    },
    {
      nom: "Zevert MD 8 Tablet",
    },
    {
      nom: "Zocon -C Cream",
    },
    {
      nom: "Zenoxa 600 Tablet",
    },
    {
      nom: "Zenoxa OD 300 Tablet SR",
    },
    {
      nom: "ZEN Retard 400 Tablet ER",
    },
    {
      nom: "Ziglim Plus 2 Tablet SR",
    },
    {
      nom: "Zydol-P Syrup",
    },
    {
      nom: "Ziblok 50 Tablet",
    },
    {
      nom: "Zoryl-M 4 Forte Tablet PR",
    },
    {
      nom: "Zelgor 500mg Tablet",
    },
    {
      nom: "Zupion -SR Tablet",
    },
    {
      nom: "Zybend Tablet",
    },
    {
      nom: "Zilast 50 Tablet",
    },
    {
      nom: "Zerodol TH OD 200 mg/8 mg Capsule SR",
    },
    {
      nom: "Zavamet 1000 Tablet",
    },
    {
      nom: "Zyrik 300 Tablet",
    },
    {
      nom: "Zatura 500 Tablet",
    },
    {
      nom: "Ziten-M 1000mg/20mg Tablet ER",
    },
    {
      nom: "Zithrolect 500 Tablet",
    },
    {
      nom: "Zix-PG 200/75 Tablet SR",
    },
    {
      nom: "Zilarta 40 Tablet",
    },
    {
      nom: "Zovax CV 625 Tablet",
    },
    {
      nom: "Zukamin Cold Suspension",
    },
    {
      nom: "Zoclar 500mg Tablet",
    },
    {
      nom: "Zonasoft Eye Drop",
    },
    {
      nom: "Zovirax 200 Tablet",
    },
    {
      nom: "Zady Readymix Oral Suspension",
    },
    {
      nom: "Zix P 100mg/325mg Tablet",
    },
    {
      nom: "Zanocin F 200 mg/200 mg Tablet",
    },
    {
      nom: "Zilarbi 40 Tablet",
    },
    {
      nom: "Zofix 200 Tablet",
    },
    {
      nom: "Zulu-P Tablet",
    },
    {
      nom: "Zyvac Tcv-PFS Vaccine",
    },
    {
      nom: "Zilast 100 Tablet",
    },
    {
      nom: "Zydol-P Suspension",
    },
    {
      nom: "ZEEBEE 200 MG SUSPENSION",
    },
    {
      nom: "Zelgor 250mg Tablet",
    },
    {
      nom: "Zincoren Eye/Ear Drops",
    },
    {
      nom: "Zithrox XL 200mg/5ml Dry Syrup",
    },
    {
      nom: "Zosa-L Capsule PR",
    },
    {
      nom: "Zynesp 40 Injection",
    },
    {
      nom: "Zinase-XT Tablet",
    },
    {
      nom: "Zotral 50 Tablet",
    },
    {
      nom: "Zilos-AM Tablet",
    },
    {
      nom: "Zoxan OZ Tablet",
    },
    {
      nom: "Zott P Tablet",
    },
    {
      nom: "Zilsar 40 Tablet",
    },
    {
      nom: "Zisper Forte Tablet",
    },
    {
      nom: "Zivast 20 Tablet",
    },
    {
      nom: "Ziblok 25 Tablet",
    },
    {
      nom: "Zoryl 4 Tablet",
    },
    {
      nom: "Zathrin 100 Readymix Oral Suspension",
    },
    {
      nom: "ZY-Q 300 Tablet",
    },
    {
      nom: "Zobid D 50 Tablet DT",
    },
    {
      nom: "Zonisep 50 Capsule",
    },
    {
      nom: "Zoryl 3 Tablet",
    },
    {
      nom: "Zilos 50 Tablet",
    },
    {
      nom: "Zeethrom 500 Tablet",
    },
    {
      nom: "Zentob Eye Drop",
    },
    {
      nom: "Ziram 5 Tablet",
    },
    {
      nom: "ZyKT Cream",
    },
    {
      nom: "ZE Spas Tablet",
    },
    {
      nom: "Ziglim Plus 1 Tablet SR",
    },
    {
      nom: "Zydalis MD 10 Tablet",
    },
    {
      nom: "Zelgra 180 Tablet",
    },
    {
      nom: "Zivifresh Gel",
    },
    {
      nom: "Zenoxa OD 600 Tablet SR",
    },
    {
      nom: "Zofer 8mg Injection",
    },
    {
      nom: "Zucator M 500 Tablet",
    },
    {
      nom: "Zinase-Plus Tablet",
    },
    {
      nom: "Zocon L Cream",
    },
    {
      nom: "Zukamin Cold Oral Drops",
    },
    {
      nom: "Zonafresh Eye Drop",
    },
    {
      nom: "Zynoff Eye/Ear Drop",
    },
    {
      nom: "Zimivir 500 Tablet",
    },
    {
      nom: "Zydalis MD 20 Tablet",
    },
    {
      nom: "Zilos-H Tablet",
    },
    {
      nom: "Zoryl MP 1 Tablet ER",
    },
    {
      nom: "Zaporil 12.5mg Tablet",
    },
    {
      nom: "Zonisep 25 Capsule",
    },
    {
      nom: "Zurig 80 Tablet",
    },
    {
      nom: "Zifi 50 Readymix Suspension",
    },
    {
      nom: "ZEN 100 Tablet DT",
    },
    {
      nom: "Zenoxa OD 450 Tablet SR",
    },
    {
      nom: "Zanocin DS Tablet",
    },
    {
      nom: "Zanocin 100 Tablet",
    },
    {
      nom: "Zole-IT 100 Capsule",
    },
    {
      nom: "Zonimid 100 Capsule",
    },
    {
      nom: "Zyrova F 10 Tablet",
    },
    {
      nom: "Z-Ketocare Shampoo",
    },
    {
      nom: "Ziram 2.5 Tablet",
    },
    {
      nom: "Zayo 200 Tablet",
    },
    {
      nom: "Zipvert-B6 Tablet",
    },
    {
      nom: "Zipsydon 40 Capsule",
    },
    {
      nom: "Zit 10 Capsule",
    },
    {
      nom: "Zylo-P Ointment",
    },
    {
      nom: "Zendol 200mg Capsule",
    },
    {
      nom: "Zatura 250 Tablet",
    },
    {
      nom: "Zymurine Tablet",
    },
    {
      nom: "Zyceva 150mg Tablet",
    },
    {
      nom: "Zefretol 400 Tablet",
    },
    {
      nom: "Zyrova 20 Tablet",
    },
    {
      nom: "Zyrop 5000 Injection",
    },
    {
      nom: "Zienam 500mg/500mg Injection",
    },
    {
      nom: "Zenoxa OD 150 Tablet SR",
    },
    {
      nom: "Zincort GC Neo Cream",
    },
    {
      nom: "Zomet 500mg Tablet",
    },
    {
      nom: "Zyrova C 10 Capsule",
    },
    {
      nom: "Zincast Tablet",
    },
    {
      nom: "Zeptin 20mg Tablet",
    },
    {
      nom: "Zitelmi-H Tablet",
    },
    {
      nom: "Zipsydon 20 Capsule",
    },
    {
      nom: "Ziglim 1 Tablet",
    },
    {
      nom: "Zyven OD 100 Tablet ER",
    },
    {
      nom: "Zeroklot Injection",
    },
    {
      nom: "Zeformin XR 60 Tablet",
    },
    {
      nom: "ZyKT Cream",
    },
    {
      nom: "Zensartan H 40mg/12.5mg Tablet",
    },
    {
      nom: "Zoletar Lotion",
    },
    {
      nom: "Zilos 25 Tablet",
    },
    {
      nom: "Zuvirab Vaccine",
    },
    {
      nom: "Zithrocin 500mg Tablet",
    },
    {
      nom: "Zenoxa Oral Suspension Banana",
    },
    {
      nom: "ZY-Q 400 Tablet",
    },
    {
      nom: "Zomet SR Tablet",
    },
    {
      nom: "Zole-IT 100 Capsule",
    },
    {
      nom: "Zyrova 5 Tablet",
    },
    {
      nom: "Zoform-SR 500 Tablet",
    },
    {
      nom: "Zyle 100 Tablet",
    },
    {
      nom: "Zilsar 80 Tablet",
    },
    {
      nom: "Ziglim 2 Tablet",
    },
    {
      nom: "Zorem 5 Capsule",
    },
    {
      nom: "Zoryl-MF 2 Tablet PR",
    },
    {
      nom: "Zenoxa OD 900 Tablet SR",
    },
    {
      nom: "Zithrokem 250mg Tablet",
    },
    {
      nom: "Zincoderm-S Ointment",
    },
    {
      nom: "Zipac 20mg Soft Gelatin Capsule",
    },
    {
      nom: "Zincoderm M Cream",
    },
    {
      nom: "Zithrocin 200mg/5ml Syrup",
    },
    {
      nom: "Zedonac MR 250mg/50mg/500mg Tablet",
    },
    {
      nom: "Zyluli 1% Cream",
    },
    {
      nom: "Zeemont 5mg/10mg Tablet",
    },
    {
      nom: "Zolahart 40 Tablet",
    },
    {
      nom: "Zedep 20mg Capsule",
    },
    {
      nom: "Zotral 100 Tablet",
    },
    {
      nom: "Zymist Plus 1% Eye Drop",
    },
    {
      nom: "Zyonate 14mg Injection",
    },
    {
      nom: "Zaporil 25mg Tablet",
    },
    {
      nom: "Zyaqua Forte Eye Drop",
    },
    {
      nom: "Zilenta-M Tablet ER",
    },
    {
      nom: "Zovane 20 Tablet",
    },
    {
      nom: "Zavedos 5mg Injection",
    },
    {
      nom: "Zerostiff Sachet Orange Pineapple",
    },
    {
      nom: "Zolitas ODS 2.5 Strip",
    },
    {
      nom: "Zilarta 80 Tablet",
    },
    {
      nom: "Zincold PD Oral Drops",
    },
    {
      nom: "Zuemeth Tablet",
    },
    {
      nom: "Zefretol 800 Tablet",
    },
    {
      nom: "Zaporil 100mg Tablet",
    },
    {
      nom: "Zoreso-D Capsule PR",
    },
    {
      nom: "Zovorm 150mg Tablet",
    },
    {
      nom: "Zencast-SP Tablet",
    },
    {
      nom: "Zuvicella Vaccine",
    },
    {
      nom: "Zithrocin XL  Syrup",
    },
    {
      nom: "Zoreso Tablet",
    },
    {
      nom: "Zinase-MR Tablet",
    },
    {
      nom: "Zophar LS 2mg/2mg Tablet",
    },
    {
      nom: "Zytrav Eye Drop",
    },
    {
      nom: "Zilokem 40 Tablet",
    },
    {
      nom: "Zenegra Lido Spray",
    },
    {
      nom: "Zilarta-CT 40/6.25 Tablet",
    },
    {
      nom: "Zipcoz Tablet",
    },
    {
      nom: "Zestasil 100 Tablet",
    },
    {
      nom: "Zedruff Shampoo",
    },
    {
      nom: "Zedruff Shampoo",
    },
  ];

  const result = await prisma.medicament.createMany({
    data: meds,
    skipDuplicates: true,
  });

  console.log("✅ Inserted:", result);
}

main().catch((e) => console.error(e));
