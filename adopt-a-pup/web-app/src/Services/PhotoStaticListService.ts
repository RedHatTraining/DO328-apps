import { PhotoService } from "./PhotoService";

export class PhotoStaticListService implements PhotoService {

    public async getAllUrls(): Promise<string[]> {
        /* eslint-disable max-len */
        return [
            "https://lh3.googleusercontent.com/_b01QvMCYwx224VylPr7iXTRz9aVRlXB84VYqYt-KqI3cIsHFNux6bZsC-JSBitwY0jeNRUZwW7r_3CiMZN7wLf5uu00NvTcAo2iFF9pYWPir5o0E7qBoQxNoWfrgJ3xlQfWJypq-g",
            "https://lh3.googleusercontent.com/CcRD6xV9xItZsN0v2qH0q53hOzIZCI4zx-Uq4MCRAmt9WKKlrxBlQx4VxvdU_yKrTIjVYXSDs5PnCnJQZ62pOhyLby_JTnfRXn0Dmb4zuOOK_ORkD-En69xRIDolD8gjzx5aRKu3qQ",
            "https://lh3.googleusercontent.com/YekWy49XpyEY8Z4Tohfb-SMoufPb4nyyUgSIJ3WGXj7V-o7iFWy7T3OHg6rFBmIMxePjZvIzpI-KgFllT6-6WtobCr0saZ-HRfxLI0msek0D7yHA7SxOYFW_RlWBA2LR-7yDNosCQw",
            "https://lh3.googleusercontent.com/uJv2qk-fDDC_2d6uyggx48nVzk8PJU_Ie_O0PdmkH2SQaKS7xqALA9NPgnSPAnA8LafjmW-6PfyTd_crNfcNJAAL91tpCiyvCVvflHRZFQUuWgZ51Bmah3CfMytguehF6DyNBl36Hg",
            "https://lh3.googleusercontent.com/wwSnLpy7J25_sGLzi95qSynhcMbA5XjG0ytCdul_IrfLxAIm2ILimmleBiObNkLnTLch_YauNRasRUaBpAgMZFXLDWhvMqF-Uq2gbx8K8EzJKEN0N18gxbRcykijgIyUEDf37SemRw",
            "https://lh3.googleusercontent.com/mQwdYTtwPmwk7ys861BTIQzd74UDB_h6dlPrhZbjy2dRucHRL7Av5yrBIdPgz6z4G0Gp6FP5_yuB1Tmn4KRiaLBRPkIEor8aj2v8R2yB7vbneoCXpNSazTJUZRCONr8zN5qcYdWbpg",
            "https://lh3.googleusercontent.com/PRo99gRtiZXYuE-tn7bqOejVVQ0kcxSffoA2CpQbLMX-UZBdzNfBAGAh1tSiGkgXOzCClPTIdEocLqoTWj-smtwsdhznYZ1wE3ZuYJdIVcIILBz0eNtRsE5FIQe95Pk05iZT7ud6ew",
            "https://lh3.googleusercontent.com/K26Wy4MhAtI-K2EBo6Blg7eEefbQlDMvgCp4ySBRXP88t_nD5kaZOUiMo_cQhaHrY5jSZX4gulH4550rebpvUAE79u-NKQUnsUktOpJwP73wGnZ8LFxTb_X1yGE6VW8dlFH2h4ynCA"
        ];
        /* eslint-enable max-len */
    }

}
