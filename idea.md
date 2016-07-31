#zipcode to barcode
1. checkZipcode 估计：20mins，实际：30mins
原因：需要检查的情况很多，高估了自己的分析能力
2. getSplittedZipcode 估计：8mins，实际：6mins41s
原因：lodash库里的一些简单方法自己已经运用熟练了，所以在实际敲代码时速度进步
3. getCheckDigit 估计：8mins 实际：3mins47s
原因：于上面一样
4. getBarcode 估计：8mins 实际：17mins
原因：对于_.map的掌握并没有十分熟练