# Developement Flowchat
<p style="text-align:right">Date: 14.02.2025 | Revision: 2025.02.a</p>

```mermaid
flowchart TB
 
	subgraph Definition
    A --'NEXT STEP'--> B
    B -.'REGULATES'.-> C
    X o--'RELATED'--o Y
    Y x--'RELATED'--x Z
       
end

```

!> Note: This diagram is a simplified overview. Real-world processes are more complex—use this chart as a general guideline and verify against project-specific requirements.

[Download Link](docs/11-assets/images/DevFlowchat.png ':ignore')

```mermaid

flowchart TB

DA["Development Application (DA)"]
CC["Construction Certificate (CC)"]
OC["Occupation Certificate (OC)"]
CDC["Complying Development Certificate (CDC)"]
SC["Subdivision Certificate (SC)"]

PCA["Principal Certifying Authority (PCA)"]
Co[Local Council]
SW[Sydney Water]
NBN[Telstra/NBN co]
Pw[Power, Ausgrid/ Endeavour Energy]
GAS["Jemena (Gas) <Private>"]

De[Developer]
Con[Consultants]

DCP["Development Control Plan (DCP)"]
LEP["Local Environmental Plan (LEP)"]
SEPPs["State Environmental Planning Policies (SEPPs)"]
AS["Australian Standards (AS)"]
NCC["Building Code of Australia (NCC)"]
ADG["Apartment Design Guide (ADG by NSW State)"]

State[NSW State Gov.]
Federal[Federal Gov.]


	subgraph Au[Authority]
    Co
    PCA
      end
  
  subgraph Auo[Authority-Services]
    Pw
    SW
    NBN
    GAS
  end
  
	subgraph SG[Standards/Guide Line]
    ADG
    DCP
    NCC
  end

	subgraph DP[Development Process]
    DA
    CC
    OC
    CDC
    SC
  end

	subgraph App[Applicant]
    De
    Con
  end
  
  subgraph LF[Legal Frameworks]
  direction TB
    SEPPs -.->  LEP
  end
  
  subgraph GOV[Government]
    State
    Federal
  end 
  
  
DA-->CC-->OC-->SC
CDC--->OC

De-..->Con
DP o--o App
LF -........-> DP
Auo -..-> DP

SG -...-> DP
Au -.'SUPERVISE & APPROVE'..-> DP

DCP o----o Co

State o--o LF
State o---o Pw
State o---o SW


Federal x------x NBN
Federal x----x NCC
Federal x----x AS


AS --COMPLEMENTARY & REFERENCED----> NCC
```
