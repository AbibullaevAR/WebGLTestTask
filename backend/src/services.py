import math

def calcPiPos(R, N, i):
    return [R * math.cos(2 * math.pi * i / N), R * math.sin(2 * math.pi * i / N), 0]

def calcPiNormal(B, Pi):
  NiMag = math.sqrt(
    (Pi[0] - B[0]) ** 2 + (Pi[1] - B[1]) ** 2 + (Pi[2] - B[2]) ** 2
  )
  Ni = [Pi[0] - B[0], Pi[1] - B[1], Pi[2] - B[2]]
  return [Ni[0] / NiMag, Ni[1] / NiMag, Ni[2] / NiMag]

def getConeData(height, radius, segments):
    coneUpPos = [0,0,height]
    centrCone = [0,0,0]
    conePositions = []
    coneNormals = []
    B = [0, 0, -(radius ** 2) / height]
    
    for i in range(0, segments):
        piPos = calcPiPos(radius, segments, i)
        pnextPos = calcPiPos(radius, segments, i+1)

        conePositions.extend(coneUpPos)
        conePositions.extend(piPos)
        conePositions.extend(pnextPos)
        
        conePositions.extend(centrCone)
        conePositions.extend(piPos)
        conePositions.extend(pnextPos)

        coneNormals.extend(calcPiNormal(B, coneUpPos))
        coneNormals.extend(calcPiNormal(B, piPos))
        coneNormals.extend(calcPiNormal(B, pnextPos))

    return conePositions, coneNormals
