from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional

app = FastAPI(
    title="TheInsuranceHub Backend API",
    description="Python API backend to calculate insurance rates and process user submissions under one roof.",
    version="1.0.0"
)

# Enable CORS for React frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class QuoteRequest(BaseModel):
    coverage_type: str  # life, health, mutual-funds
    age: int
    amount: float

class PartnerQuote(BaseModel):
    partner_name: str
    premium_monthly: float
    settlement_ratio: str
    features: List[str]

class ContactRequest(BaseModel):
    name: str
    email: str
    phone: str
    message: str

class SubscriptionRequest(BaseModel):
    email: str

# Endpoints
@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Welcome to TheInsuranceHub Python API backend service.",
        "version": "1.0.0"
    }

@app.post("/api/quote", response_model=List[PartnerQuote])
def calculate_quotes(request: QuoteRequest):
    coverage = request.coverage_type.lower()
    age = request.age
    amount = request.amount
    
    if age < 18 or age > 65:
        raise HTTPException(status_code=400, detail="Age must be between 18 and 65.")
        
    quotes = []
    
    # Calculate mock quotes from partners dynamically
    if coverage == "life":
        # Partner 1: LIC (Traditional, Trustworthy)
        lic_base = (amount * 0.00014) / 12
        lic_age_factor = (age - 18) * 12
        quotes.append(PartnerQuote(
            partner_name="Life Insurance Corporation (LIC)",
            premium_monthly=round(lic_base + lic_age_factor),
            settlement_ratio="99.4%",
            features=["Sovereign Guarantee", "Simple Claim Settlement", "Tax Benefits u/s 80C"]
        ))
        
        # Partner 2: ICICI Prudential
        icici_base = (amount * 0.00011) / 12
        icici_age_factor = (age - 18) * 9
        quotes.append(PartnerQuote(
            partner_name="ICICI Prudential Life",
            premium_monthly=round(icici_base + icici_age_factor),
            settlement_ratio="98.1%",
            features=["Critical Illness Rider Available", "Instant Online Issuance", "Accidental Death Benefit"]
        ))
        
        # Partner 3: HDFC Life
        hdfc_base = (amount * 0.00012) / 12
        hdfc_age_factor = (age - 18) * 10
        quotes.append(PartnerQuote(
            partner_name="HDFC Standard Life",
            premium_monthly=round(hdfc_base + hdfc_age_factor),
            settlement_ratio="98.6%",
            features=["Flexible Payouts", "No Medical Exam option", "Comprehensive COVID Cover"]
        ))
        
    elif coverage == "health":
        # Partner 1: Star Health
        star_base = 400 + (age - 18) * 25
        quotes.append(PartnerQuote(
            partner_name="Star Health Insurance",
            premium_monthly=round(star_base),
            settlement_ratio="99.0%",
            features=["Pre-existing cover in 2 yrs", "12,000+ Cashless Network", "No Room Rent Capping"]
        ))
        
        # Partner 2: HDFC Ergo
        ergo_base = 450 + (age - 18) * 28
        quotes.append(PartnerQuote(
            partner_name="HDFC ERGO Optima Secure",
            premium_monthly=round(ergo_base),
            settlement_ratio="98.9%",
            features=["Double Cover Benefit", "Unlimited Restoration of sum", "Zero copay for life"]
        ))
        
        # Partner 3: Care Health
        care_base = 380 + (age - 18) * 22
        quotes.append(PartnerQuote(
            partner_name="Care Health Insurance",
            premium_monthly=round(care_base),
            settlement_ratio="95.2%",
            features=["Annual health checkup included", "Maternity cover options", "NCB Super benefit"]
        ))
        
    elif coverage == "mutual-funds":
        # Expected monthly investment growth estimation (12% CAGR, 14% CAGR, 15% CAGR)
        quotes.append(PartnerQuote(
            partner_name="Nippon India Large Cap Fund",
            premium_monthly=round((amount * 0.12) / 12),
            settlement_ratio="14.2% Return (5yr)",
            features=["Stable Large Cap portfolio", "Moderate Risk profile", "Fund Size: ₹18,400 Cr"]
        ))
        quotes.append(PartnerQuote(
            partner_name="SBI Bluechip Equity Growth",
            premium_monthly=round((amount * 0.115) / 12),
            settlement_ratio="13.8% Return (5yr)",
            features=["Diversified bluechip holdings", "Low volatility", "Fund Size: ₹35,200 Cr"]
        ))
        quotes.append(PartnerQuote(
            partner_name="HDFC Mid-Cap Opportunities",
            premium_monthly=round((amount * 0.155) / 12),
            settlement_ratio="16.5% Return (5yr)",
            features=["High growth potential", "Aggressive strategy", "Fund Size: ₹28,900 Cr"]
        ))
    else:
        raise HTTPException(status_code=400, detail="Invalid coverage type specified.")
        
    return quotes

@app.post("/api/contact")
def process_contact(request: ContactRequest):
    # Log / Mock save to database
    print(f"Received contact request from {request.name} ({request.email})")
    return {
        "status": "success",
        "message": f"Thank you {request.name}! Our claims desk/consultant will call you within 15 minutes."
    }

@app.post("/api/subscribe")
def process_subscription(request: SubscriptionRequest):
    # Log / Mock save to database
    print(f"Subscribed user: {request.email}")
    return {
        "status": "success",
        "message": "Subscription active! You will now receive exclusive tax-saving quote updates."
    }
