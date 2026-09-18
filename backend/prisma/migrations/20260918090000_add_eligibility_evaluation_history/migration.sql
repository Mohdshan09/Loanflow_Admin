-- CreateEnum
CREATE TYPE "EvaluationTrigger" AS ENUM (
    'USER_CREATED',
    'USER_UPDATED',
    'PRODUCT_CREATED',
    'PRODUCT_UPDATED',
    'PRODUCT_DELETED',
    'MANUAL_SIMULATION'
);

-- CreateTable
CREATE TABLE "EligibilityEvaluation" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "trigger" "EvaluationTrigger" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EligibilityEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityEvaluationResult" (
    "id" UUID NOT NULL,
    "evaluationId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "productName" TEXT NOT NULL,
    "eligible" BOOLEAN NOT NULL,
    "reasons" TEXT[] NOT NULL,
    "decisionNote" TEXT NOT NULL,

    CONSTRAINT "EligibilityEvaluationResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EligibilityEvaluation_userId_createdAt_idx"
ON "EligibilityEvaluation"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "EligibilityEvaluationResult_evaluationId_idx"
ON "EligibilityEvaluationResult"("evaluationId");

-- AddForeignKey
ALTER TABLE "EligibilityEvaluation"
ADD CONSTRAINT "EligibilityEvaluation_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityEvaluationResult"
ADD CONSTRAINT "EligibilityEvaluationResult_evaluationId_fkey"
FOREIGN KEY ("evaluationId") REFERENCES "EligibilityEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
