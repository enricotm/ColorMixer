function BestCombination() {
    function hexToRgb() {
        let colorsRGB = [];
        for (let i in colors) {
            const color = colors[i];
            colorsRGB.push([parseInt(color.slice(1,3), 16), parseInt(color.slice(3,5), 16), parseInt(color.slice(5), 16)]);
        }
        return colorsRGB;
    }
    const colorsRGB = hexToRgb();

    function rgbToHex(r, g, b) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
        return `#${r.length==1 ? "0"+r:r}${g.length==1 ? "0"+g:g}${b.length==1 ? "0"+b:b}`;
    }

    function calcBestDiff() {
        let bestDiff = [];
        let bestColor;
        let highestPercs = [[0,1],[0,1]];
        if (qtdColors == 2){
            for (let perc1=0; perc1<=100; perc1++) {
                const perc2 = 100-perc1;
                let diff = 0;
                for (let value=0; value<3; value++) {
                    diff += Math.abs(Math.round((colorsRGB[1][value]*perc1+colorsRGB[2][value]*perc2)/100)-colorsRGB[0][value]);
                }
                if (perc1 == 0 || diff < bestDiff[0]) {
                    bestDiff = [diff, perc1, perc2];
                }
            }
            const calcRgb = (perc1, value) => {
                const perc2 = 100-perc1;
                return Math.round((colorsRGB[1][value]*perc1+colorsRGB[2][value]*perc2)/100);
            }
            bestColor = rgbToHex(calcRgb(bestDiff[1], 0), calcRgb(bestDiff[1], 1), calcRgb(bestDiff[1], 2));
            for (let i=1; i<bestDiff.length; i++) {
                if (bestDiff[i] >= highestPercs[0][0]) {
                    highestPercs[1] = highestPercs[0];
                    highestPercs[0] = [bestDiff[i], i];
                } else if (bestDiff[i] >= highestPercs[1][0]) {
                    highestPercs[1] = [bestDiff[i], i];
                }
            }
            bestDiff = [`${bestDiff[1]} - ${bestDiff[2]}`, bestDiff[0]];
        } else if (qtdColors == 3) {
            for (let perc1=0; perc1<=100; perc1++) {
                for (let perc2=0; perc2<=100-perc1; perc2++) {
                    const perc3 = 100-perc1-perc2;
                    let diff = 0;
                    for (let value=0; value<3; value++) {
                        diff += Math.abs(Math.round((colorsRGB[1][value]*perc1+colorsRGB[2][value]*perc2+colorsRGB[3][value]*perc3)/100)-colorsRGB[0][value]);
                    }
                    if ((perc1 == 0 && perc2 == 0) || diff < bestDiff[0]) {
                        bestDiff = [diff, perc1, perc2, perc3];
                    }
                }
            }
            const calcRgb = (perc1, perc2, value) => {
                const perc3 = 100-perc1-perc2
                return Math.round((colorsRGB[1][value]*perc1+colorsRGB[2][value]*perc2+colorsRGB[3][value]*perc3)/100);
            }
            bestColor = rgbToHex(calcRgb(bestDiff[1], bestDiff[2], 0), calcRgb(bestDiff[1], bestDiff[2], 1), calcRgb(bestDiff[1], bestDiff[2], 2));
            for (let i=1; i<bestDiff.length; i++) {
                if (bestDiff[i] >= highestPercs[0][0]) {
                    highestPercs[1] = highestPercs[0];
                    highestPercs[0] = [bestDiff[i], i];
                } else if (bestDiff[i] >= highestPercs[1][0]) {
                    highestPercs[1] = [bestDiff[i], i];
                }
            }
            bestDiff = [`${bestDiff[1]} - ${bestDiff[2]} - ${100-bestDiff[1]-bestDiff[2]}`, bestDiff[0]];
        } else if (qtdColors == 4) {
            for (let perc1=0; perc1<=100; perc1++) {
                for (let perc2=0; perc2<=100-perc1; perc2++) {
                    for (let perc3=0; perc3<=100-perc1-perc2; perc3++) {
                        const perc4 = 100-perc1-perc2-perc3;
                        let diff = 0;
                        for (let value=0; value<3; value++) {
                            diff += Math.abs(Math.round((colorsRGB[1][value]*perc1+colorsRGB[2][value]*perc2+colorsRGB[3][value]*perc3+colorsRGB[4][value]*perc4)/100)-colorsRGB[0][value]);
                        }
                        if ((perc1 == 0 && perc2 == 0 && perc3 == 0) || diff < bestDiff[0]) {
                            bestDiff = [diff, perc1, perc2, perc3, perc4];
                        }
                    }
                }
            }
            const calcRgb = (perc1, perc2, perc3, value) => {
                const perc4 = 100-perc1-perc2-perc3;
                return Math.round((colorsRGB[1][value]*perc1+colorsRGB[2][value]*perc2+colorsRGB[3][value]*perc3+colorsRGB[4][value]*perc4)/100);
            }
            bestColor = rgbToHex(calcRgb(bestDiff[1], bestDiff[2], bestDiff[3], 0), calcRgb(bestDiff[1], bestDiff[2], bestDiff[3], 1), calcRgb(bestDiff[1], bestDiff[2], bestDiff[3], 2));
            for (let i=1; i<bestDiff.length; i++) {
                if (bestDiff[i] >= highestPercs[0][0]) {
                    highestPercs[1] = highestPercs[0];
                    highestPercs[0] = [bestDiff[i], i];
                } else if (bestDiff[i] >= highestPercs[1][0]) {
                    highestPercs[1] = [bestDiff[i], i];
                }
            }
            bestDiff = [`${bestDiff[1]} - ${bestDiff[2]} - ${bestDiff[3]} - ${100-bestDiff[1]-bestDiff[2]-bestDiff[3]}`, bestDiff[0]];
        }
        return [bestDiff, bestColor, highestPercs];
    }
    const bests = calcBestDiff();
    const bestDiff = bests[0];
    const bestColor = bests[1];
    const highestPercs = bests[2];

    function showBestDiff() {
        document.querySelector("#perc").textContent = bestDiff[0];
        document.querySelector("#error").textContent = bestDiff[1];
        document.querySelector("#hexBestColor").textContent = bestColor;
        document.querySelector("#hexBestColor").style.color = bestColor;
        document.querySelector("#bestColor").style.background = bestColor;
        if (document.querySelector("#corFinal").hidden) {
            document.querySelector("#gradient").style.background = `linear-gradient(90deg, ${colors[1]}, ${colors[2]})`;
        } else {
            document.querySelector("#gradient").style.background = `linear-gradient(90deg, ${colors[highestPercs[0][1]]}, ${colors[highestPercs[1][1]]})`;
        }
    }
    showBestDiff();
}
BestCombination();