import React from "react";
import { jsPDF } from "jspdf";

import useWindowWidth from "../../hooks/useWindowWidth";

import Input from "../Input";
import Button from "../Button";
import Icon from "../Icon";

import InvoiceItems from "./InvoiceItems";

import { InvoiceItemInterface } from "./InvoiceItemInterface";

export default function InvoiceGenerator(): JSX.Element {
  const { width } = useWindowWidth();

  const [invoiceName, setInvoiceName] = React.useState("");
  const [invoiceDate, setInvoiceDate] = React.useState("");
  const [customerFirstName, setCustomerFirstName] = React.useState("");
  const [customerLastName, setCustomerLastName] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");

  const [invoiceItemsList, setInvoiceItemsList] = React.useState<
    InvoiceItemInterface[]
  >([
    {
      description: "",
      unit: "item",
      quantity: 1,
      rate: "",
      isConfirmed: false,
      confirmedRate: 0,
      confirmedQuantity: 1,
    },
  ]);

  const [sum, setSum] = React.useState(0);

  const onNewBtnClick = () => {
    if (
      parseFloat(invoiceItemsList[invoiceItemsList.length - 1].rate) > 0 &&
      invoiceItemsList[invoiceItemsList.length - 1].isConfirmed === true
    ) {
      setInvoiceItemsList([
        ...invoiceItemsList,
        {
          description: "",
          unit: "item",
          quantity: 1,
          rate: "",
          isConfirmed: false,
          confirmedRate: 0,
          confirmedQuantity: 1,
        },
      ]);
    }
    return sum;
  };

  const reset = () => {
    setInvoiceItemsList([
      {
        description: "",
        unit: "item",
        quantity: 1,
        rate: "",
        isConfirmed: false,
        confirmedRate: 0,
        confirmedQuantity: 1,
      },
    ]);

    setSum(0);
    setInvoiceName("");
    setInvoiceDate("");
    setCustomerFirstName("");
    setCustomerLastName("");
    setCustomerPhone("");
    setCustomerEmail("");
  };

  const subTotal = sum;
  const vat = subTotal * 0.2;
  const total = sum + vat;

  // eslint-disable-next-line new-cap
  const doc = new jsPDF();
  doc.setFontSize(12);

  // logo
  doc.addImage(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAFICAYAAADAnk9nAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAEDnSURBVHgB7d1vaGbneefxW3/8p5CMA+0WOyh0XtQ1mZgYJ3YjB4MJOOMS3BZs0TqzSxdPbM3uC3sGpC5sYYSqYSlLpEW2u2ytSeSlbCdT0Aw4zAZbMbgBE8tOanBaT0jihTEW8Yt9E08WEo/1Z8/vSCfWaJ5znvOcc5/7zznfDwgnnrH06DnnOec6131d1z00evOd2wYAAACdMWwAAADQKQSAAAAAHUMACAAA0DEEgAAAAB1DAAgAANAxBIAAAAAdQwAIAADQMQSAAAAAHUMACAAA0DEEgAAAAB1DAAgAANAxBIAAAAAdQwAIAADQMQSAAAAAHUMACAAA0DEEgAAAAB1DAAgAANAxBIAAAAAdQwAIAADQMQSAAIBg/ekffcm8/foF883FWQPAnpHhj90yawAACMgdn7nN/MPf/Y35T088aj5x08fNHbffZt6//Evz2hv/YgDUNzR6853bBgCAAPzepz5pZqYmzV/8+Z/0/POJR6fM8y+8bADUQwAIAPDuEwc+bp6cPGKeePxI+r/z/CLJAt7/0KR5862fGADVEQACALxStk9ZP2X/ylAQeOvdD6b/BFANTSAAAC/u++Jd5qVzS2mDR9ngT5QhfOn8UmGmEEAxAkAAgFMK9hT0KfhTEFiFmkQW5qYMgGroAgYAOKGMnbp6v/nUX5svfP6zpi51Bg8NGfO97/+zATAYAkAAQONU53fhW39rHvjSF82NN9xgbFEG8Z3192gKAQZEEwgAoDEK0LRUqyXbJt11/1cJAoEBEAACAKxTnZ8CP+3k4YI6ghUEvvPuzw2A/mgCAQBYozq/melj6fZtroK/7Oeee26BzmCgJAJAAIAVqvP72Q8umJNTx4wPWmb+xlOzBkB/LAEDAGpRnd+gs/ya9Pf/+G3ztROzBkA+MoAAgEoU8GmWn75CCf5Emci8vYQB7CADCAAYiOrsTk4fM08+fsSE7P6HJ833vv9DA+BaBIAAgNIU9Cn4i6HZQp3B9z80yXgYoAcCQABAX+ro1ViXkJZ6y9BYGI2HUTAI4CMEgACAXNmeu1X37A2BMoAKAgF8hCYQAMA1tMSrzt4fvvStqIM/URCr3wXAR9gLGABwFQ1y/l9/9zfmC5//rGmLO26/zbyfLAO/9sa/GAAEgACAXarz+99n/tb8SfLPG2+4wbTNA1/6onln/T2aQgBDDSAAdJ6WeE9OTUa/1FsGncHADgJAAOgodfTOJIFf14YmKwi89e4H6QxGpxEAAkDHqMHjyckj5onHj0Qxz68JygAqE0gQiK6iBhAAOkTZvn/4u79pbZ1fWTf/7u8kX79tvv3CPxmgi0YNAKD1ulTnV5aC4V9c/n9mambeAF3DEjAAtFhX6/wG8bUTs+bv//HbBugSAkAAaKGszu/k1DETi6wez0ddonYKoTMYXcJOIADQMsr2/ewHF6IK/k4tPJt25k48OmV8eOn8UnT7HAN1kAEEgJZQfZ/27dXWZ7HQ0uvcwpJ5592f/+bfKYD1sXUbncHoEgJAAIicMlcK/LSTRyy+9/0fJlm/pfSfvSgA9FG3qNdz/8OTJlQK8u/74udNV8zNP2vQDAJAAIhUjHV+yvRNzSyY5194ue/fXXluwUtQq6ykGkNCpH2aYzredV13y+cMmkENIABE6MnHj0RV56dlVY1b+f0/fLBU8CePHZ/10pihzCNd02g7AkAAiIiWAN9+/UKy5DsdzS4eT58+kzZ46J+DUND48KNTXmrytAQd05I6MCgCQACIgOr8Xjq3lH7F0q2qTJ8yfsr8VQ3itGTsqzHjG0/NRtVQAwyCABAAAqYsn7J9yvrFsotH1kihkS57u3ur0jKw6gZd03t/7rmFzu6XjHYjAASAQKngX3V+qveLgYI9NU8o+Mvr7q1KjRmaFehamnk9v2SAtiEABIDAqPZMGT81eMSQfdLyrIIzLfc2uaWaRoL42LJNy8A+5hICTRo1AIAgKNDQPL9YlnpFjR2nksDMVY2eMox33H6b89o8dQW/s/4ec+nQGmQAAcAzZfmUYfrhS9+Kqs6vboNHVWoKsVFbOChlZBkPg7YgAAQAj7I6v1gCi3S7tIcn0y8fQZj4HA8T21Z7QB4CQADwQAFfTHV+WYPHXfd/1XqDRxUKRNVl7JqOlZpC6AxG7KgBBACHtMR7cmoymqVeZdmeOX3GPL10xkvGrYgCUQWlrhs0siDQ13zCOrRk/+ZbPzUu3PGZP0hHGCFMBIAA4IDGicwkgV9MNWTquNX8vZCDHL3G++75nPP3VcvAGhTtIwtZh4K/EDK48I8lYABokLJFqvNTg0cswZ8CBC31KrsWQ4ZLr7Ps/sI2aVwPGS7EigwgADREAZ+yfrFs3ZbV+cWYIXrs+Kw5eP6Tzhs0NKRbWTUf8wmBOsgAAoBlqu/Tnr2qTYsh+FOWT4GfxrrEujzoszNYx5nOYMSGABAALFGwt/LcQhr8xdDkke3gcevdD7Yig6UMpq/GDDWFEAQiJgSAAFBTVuensS6qC4uBAj7V+c053MXDBY2HUeOKa+kw76dmGQ+DaBAAAkANqvPTIGfN84vB3gYPX4Ocm6bgVplN15QBVAYYiAEBIABUoCVedfaq/iuWQc4aWaIdPJQlaztlNn0sa+u8cD2XEKiCABAABrC3zi+Gmi8t72r4rxo8fIxK8UlZTh/BrrLC6g4GQsYYGAAoQVm+k9PHorqxaxk0xB08XFJTiDK1rruxNR/wnXffa23QrSD3L/7swcK/84mbqIcMGQEgAPShoE/BXywF/lr6nFtYam2N3yCy8TA+9u/VTiGXHvp5UEvuylyXdd0tn8v9s4OfuiWa7QzRG0vAAJBDNzh19iqbE0PwpwYP1fi1ucGjCgVgPrZs0zlz7rkFOoMRJAJAANhHy4XKlOgrhkHO2Q4eCv7Y57U3vS96j1xLzyUP2UegHwJAANilm7Syfcr6xTTIWQ0ebEXWn94jH++TmoUW5txnIIEi1AACQEKDnJ94/Eg0mZqnT58xp1o2xNkFZQFvuunjzgd2q2ninfX30vE0QAgIAAF0mgIBZWdiWOoVdZVqpwtq/Kp77PisOXj+k87H+GhY+KV33yNbiyCwBAygk3TzV42fZvrFEPxlDR5qZiD4qyfrDPaRPdXDBnsGIwQEgAA6Jd2zdXE2nQ0XQ50fDR7N0PuqGYGug0Cdf2oKiSXjjPYiAATQCbrxqs5P+/aqHit0WYOH9u1lybAZGg+j5XTXGA+DEBAAAmg9BXzK+KkGK4abrgK+W+9+MG0YoMmjWXqvFWi7pmVgDYoGfCEABNBaWuJVnZ+WfGOp89NIFy35Evi5o0DbR5ZVDUg6NwEf6AIG0DoK9mamJqNY6pVsKZIaP38UdN9x+23OGzR0jn7v1Tc6u8yvc/8X7/Ow48PQ6M13bhsAaAEt7z45eSSaeX7K8inwq3LzV5D77//8jw3KKTN+ReeMSgV8ZIttN/l8+N4bpq6ivYBVT6uSirpobvKHDCCAVlAmRVm/GJZ6Ffg9c/qMeXrpTOWl3oPJ72njBtwVCjL6BYDZeBgfW7dpHJG6kpURA1ygBhBA1FTnp6xNLHV+CkLU2UuDR5gUgGnWomvpeKKnZukMhjMEgACipGBPWRM1ecQwWFcZKAV+qjVjkHPYdKx0nFxLh5Mn2UfABQJAAFHJ5vm9/foF5/u5VpEOHH54Mv1ieS8eytT6aMxQEEhnMFwgAAQQDdX5aZBzDLVvWt5VFkljXShyj5OOn49jp/P8ycePGKBJNIEACJ7q/GLaQ1WDhes0eNTlOmhRQ0qv+kv9/m/+q9usZ95rqWpitynE9bm3MDedZI/fM8+/8LIBmkAACCBYupFrOSyGPXtFS4ZzC0vea/y03OxS3kgQBX+hvJaqss5gNRq5btDQTiGXHvo5pQNoBEvAAIKjG60yIKrziyH4U8ZNgQ4NHu2U1nE+5DaQFX0OfIykQTcQAAIIimqfVOcXQw2UAgMtETLMtv2UhfPRGUwQiKYQAAIIgjJ9yvgp8xf6zW5nB4/5tMGDGq3u0BK/6jtdU/2hamABmwgAAXilOj/N8tNXDIOcnz59xtx694PpP9E9GuDtYzxMutPNNDu/wB4CQABepDsfLM5GU+enTJ8yfsr8sYNHt2n/Zh+NGWpuUSAI2EAACMA5ZTJU5xfDzSxr8FCtHw0eED0AqCnEx/mgh6ZYxiEhbASAAJzRzh3K+CmTEXqdn27uKvqnwQO9ZONhfGSD1RQSQ7kEwkYACKBx6R6n55bSvXtDv3Hphq5Cfy33+qj1Qjy0DPzY8Vnjmh6eziWfJTqDUQcBIIDGZHV+GqIbQ51f1uChQn+gDNWG+hgPo4cqPVABVREAArBOgV9sdX40eKAqZYp9ZIv1UKUHLKAKAkAAVingU8Yvhjo/LeGpxk9fNHigDmUBfdSK6vNGZzCqIAAEYIWyEarzU0Yi9Dq/rMHjrvu/SoMHrFGnuI/xMDHtl73fJR68vCEABFCLgj3dgBT8hX4Tyho8FPjR4AHbfHYGqx4wxvEwZN79IQAEUElW56fl3hiWoBTwZQ0e1PmhKQpoNCPQNTqDMSgCQAADU8CnBo8Y6vy0xKuMn5Z8CfzggpaBfXQGp9sqnl8yQBmjBgBK0hKvNqWPYakpq/Ojxg8+KON88FO3pA9JLumzSWcwyiAABNCXMgsK/LSTR+iU5dNerdT4wTeVG/ze2C3OSyToCkYZBIAAcml598nJI86zGFUo8Hvm9Bnz9NIZlnoRDD2M3HH7bezfi+AQAALoSVkEZf1iKCpXtm9uYYmOQgRHDyNqClGzFPv3IiQEgACuku0uEMPNSvV9yrD4mL0GlJWNh1GDBl26CAVdwABSaQfhuaX0K4ZBzhq6qx08CP4QA52njx2fNUAoCACBjlNGYmFu2rz9+oUoBjlrv17t2/v8Cy8bICY6Z32MhwF6YQkY6LAnHz9iTk6HP8tPtIMHDR6InepV77vnc3TqwjsCQKCDYqrzo8EDbaMsoD57se7fi3ZgCRjoEI2iiKXOTw0eqvHTzZLgD22jGlbqV+ETGUCgA3bq/KaiWHZSsKeMH4Oc0WZZZ7DGw9AZDB/IAAItNzN9LN23N/TgTzdE1fmpwYPgD12ghx3NCAR8IAMItJS2bVPWL4Y6v6dPnzGn5p+lwcOSD997w4RANW6hvJZQaRlYZQ7s3wvXCACBllGdnwK/GArMNRZDg5yp8UOXKeN98FO3RLHlItqDABBoCWX6ZqYmo6jzU4PHqYWl9J8AjJlLMuC/N3YL42HgDAEgEDkVkD85ecQ88fiR4IvJafAA8ikbfsftt6VZfKBpBIBAxJQtUNYv9Do/1fY9c/oMg5yBAvpsqClEncEx1O4ibgSAQIRU33cyCfxiqPNTtk+ZDQI/oL9sPMxL55cYD4NGEQACEYmtzo8hzn5ogLZLf/FnD/Y8J9XhquA/hNcSE71vjx2fNSvPuX3v0C0EgEAEYqrzy276NHj44/q9v++Ln+/573/x/i+DeS2xUYc842HQJAJAIHDKZmisS+iBn5auFPjR4AHYoc/Sffd8js5gNIIAEAiU6vsU+IXeEUiDB9AcZQFV+hFDvS/iQgAIBEYXewV+2skjdMpQaKwLdX5AcyZ2m0IYDwOb2AsYCISWeLVv79uvXwg++FNd1133f5UmD8ABZda/dny2dRl2rh1+kQEEAvDk40fMyST4i2GQs4I+GjwAt9Rclc0IbItLBIBekQEEPFJdjzJ+C3PTQQd/aQYiCfx+/w8fJPgDPFEQqM8hYAMZQMAD1flpvEMMhd2nFp6lwQMIhOpu7/jMH6SrBkAdBICAQ8ryaak3hos3DR5AmKZm5pNryccYD4NaCAABR2Kp89MS76kk8GOpFwiXZm7ecfttdAajMgJAoGHq6NVYl9A3d1emTzcV7UAAIGwqyVBTyM9+cIE9g1EJTSBAQ/Rk/tK5pXQ/z5CDv50dPObTBg+CPyAeWRBIfS6qIAAELNPTuBo8NK4h9CaPp0+fMbfe/WD6TwDxUWfwY8dnDTAoAkDAIg1y1pJM6MXZyvQp46fMH9kDIG76POuzDAyCGkDAgljq/GjwANpJWXyNh6EzGGURAAI1aIn35NRk8Eu9avDQSBeNdgHQThoSrYfQGOaLwj8CQKACXWRnksAv9KdtLe8+k2QG5uafNQDab+LRKfPS+SXGw6AvAkBgAGrweHLyiHni8SPBj17QktCpJPCjxg/ojnTbxuOzaRDIeBgUIQAESlK2T1m/GOr8tBTEDh5AN6kzWONhNIkAyEMXMNCH6mk0z0+jXUIO/tKL/sOT6RfBH9Btuh7oQRDIQwYQyBFLnR8NHgB60TVBncEx7D0O9wgAgX2yOr+TU8dMyLIGj6eXzlDnB6AnzQf8xIGPMR4G1yAABPbQRVLz/EIvntaTvfbtJfAD0I+uFXfcfhudwbgKASBgdur8FPiFfoFUg4cu5qrvAYAysj2DtUsRncHI0ASCTlOd38pzC2mTR8jBn+r8sgYPgj8Ag8qCQFYNkCEARCfpKXhhbtq8/fqFdBu3UKUzvU7Mpvv2sn0bgDr08PjY8VkDCAEgOkcdcVoKCbkzToHfqYVnza13P0h3LwBrnn/h5bQxBKAGEJ2hOr/QZ/mJAj6NdWGWH6pSSYNLB3M+U2o8COW14CPaJUjjYegM7jYCQLSeAj4FfqFvkE6DB2wJ5VxXqUXon7uuUmmJro0cn+5iCRittbfOL+SLnDJ92sCdBg8ALum6wzWnuwgA0Uoz08eiqPNTLY4aPFSXAwAupU1mx2fpDO4oloDRKuro1Ty/0Ov81ODBDh4AfEv3EH9o0vzwpW8Z17j++UUGEK2gGX4qNtdMv5CDPzV4KOM3N/8sFz8AQVAQqJpA19559z0Df8gAImo7dX5TwXezqcHj1MISs/xgzaV3f55mklHOJYKNQno4VWewy7IZ/aw33/opo648IQBEtFTn90RyAQl5ayM1eGikCxc42JaeW/MEgLBHNcmfOPAxpw/UeoB/819/QjOKBywBIzq6OKmz9+TUsWCDv2yQs5Z7Cf4AxML1KCpdw186vxR83XYbEQAiGhrlojq/0Ic5a8iqdvAgOwMgNj72DFYQeO65haBXc9qIABDBywY5K/gLeZ6fRrko46dlFBo8AMQqCwJdUiPfN56aNXCHABDB0tOg6vw0niDkJg81dmiIs4aqsn0bgDbwUZO3M8Zr2sANmkAQJAV8M1OTQS/10uABAHbRGewOASCCoiXek0ngF/JSr5ZHnjl9hkHOANAAlfzoAZuxWc0iAEQQlOnTOAAtAYRMT6XqkiPwA4DmaKi/6hAZD9McagDhVVbnp7EuIQd/ehJVg4em5RP8AUCzdG/45lOzdAY3iAAQ3qjO72c/2JnnF6p0n8yHJ9MvGjwAwB11BisTiGYQAMI51feps1d1HiEPcla27677v0odCgB4ovuF7hWwjxpAOBNDnR8NHgAQFq0WqTNYQ/ZhDwEgGqcs38npY043Ga9CDR4a68JSLwCERfMB33n3vXTgPuwgAESjFPQp+Au5kFdLvK73vwQADEY7hVx66Odcqy0hAEQjsrqN0Ac5q86PGj8ACF+2Z7BqsynRqY8mEFilgE979uor1OAva/DQWBeCPwAY3Jv/+lPjQ3qPOb/EeBgLRoY/dsusAWrSh/G//9e/Mt986q/NwYCzfqcWnjX/7j/8Z/PaG/9iAADV/OTtS+b95GH6gS990bh28+/+TvL12+bbL/yTQXVDozffuW2AGjTI+YnHjwT9RFa3weOAGTKHhuwlzC9ub5nLho+ea0XHcT05JusckyiND42Yuta2Nw0Gp1Ifden6oAf6uflnDaohAERlGueisS4h1/lpifdUEvjVXeqdGB4188PXGVumtz40K1sbBs06nAQG48PD5lAS+JUNEi6arSQYSL62tswqQUEULo3+lqnr4MavDKrRsGZf471UzqMHfAyOABAD03R2BX5q9AiVMn3q7LU1MuDZkevNAxayDJkXk8Di2OYVA/vGkmDvRBKwHx4eSTN+daxvb5uV7Q2zvLVJxjZgBIB+afVHdXm6N7immm72DK6GABCl6UOuwM9Xur8MXQxOJUsCNgeGKoj40eiNxrbPbvyaoMKiLPBTttY2HafFzQ/NMhnBIBEA+qf7g7b29FEKpOu+OoOZ4ToYuoDRlz7QqvPThzvk4E9B3613P2h9WrwySU1o6vt20dEkO/ud0RsaCf5EDwEzSRb4bPJVN6sItFGWifMxniUbD0Nn8GAIAFFIAZ/27T05Fe4wZy3zaqTL1Mx8IxefLw818zFp6vt2iYIx1WbOOArMVEf4ShJoHuLSCVxDy7ATj04ZH7T8rEHRKI8lYPSk+r6TU5NB1/nZavAo0tTyb4Zl4Op0bM6OXu8lGNMxe2TjStowAv9YAg6LEgfqDvZBK0BKBqA/HmNxFXX06oOrQc6hBn/ZDh73PzzZ+CDnppdpWQauzlfwJz6DTyB06sq1XYpTlrYfDblUKSRcvZDK6vy03Bvqhydt8Fh4Nl3uddX23/QyLcvA1WjZ13fwlS4/j15HTSDQg7JwvsazKIkR8upVKFgCRhrwzSTLvSHP89PTpLp7XRYYN738m2EZeDCa7bc0cr0JxfL2hpnb/NDAH5aAw6WkAuNhwkT6ocP0hKQPp56WQg3+tMTbZINHEVfLsywDD2bG4kBuG44OjaYjaABcy1cQplWtbz41S2dwAQLADlKwp8ntqvPz8WRWhi4YqvHTl6/ZTq6WZ1kGLk9jXsaGwgu2TjQ0fgaInR7cv3Z81st4GN3fdK9DbywBd4iehJ6cPJKOdAmVgj3t2et7ax9Xy78ZloHLeWXkxiADQLk3OYbsJewHS8DhUzCm3UJ8ZOR0P1HjIK5G6qEjVOenQc6hBn9Zg4emuYewr6PrZVmWgftT04eN4E/bu81tXjGP7PlSHV/dAPwwmVwgl1Z1tD2nD7r/0Rl8LdYtWk51ftq+LdSlXlHApwuDjyWCPEcdB2RaBl4xKHJ4uF6AVbSd29rmplk0G+brI9dV3vNZQfzyJlvFAXmyh3sfMwL1M99//5fW9odvAx5ZW0p1fqrxC7nOTw0eyvgpNR9S8KeCftcjRu4he9TXeM33aLLPXr4KEI9tVh/uPD5EFhfoR0Ggr1Ue7RQScjLENe46LaP6ioW5afP26xeCHuScNXiE2KLvYylPNYeHCSAK1QmwFrc+NGvb5bJzc5sbpioGQwP96aHfRyaOPYOvxtWqRTQBXXV++meI0m6w5IOvsS5N7+BRx8SIn8oIasjy1R22vLJVfmlWgWLVLOCBQBtUgNA8dnzWSwIgXR07v2RAANgKyvQp46fMX4hPNlmDx613PxhEg0cRH8u/GRpB8h2qERyr6WPQ7tzVrWq1fIcMgDKyQc0+xnxpGdjXXsUhIQCM2N46v1AHOSvgU53fnONdPKrymYVjGbgZ6xWyeWvb1TqCyQAC5eme8PCjU17uDekOWNPhjkRzgQAwQumE8+TpJeQ6v70NHr4GOVfha/k3wzIwgC7RMvBEEgT6oLFoXR4Pw90mMnpiUZ1fqCetgj19mENt8ChiY/m3bKNBHpaB7auSlWMpF3BHCQNfg5pDH5PWJALASPzpH30pzfjpiSXUOj/t16sGj1jnLNXNvqlxYHmrXgDIMrB9CuoHbSKpWnO4bgBUoXIh1Yq7pvuprx1KfCMADFy6fc65pXQ/w1Dr/LIGj6dPnzExq7v8u7K5YVa36w8CZhnYvokB39Oqmdj1bbaCA6pSrbiPRsGuBoHcaQKlYE91fj986VvB1vnpg6qMXywNHkXsLP/u3PxfZBnYurpL60eHryv9dyeGRyuPnblMAAjUoqVgH+VDSrZoUHSXEAAGRk8gqvNT4BdqnZ/qNVTjF1uDR5G6WTdlfrLZcd/drjZDLsMycG91smvaQ/jEcP8Mr977E0PVM8FV5wcC+IjGw/gIAlVqpXFqXUEAGBAFfAr8Qq3zU7CnoE/BX8iDnKuou/y7aj7KUK1tsQzchLdqBlcnkixgvyzvTBIkjlUc5ULwB9jhczyMNlLoSmcwd5kAaIlXdX5a8g2xzi8b5Kzl3tAHOVdhY/l3ZfOjoE9Dh+sGAywDX6tuZlXmR/OXgo8mWdeJ4eoPAmvbBICALemWoUkm0EcQqHtxFzqDCQA9yur8FPyFWuenxg41eKjOr63qZtsu9wj4VmrsJyssA19r1UJmVYF+r6VgBX8zI9ebOla3CAABm7QMrC3jfFBTSNuDQAJAD2Ko89MoF2X8NNol9gaPfmov//YITNYsNAOwDHw1BdovWuiy1lLw+J7gej75/3WDP9Unrll4bQCupnuRjxmB6YYLT822ujOYO4xjCvg0yDnUOr+swUPDnNvS4FHExvLvao+lP2UE644EYRn4Wue27ARZCvp07M8mgV+dZd/M8taHBkAzVHrko/xIGUCNYGsrAkBHtMSrjJ+WfGnwCIeNLFve7L+9jSFVsAx8Lb3XNmbtqdHjldEbr8oEVqXXs0L9H9Ao3Z98BIG6d+u+3UYEgA1TnZ+eIFTnF2I9QdbgoX1729jg0U/d5d+iJck1CzVhLANfay6wbJtej5anATRrambBy3gYrdy1sTOYu0tDsjo/bd+m2UIhUsCXNXi0vc6vFxvLv0WdqcpW1Q0MWAa+lt7XUOrtVrbs7P4CoD/dp9QZ7KM8SVnAUO/lVREANmBvnV+ItMSrBg+l1LsY+GWsLP/2qUl7laHQjZir2WVtg+o8p6n9A5zyOSNQO4W0qTOYANAi1Qoo4xdqnZ9S56rx01cXGjz6qbv8u1Yiw2djdh3LwNdS8LXoMfjSz39k44oB4F56L0syga7pvn7uuYXWdAZzZ7FAdX6q8dNXqIOcle1TnV+XGjyKWOn+LdGRamN2HcvAvS0my68+dt/Igj/q/gB/FAT6GA+T3u/PL5k2IACsQU8B2jdQWb8QBzlnDR6q8+tig0cRO92//YOPyxZ2BWEZON/0htsGDII/IBy6r+ke55qWgdvQGTwy/LFbZg0Gpv0CV/7nfwt2Bw99MP7tf/wr8+0X/sn8+gOWqvb7L6PXm39jqu35KgoE/sdWuTq0G5JY4b6aWbwPkoBjlVEj1/i/yfvyf7a3zR87yJKq4/vYJh2/IdJw77oWt/zXlWJw3/v+P5uDn7rF3HG729o8/TxtG66fH6v6E1A7JpsJFOJSr2iJ11erfCxsLP8Osu+rlV1BFODQcHCNdGu3keYvY6o3JEAAwqSlYN2TXSdk1Oh56d33ol1hYwm4JKV8Q67zSzfO3m3wIPgrZmP5d2WzfG2fjV1BWAa+lvb0/c7oDbWD+SI6bl/Z+IDgDwicdq/yce9bmJuKtjOYALCPdD/AJOOnXTxCrfPT04/GutDgUU7d7l8FBYPW9dXdFUToBt6hDK4CPxvLfkXU5f2VzQ+8NJoAGEw2I9D1eBjFCGoKibEzmCXgAhrk/MTjR4I9sCp+fXrpTKdn+Q3KSvdvhWBOu4IcrZnAYxnYpFnQ+ZHr0oxo07RN3JhRp/Hg2Vv9t+NDg79GlQuEMuQaiE0WBLoOyLIg0EcAWsfQ6M13UtG8j6Z9K60bap2f6g3mFpaY5VfB0eTGPDNyvaljcvNKpd0ffjR6Y+3AperPboOZJPA7OuT2mTVdAk6ygIM2fmh5ukqGci45vssEgAO7NPpbpq6DG78yaAfdw7UFq2vPv/ByuhQdC9aU9tASr2r8dOKEGPxpiVc1flryJfirpu7y7+W0G7faDfpVhkJXoqB5fth98CdjSRbv6yODB3KfrnicLhoAdSkQ8zEjcCd5NG1iQQBodgY7qs5PwV+IdX4K9vRUoeCPOr/qXA1/zmNlV5CODYVW8Hd29HozMeyvWuWBJGt8YsCff5MB4JNWyp4+fca4phFx2g42Bp0OALVurzo/NXiEeMBUSzA1M582eOiJBvXYyJ6t1ZgBZ2NXkC51A2fB36EALlNazh0f4H0fq/iaqf8D7NH908eIFiWUYugM7mwAqIBPgZ/m+ITY5KEnF+3g4eMJpq0mLMyLqxPE2dgVRLqwDBxS8JdZSpaCx0rWcI5VaABZ36YcG7DN11xcNYWE2keQ6VwAmNX5hTrMWZk+Zfz05EJ3rz02ln+1E0TdXSBWNuvPk+vCMvBMsuQaUvAnCkqXRvs3EI1XzNCuM24GsC7rDHYdBCqxdO65haDHw3QmAAy9zi9r8FCtHw0e9tnImtmo4bOxK0jbl4FVb+ez5q+IgtKZPk0hVca/yBpb/QGNSOflHp91nlTRMrCPbuSyWh8AZnV+b79+Icg6PwV76laiwaNZRy0MDV6zUMNnY1cQaesycLq1m+UBz9rG7d6NX1vbw1fdyEUBatUM7RpLwEBjlAFUJtC1bPvYELU6AFTA97MfXEjr/EKjJxENctZyb6z7CMZCQcXYUL35e2ngZimAsLIrSEuXgedH7QV/Cvge2bySbuOmYze9aW+Idt4SdZ1Sg4tkAIFGKQj0MR5GsUiICahWBoCKuNXgoag75AaPuflnDZo3MVI/WLJRu5fRriB1tXEZeMJi3Z8C9ns3Priqq1bzG5e37RzHdDbh6LU7kkxUDMz1em1lKAHkU8JFNfauKR4JrfysVQGg6vy03q46vxBbsLXES4OHe4dN/UDJ5vLcqoVmEmnbMvAJS4Oe1azzyMaVnu/xXJIFtLW3b1oPuG8p+GjF2kUbI4IAlKMkjI+VN8UnIcUmrdgLWFm+JyePBLnUK0o7qxWdGj/3bCz/ysxIeB+VNu0NrOyfjeO0kiz3Tvd5TxQcvjJ6g5X9hPW6tXSr7dv0v6t+z9WtOJd/1RBzqMb7uJK8dzpmgGtaCr7ppo+nu3e4knUG33X/V4NIAkUfAGrq9snpMGf5qcFDe/ZS4+ePjeVfGQ9wuTVbBm7D3sBftjGkO3kfpksExMoMTiaZwLM194TOaG/pi5tXrskGlqWmoIuRjoBR8Ffns0HnM3x67PisOXj+k06zclqp1IxABYG+RbuGpLV0dfZq373Qgr+swUMHmODPLxvLvyFrwzKwAtkHagbYWVBXloLFRYvZUwWTlbN/huVfwIdsRqCP8TAhdAZHd/dIo+dzS+lXiIOcFfBlDR7U+flla/k3ZG3oBh63EMTOJcuIg9ZVqjs4hK3XljdZAgV88RUEqitYK5g+RRMAKsunbJ+yfqEOclbGT3UFBH5hsLX8G7I2dAMfqhmkawm1ah2ZsoY+t2CzOV4IQDWq09cmDK4ppvE5HiaKAFBRsub5+Y6We1Gdn4Y468vHfoPI1/bl30zsy8B1M4DLNZZyd5aOrxhflun+BYKgJI6PGYELc1PeOoODvnOoOyfkOj+dLBrrQndveLqw/JuJfRn4QM3jtFqzkUBZuDkPQWCdzCUA+1TCpRExLim2UVOIjxgnyABQ0bBq/DQzJ7Q6v6zBQ3V+NHiEqwvLv5nYl4HrDH9WBs/GEqrGuLgOxha3Cf4+3dItDREvzel1fW/3FQQG9enTL6/OGO3iEWKdn04K1fnR4BG+riz/Ztq6N3A/NrdPUyOJq3Esbcn+1a2fvMnUZ2P3mFjH8KAZWt1zXdKlxJeWg10K5q4xM30srfMLcb+8vQ0eqvlD2Lq0/Jtp697ALimbOL3xoZMt2eZaMsC7bvb1gIXPqY3vcXmbRhxcTZ3BroNAxT8qeXPFewCY1flpF4/Q6vwU7KkziAaPuHRp+TfTxr2BfUjrARvOzGn0TBuGd9twKJ5BFOiYtM7/uPupHmp2dZUI8/bp0xJvyHV+qgNQg8fzL7xsEJeuLf9murgMPNbAJUxLs00tz6ZZxs12ZP/Exh7ZY6Zb2XrEQ4kfHzMCVQrnojPY+R1DwZ5+OQV/Idb5ZQ0erjuBYEcXl38zXVwG1rFuIoDQlnJN1IUtau4gc/+uMlbzweWQqW+dJWDkUBA4NbNgXFNTSNPJMWcBoJZ3VeenBo8Q6/zU4KGMHw0ecevi8m8m1mXguoFWU5nPyY0rVusB9Xsut2zp18ZOKuM1H9jGhusff4JyFFF84HpGoGKmc8kKaZOlcU4CQAV8CvxCrPNTg4dq/GjwaIeuLv9mYlwGrluAf3T4OtOEdcvLtcpOt7HmrW72rO4gcBtbCdIEgn4UBLoeD6NlYJXJNWXUNEhLvCenJoNc6lWwp7QuNX7tYWv5d3l7w8sN4YSFQCZdBo6sw3Rteyu5iVcP3HXMTwyPpnv72nbAcjnB2dHrzb0bHzjpNHblrSSzOVbjwUvHXtnrKu+Jlv/tjIEB+lOi6KabPp42r7qi+Ellc01kIBsJALVurXk2Lt+ksrS8+8zpM+lSL9rFxvKvshlznor0J4ZGawew2TJwTF2mNhoJFDzr+6xZ/L0VVJ6wnF3U8Vkauc484nH7Odte29o0D9T87B1NHlyqBPATlupebc6TRLs9dnzWHDz/Safbt2kV9XuvvmE9Azk0evOdVh9FfQwzLOvNt35qTlHj11qvjNxYO4BS9+e0pwzaTBIYHB2q/0zm83eo6kejN6bBUR3KID2ycaV2TaGySvPJsRhvsJ5yMTk+iy3ZBk4ZuO+M3mDqqHLsbPxc0UPfvZu/NkBZKmX7xlOzzkvaVK5mk/UAEPDB1s1gMsnM+MqeKeA4O3K9qUs3089uxHVDm08ybRPD9YNf/e6TSQa3aiZQWb+jydcBB6NJfJ5rttkI4BWI6T0pEwTqs6JMqo3jFOMDE2ADUzjRCjaWfxU8+LwhK2ixURsWYzfwiqUlOP3uCqIVUJYdD6P/RsGnMsha8nUR/ImyjG2Zgbe6Vf9zo+y9HuJ07PLq+hT46c91jG0dpzU6gNFRZADRCrEv/2ZsZcJizGro5m+7S/bFJKj+bhJcKrukOi8F2Aq6NHtO8+O+MDxi7kn+9wFPgZiyXV/Z+MDE7nCakaufvd5Px209bTJpbr6nsuVtasoBymq0CxhwwVb3bwiZgNUkSJkw9cXYDby4uWE9iHggCUweCDgbqnNXQX/sS5Cru9lr24H0zqDv5o7fi5ay7kCMWAJG9GwNf7axjFXXmsWl0NiWgRVErLVsUHIZyvjayPr6thLhsXsugM884AsBIKJnY/hzKJkAvYYXLd1IYxwKPbfZjs7YQc0kAWDsQ6KXIzt265bHBgGxIQBE1Gwt/74WUCbA1muJcW9g1cQtdrAjUxnb+dHrvNUi2qCdU1YiGm0zR+cvOo4AEFGztvwb0CDY1Q4vA4vm43UxM6OHma+PNLOtnSuxzDbU+dWWETxAVQSAiJqN5V9lnULaDF6vpe4w40yMy8CiWX7rEezPqkBCu3rYKh9Qw8rRCIP2jM5dbaUYssuW93gGYkUAiGjZWv5dCbB2yVYzSIzLwLIz0PlK0B2aWu5U8Kcg0GZAMTNyfdT1gOrmtvUA0wQdq5Ae+ABfCAARLVvLv2sBZppWNu0sT8W6DCwKIrQ9WIhBoLJce0e3aDnRZubr7Oj10dYDphm2jQ+DPG46Ziz9AjsIABEtG8u/6YDgALMVek22bqCxLgNLFgSGshycBjdJEDHXI+Onf2frXFLwtxRxPWCIwbuOW0xNKkDTCAARJVvLv6sm3GzAaoe7gfdKd8vY/MDaeJyqtNSrXTuKgohJi0GPtj07EfF8wFCC96ycgOAPuBoBIKJkb/hzuLVKXe8G3ks38WPJTVxZHNdZpSzrp3q/frVj62mwYa8eUHsTx3zssuDdV2NIFrSz7AtciwAQUbKx/Ksbe8jjRtYsjqaJeRl4L2Vx7k1u6IsOAkFlrvRz7u2T9dtP55TNWYbzyVLwWMTzAXWctDyuQMxVFjfrzi4TtANdNTR68518OgBESVuofTkJbm3t96tgRUvvyr6SNWqGgtmJ4ZG0NMFmt3N27FaSY8cOH0B/BIAAoqdl7vEkEDw0tPPPsZI1olqifDfJ9P04DRrYGsw1BYPjSSA4ZsxAx010rN43OzvnrAXazAWEjAAQQKspy3RgT1Cxvh3W4G/0pqD+0L7ShYvbW0F1FgMxIwAEAADoGJpAAAAAOoYAEAAAoGPinTIKRETF7mPUM0Wl1zGLoUmkV+0cdY8A9rMeAPa6+FRxuUZXV9FrqHIh7HUjyOTdxPcXnu+VdxOp8nPqKPp5ZVy20Hk3njO+o+h7F723No9vnd9vLB2+PJyOuhgvGFGiY/pq8ppf2x1f4SogDOHY27pW5Bn0Neo4HR4e3ukmLlgcWd/tFq4yKqbKdaGfdNB3cp5pHM49yVfRHsL6GZovuZKcb1UDwqLzucp1Ku89sRm02r4n9GP7+r/XoK+37PfNO3Zlr9FNf5732v8eFL3fNuS9NzZ+Z58PldabQHSynB253tiiE0wXrOXNjdInfdFr0IDWxQG3BNJ2TJrI34sGjfY6gPr5eR+cgxu/svZz6ij6eYPIbohV5m9dGv2tnv8+G+TaS9F7W/Tf5cl7H6p8L11sT45cV3kunQYOzyVfTQeCIRx729eK/coev50t14oD9TzpsOjtjdKDoqtcF/Lo5nNiZNRMJN/vQIVB0Xp/5pLr6qCBfN5nVqpcX/PekyrfK4/te0I/tq//e2lXlbkBdpt5NnktZa5HefeYstfopj/Pe+0/ZkXvtw15742t3zlLBHw3fThzt2tO8DWAiuyPDo2aV0ZvNDMRb47eZprbpYG8+iDo65DH0yrN4njaOksXcJ2ndYYST6Tf44b0nzEI6dhXcWL3tVe9eej3n09u2voeVYKwqnSO6zzRtbHqz9Xv/J3ke9i8rh5N3s+Ydy2JwfiAGad7WrILUJvpM6z7hq4lr4zc6OweFtWZoYudLlgHuMAEK7up+AxgZpIPkctzRD9LT9k2MmrZ99OFIJYgMBPCsR+EAh9bxyz93UfcXJsUtC5ZDDh1XZ23eO6e5EG9UYM8ZKVLo9wvo6KHSn2+bX0mi0T3aKATWsseCJvPAEYfoKPD7rKAZ0evt7YV2V4xBoESw+vWE7YCH5t03ulcaJLNoHUvHS9bNxx9FsaH/GThu6Ls+3tomOxfrGx+JvNEeXbows0yQ/h08vpaEtRN0sU5MsjvuFPPupl+qXbM9vcPSeive6bEhVV1Odnx0leZusz0AbWh4Fc3hLJBa1abqa+yNX47399O4OYie9Fl4yUbHsa5T0bN5meyF6eP6VkHWj87e3oWp66PJlnAQQphMRgVohY13Si40tNlv5v8/Oh15isbHxgf5pNsyaBNHINQFqlfpkvn/PLWZs9u0ax784QeaAou6K7fwxCOvQKY9Zpdxhdzfgcds6L3W7//Ys57oN99IjlmqnXLuz7pz2w3FejnzvQ517KGlNWt3sFqmvXs0+xyIvnMrG7U74rV+3uigfehi3Qs959rZesA9x/rXt/LFnXmqjmjn53PUO9zuWyMsLZd/vy00Tx5eXvwz0O/30Vdy4fSPcyLAzxbn8leHAeAWwNdELTckffEO05ha6NKdXVu9e96VZCgD/uKhxvB+O5SVBNt9mmdXp9ap7kk+Fwu+Nm6GOt9WTWb6c0976Lo+j0M4divbG80Fjx8ueDaMZ3cwIpery7Cel2rW1vpcm+vm2ka2CfvyarF807nWtGNu0z3uF7P6uZmmlGYyelcTDuLk2M2vVX/4VqB8PLWprPRRm2lEST7g4QyS8AH0vEvQ32/ly3ZZ6Mf/fyJnD8bNEYoo8kkQJGyv4uOkx7M8ko7bH4m9ws6ilKGr2gWHPzTh/5Y8gErummeGPJXD9bUUpQ+sEU3ZH1Yl0sGALpB6u+/WPD3vxzgA0/oxz7PZ3KuHXr/ywarui5NFqxAHLI4k2y8T02dXrPOn7KB1nI6/iX/pnjYUv3sgRJZS5TT64Gs3z2wV5KkTHYNbl3eDZyLAryJhrrrg4+itJyB8OnkzatrG0tT3X5OtWwpyraJgsBmsU8WKc9fbubfxB8Yaq4OpK5Qj32evOXfHw94cyyq5bS5QjFR8L30GqpkBpZ36wN7OVBiWaos3bhoCKmvV+DWrw5wfLhXAEg2NlS6ZxTdNw43kAQgjQZrlgtuRIc9dqPZnk2mgGYsdyeS7cpLGAr+ih54Qs56h3rsB1HlHFlMl6o/vOZrxWKmpSgjN12jDrroNR4y9swwtaG2XoHbF/pkantnAEmohGy54Pp/uIHJFsF/Mj+dE/VyIodHW2PN5PyZi5pNPT31qqPLZpMds1QLMjGS/0FcrlmnoWxOE7UeTfN97G2Y2K1ZG2RnjKbrMg8X7PKhJes6heH9Mg5Vvl+vz9/OMP+R0iURuNbFHsH6Z/o8EO5/YKy7dSOap2OkJEKvBEMTmfSgr8y6mOQtfbE0HB7djPKWxFzsEblThNw7eLI5m+xQQaZotaM1Nr6P/SCKHh41yDqkETZFtYTfDexcK2oeOjHidjh722h1YH8ApyAhL2vd61pH/V8cXCa3nGYAx0rWlmj54XDBuIK0e5KTOUga3TFmrj1uri7+yuBM5IxV0VLUVzbqf7jyzsud0SXdrbGxeeyVNaxTu1m0DL/WpxNyYrcjO1uSv5gGNtteMihF2dO1AB+Ctbfwd0Z7nwMnGN1Vy8WtrWsGO48n98leWdxe9YEXO1r/V+c6srY7T9Mll/cQpwFgemE19U1vfshogUBp9tp4zp81NZJlL50Xc0kWcKnHmAsbS1FFwcx6x5dYbB778ZoZ26IAcCUJnMrspnFg37yybMP217Y2nQWEB4aKzrfwroF6T5a3N3qO79K/WzGbLEVWtJYc7/33Tw16Xunxd3vW/3V01azOzjlaUVpz/DFzGahH1QSiDItm+qxSSxKsywE8Za4WdDjWXYoqWs682PGHkhCOfRlFpQJFsg3bNUNPS8U/Gr0x3QN6omAodF15S9EhB1GLm/nzCGkIqU4ZwP3ytnrbf53q+upETC4bd6L6NO6MXeDpEf0VLUXNNDRUs2wApCWJKk+levih+ckOZQiLdiQoIwsI9XU5bSDZcDb4uOy5pizq2ZHB9yfe6Wau3s2+mKzS9Bo2Pb67e46PwfCxU9C/fycPPSDo/+8957J/t9dbZF3RQ1QZQF04XkmeukPfaB7+ZUtRvTCbDKKHAA1EthGw7Uzrvy7dHYQh9TtzBvOylDMNZkzb7tWe8wD31QX2KBt4jaZJ9BDllUpdegSB6KdoKerEMAEgdgKVezc+SINBG8uqCv7ytojrGmXhe8m2vsLgeg0r3z/w+dAQA6BRjuO9gMtt9Fxms3k9Ra6yz2RwPl1UI+d4+X6nIWSj53ZwLEXZZ/PYpzPqHJ0v2Z7M+kr38dUEghLXoDz6Hl+3OHcyVmu7W+v1elhXtlTNONSlDaZXILd/LFWv1Y0uN97U2QvYR8mZzSHs/TgOAAfY6Hlr50ReyinaTzv0khsOw0XDclPBn/kI1tMbUHKe9LooZg8RgyiqwYtl4HFTbB57BQY+6h1/Ewzq/2ztXGcOpefPUHp8y5YOqC5QD7J1Axy9B71+ZiwlDHoAO5yzb/Z8cm1/pONB8qB6fSb2ngs65/aPwOp63XBsv/+BIXerB0Gvo+rATSbHLq+IWReW5U0CwJDk3Zh8fggXkyDv7Ej+bLJBu1f3F2Jnxkpmi9ZN8fuhgCPGJcQQj31dl3cD0b2jINLscXKM8gKbzGELD6jvF/xZmQDzcp85ZmMF2xraoPdPzTEncrLwh6nFHZiyefsz09mYpd7LvzSAxMRlIiH4Qrq13WLiXksxoe0w0HVFF/N1jzUoRUtRmk32ohnsJn0xZ5BwNpm/3035NxmmHK+M3Jg8BZqohHrsm7C2O2boQHIci5o+vmDhAVU1X3m7IeUNAd5L186iLFtaTz3U7G1gMc3C5wxnT37+5SGWgQehgO5Qj8YPPaSM9xgL09UB0DE6ULBZRhPX0SgiqLwMTd7Td1FG59MVgsai/yaW2WcuHC54n3xvkaalqLxlyAcGzEIUPVFP1CxuP9RwRqYpIR/7vbLdiHp9DUrn0yMb+V3EN5n6ior3Jyw8AB921IyRN3ZJ5zpd04PpFdBl96hxMoBRK/o8rhr7KylRfPIGXRMvKnj9TIVfuei/Yar9Dl3EizqzfV+EstlkNqxu5f8uR5P3YKzG8u3xCAflhn7s91KArpKSXl9Vjlu6R2uDv58yjXkBZt0lVO2K46rUQL/Hi9RrW9FrR497dgO//cF0NjsQ4UtLkgqy8Wtb9q8zwQeAaUdwzsssSonm/dnY0NBAT/v6u3kZmbYtbVWlE3d+NH+w8UpB9s2lotlkg9D3yPs+ei+WKo4BURD1wJCbjIwtsRz7zHrBn41XzIblPaC+b+xYKQic1EhRJYOm/0a74rh0ii08rVCJyf57Tzpap1f37xYJilioKbEo1mhiB7TgA8CTBRepounmRYXPg2xHVPR32ZVh58LTb/jtSkAZoLzZZINaLugezmbBDZJRUvA3P+z2hlxXbMdeim6IevoeNHDX7573+9savrtccM5mx2CQh1pfswrXdxtCUF+ve1+vgH6NgDsK/WYbr2w387kJcr0prdNJnsY1LLTo5vLdgptLr42zM+kFMFnymU6eSPMK9vUa+j1du/xwpbOBamSHLlvevH6nbmooXfIsupG8WLAvrw/ZUlTdTFvReBnReaP9YvttD6bzTA85MWX+XBz7MTNUqS5vv/3nvf63nqZ7PWnr32l+31+WzFSN9cl+2qp9zPYuzts+MA0Ck+uZzkk1XORd07IBzCc8Pmjos5DXEOKLjXPN9TVODxcP7Jts0OuzSAbQ3sgklXrYzGCnD4/Dw+mDZ9HnQder5YZ2cnEaAOrCY+viozelqANOf1a05ZBOildGR9IbgmqUsmaOA7vzvvotq2TzwlyZqbCf5166QA0yc+tszZ8neo9Obdrfc7cuvaZ7RuuPWtEDxHcKvk+2PZi+drrZt39znpUZdu5LCMdeT8MTpr5e5/1i8jQ9P9T7OqRAXOeGll1V67n/oj+2OxdQTS/FdY92hxwv7s7TKzpf0vcs+UpLFJLXnv38A2mjxZC1G2EdO8PZPzRLFs4xW2ycawc3fmVculji76T1qdSoW7meyaB7sduKd/R5aap0Itr91PK6yvbK2wVirzQKVwHtgLHAHEsZfRVlWH1aL5hNNuj30e9Y5maWZs30P0qeZ3mzBmMR6rEXPbgVrS7s1FONmqMV46XLu+eFbZMbV9Kscr/zIssslOX6XFvdzQyzH3d1ZQKRV+n+jZ72s19tMLscZf+9gr8yH4Bseyfbmvq+baJjtLodbo1kulRmoYlHv2OZh5FBpPvSRnzxDv3Yy2TB+Ja65gqWYetY7zN2poqVtETB/bVsOsCVgdj0uwf+mAAwavpszjX8OYkqAEyfrJObyyDB16B/vx/VNZH9y5fORktS5TEEyHOWAjf9rpObdm7M2fl6McLi7ZiOvYKpr2x8YHWJrMr1aVDpYOckCLTxuvU6dx423J9raRZ+m+toHf3GK60xpSJac8l11HZioZdoAkBdrHTBrnJx1Rs5V/MGndauJN/j2GZzmYOYXd4tVL83OUaxdEevWmxQ0ffS+Vl11pmykXvP75gGjMd47CULAhct1Nis7R5/F8FvFgQuVrxBZIFqdoO5bPxY3AxrRFBs+gXuTKmIj64f9278uvYWkmVZrwHst/dkWVnBvJ5ibHTf6A1d2dhKOzcnRkZLF9/rYruSXKhWBnwNaQZnwPeh3x6xdfTKKNX9eZpzpmWGtRrHPO+/K8qA5b23RTPe8mgpan6k4OcMQAGFHhB0bqnGrN9esTs/Yyvt8NofOKgBYXzo6t/RZlAYwrG3da0oUuYYLu52aut4FXV276frwaqOXfo+lPs9qlwX8n72YlqKspkOty7TWZs2zm1f25W+1uNBqOizlPe7VtlTW5+/oznzF6t8nnN/loNzbS+b1/+8c3it4LwrKm8Z9PhVuUYXKToWVY+5rc9VkV7vj43zSsfxYvp93A/tHhq9+c5OPoId2O3m29m/9Wo6CdctBZ7otmxrt0P7bs5rnF9BG093yTDXHDfRsVvf3gquyUUdymNpAHv1a764e66F2pQDwI/OBoAAAABdxS7cAAAAHUMACAAA0DEEgAAAAB1DAAgAANAxBIAAAAAdQwAIAADQMQSAAAAAHUMACAAA0DEEgAAAAB1DAAgAANAxBIAAAAAdQwAIAADQMQSAAAAAHUMACAAA0DEEgAAAAB1DAAgAANAxBIAAAAAdQwAIAADQMQSAAAAAHfP/ARexqh+K2nwPAAAAAElFTkSuQmCC",
    "jpg",
    10,
    10,
    67,
    30
  );

  // invoice name and date
  doc.text(`Name: ${invoiceName}`, 110, 15);
  doc.text(`Date: ${invoiceDate}`, 110, 22);

  // company info
  doc.text("A&J BUILDING DESIGN LIMITED", 10, 50);
  doc.text("https://ajbuildingdesign.co.uk/", 10, 57);
  doc.text("Tel.: 01252268261", 10, 64);
  doc.text("E-mail: info@ajbuildingdesign.co.uk", 10, 71);
  doc.text("Account number: 48278467", 10, 78);
  doc.text("Sort code: 52-41-56", 10, 85);

  // customer info
  doc.text(`${customerFirstName} ${customerLastName}`, 110, 45);
  doc.text(`Tel.: ${customerPhone}`, 110, 52);
  doc.text(`E-mail: ${customerEmail}`, 110, 59);

  // summary tale data
  const summaryData: any = [
    {
      SUBTOTAL: `£ ${subTotal.toFixed(2)}`,
      VAT: `£ ${vat.toFixed(2)}`,
      TOTAL: `£ ${total.toFixed(2)}`,
    },
  ];

  // summary table headers
  const summaryHeaders: any = [
    { name: "SUBTOTAL", width: 40, align: "center" },
    { name: "VAT", width: 40, align: "center" },
    { name: "TOTAL", width: 40, align: "center" },
  ];

  // summary table
  doc.table(110, 63, summaryData, summaryHeaders, {
    headerBackgroundColor: "#e41c3a",
    headerTextColor: "#fff",
  });

  // invoice items table data
  const invoiceItemsData = invoiceItemsList.map((item) => ({
    ID: JSON.stringify(invoiceItemsList.indexOf(item) + 1),
    Description: item.description,
    Unit: item.unit,
    Quantity: item.quantity.toString(),
    Rate: `£ ${parseFloat(item.rate).toFixed(2)}`,
    Tender: `£ ${(parseFloat(item.rate) * item.quantity).toFixed(2)}`,
  }));

  // invoice items table headers
  const invoiceItemsHeaders: any = [
    { name: "ID", width: 20, align: "center" },
    { name: "Description", width: 110, align: "center" },
    { name: "Unit", width: 30, align: "center" },
    { name: "Quantity", width: 31, align: "center" },
    { name: "Rate", width: 31, align: "center" },
    { name: "Tender", width: 31, align: "center" },
  ];

  // invoice items table
  doc.table(10, 90, invoiceItemsData, invoiceItemsHeaders, {
    headerBackgroundColor: "#041831",
    headerTextColor: "#fff",
  });

  // create pdf function
  const createPdf = () => {
    doc.save(`${invoiceName}.pdf`);
  };

  return (
    <section className="content invoice-generator">
      <form className="invoice-generator__content">
        <div className="invoice-generator__invoice">
          <Input
            placeholder="Type invoice name"
            name="invoice-name"
            id="invoice-name"
            value={invoiceName}
            setState={setInvoiceName}
            underlineColor="blue"
            size="lg"
            additionalClasses={`${width >= 768 && "mr-14"} input--invoice-data`}
          />
          <Input
            placeholder="Select invoice date"
            name="invoice-date"
            id="invoice-date"
            additionalClasses={"input--invoice-data"}
            value={invoiceDate}
            setState={setInvoiceDate}
            underlineColor="blue"
            size="lg"
            type="text"
            onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.type = "date";
            }}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.type = "text";
            }}
          />
        </div>
        <div className="invoice-generator__customer">
          <Input
            placeholder="Type customer first name"
            name="customer-first-name"
            id="customer-first-name"
            value={customerFirstName}
            setState={setCustomerFirstName}
            underlineColor="blue"
            size="lg"
            additionalClasses={`${width >= 768 && "mr-15"} input--invoice-data`}
          />
          <Input
            placeholder="Type customer last name"
            name="customer-last-name"
            id="customer-last-name"
            value={customerLastName}
            setState={setCustomerLastName}
            underlineColor="blue"
            size="lg"
            additionalClasses={`${width >= 768 && "mr-14"} input--invoice-data`}
          />
          <Input
            placeholder="Type customer phone"
            name="customer-phone"
            id="customer-phone"
            value={customerPhone}
            setState={setCustomerPhone}
            underlineColor="blue"
            size="lg"
            additionalClasses={`${width >= 768 && "mr-15"} input--invoice-data`}
          />
          <Input
            placeholder="Type customer email"
            name="customer-email"
            id="customer-email"
            value={customerEmail}
            setState={setCustomerEmail}
            underlineColor="blue"
            size="lg"
            additionalClasses={"input--invoice-data"}
          />
        </div>
        <InvoiceItems
          serviceList={invoiceItemsList}
          setServiceList={setInvoiceItemsList}
          setSum={setSum}
        />
        <div
          role="button"
          onClick={onNewBtnClick}
          className="invoice-generator__new-item"
        >
          <Icon icon="new" color="blue" size="lg" />
        </div>
        <div className="invoice-generator__summary summary">
          <div className="summary__item">
            <span className="summary__name">SUBTOTAL:</span>
            <span className="summary__value">{`£ ${sum.toFixed(2)}`}</span>
          </div>
          <div className="summary__item">
            <span className="summary__name">VAT(20%):</span>
            <span className="summary__value">{`£ ${vat.toFixed(2)}`}</span>
          </div>
          <div className="summary__item">
            <span className="summary__name">TOTAL:</span>
            <span className="summary__value">£ {total.toFixed(2)}</span>
          </div>
          <div className="invoice-generator__buttons">
            <Button
              text="Reset"
              type="reset"
              color="red"
              additionalClasses="mr-2 flex-2"
              onClick={reset}
              isDisabled={false}
            ></Button>
            <Button
              text="Generate invoice"
              type="button"
              color="blue"
              additionalClasses="flex-4"
              onClick={() => createPdf()}
              isDisabled={
                invoiceName === "" ||
                invoiceDate === "" ||
                customerFirstName === "" ||
                customerLastName === "" ||
                customerPhone === "" ||
                customerEmail === "" ||
                total === 0
              }
            ></Button>
          </div>
        </div>
      </form>
    </section>
  );
}
