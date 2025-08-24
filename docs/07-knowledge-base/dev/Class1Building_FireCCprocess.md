# Fire System (CC) Application for Class 1 Building

## Definitions

| Short |	Full name |
|-------|------------|
|FEB	|Fire Engineering Brief|
|PBDB	|Performance-Based Design Brief|
|FER	|Fire Engineering Report|
|			|Performance Solution Summary Table|
|IFSR	|Initial Fire Safety Report|
|FFSR	|Final Fire Safety Report|
|FRNSW |Fire & Rescue New South Wales|

## Sequence Diagram
<p style="text-align:right">Date: 15.08.2025 | Revision: 2025.07.b</p>

```mermaid
sequenceDiagram
	Developer->>PCA: Application for CC
	FireENG.->>PCA: FEB
  FireENG.->>FRNSW: FEB+PBDB Submission
  
  alt No Comments (10D)
  	FRNSW->>PCA: 
  else  Comments (10D+20D)
  	FRNSW->>FireENG.: Written Comments
    FireENG.->>FRNSW: Reply to Comments
    note left of FRNSW: Loop till No Further Comments, 20D each loop
    PCA-->FRNSW: PCA Satisfied
  end
  
  FireENG.->>PCA: FER
  PCA->>FRNSW: IFSR Application
  PCA->>FRNSW: Performance Solution Summary Table
  
  alt No IFSR (10D)
  	FRNSW->>PCA: 
  else  IFSR Requried (10D+25D)
  	FRNSW->>PCA: Provide IFSR
    note left of FRNSW: TBC, NEW procedure form Aug 2024
  end
	
  PCA->>Developer: CC Granted
  
  Developer->>PCA: Application for OC
  PCA->>FRNSW: FFSR Submission
  FRNSW-->Developer: Joint Site inspection
  FRNSW->>PCA: Fire Safety System Report
  Developer->>PCA: Comply or Comments
  
  alt PCA Satisfied
  	PCA->>Developer: Sign Off
  else PCA NOT Satisfied
  	PCA->>FRNSW: Require FRNSW to Review
    note left of FRNSW: Loop back to Site Inpsection 
  end
  
  PCA->>Developer: OC Granted
 

```